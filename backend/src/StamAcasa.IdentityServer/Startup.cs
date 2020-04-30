using System;
using System.Security.Cryptography.X509Certificates;
using IdentityServer.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.IdentityServer;
using StamAcasa.Common.Queue;
using EasyNetQ;

namespace IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _identityConfiguration = new StamAcasaIdentityConfiguration(configuration);
        }

        public IConfiguration Configuration { get; }
        private readonly IStamAcasaIdentityConfiguration _identityConfiguration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddRazorPages();
            services.AddControllersWithViews();
            var builder = services.AddIdentityServer(options =>
                {
                    var publicOrigin = Configuration["IdentityServerPublicOrigin"];
                    if (!string.IsNullOrEmpty(publicOrigin))
                    {
                        options.PublicOrigin = publicOrigin;
                    }

                    options.UserInteraction.LoginUrl = "/account/login";
                    options.UserInteraction.LogoutUrl = "/account/logout";

                    options.Events.RaiseErrorEvents = true;
                    options.Events.RaiseInformationEvents = true;
                    options.Events.RaiseFailureEvents = true;
                    options.Events.RaiseSuccessEvents = true;
                })
                .AddInMemoryIdentityResources(_identityConfiguration.Ids)
                .AddInMemoryApiResources(_identityConfiguration.Apis())
                .AddInMemoryClients(_identityConfiguration.Clients)
                .AddAspNetIdentity<ApplicationUser>();

            var base64EncodedCertificate = Configuration["Certificate:Base64Encoded"];
            var password = Configuration["Certificate:Password"];

            builder.AddSigningCredential(LoadCertificate(base64EncodedCertificate, password));

            services.AddAuthentication();
            var emailType = Configuration.GetValue<EmailingSystemTypes>("EMailingSystem");
            switch (emailType)
            {
                case EmailingSystemTypes.SendGrid:
                    services.AddSingleton<IEmailSender>(ctx =>
                        new SendGridSender(
                            new SendGridOptions
                            {
                                ApiKey = Configuration["SendGrid:ApiKey"],
                                ClickTracking = Configuration.GetValue<bool>("SendGrid:ClickTracking")
                            }
                        )
                    );
                    break;
                case EmailingSystemTypes.Smtp:
                    services.AddSingleton<IEmailSender>(ctx =>
                        new SmtpSender(
                            new SmtpOptions
                            {
                                Host = Configuration["Smtp:Host"],
                                Port = Configuration.GetValue<int>("Smtp:Port"),
                                User = Configuration["Smtp:User"],
                                Password = Configuration["Smtp:Password"]
                            }
                        )
                    );
                    break;
            }

            services.AddSingleton(RabbitHutch.CreateBus(string.Format("host={0}:{1};username={2};password={3}",
                                            Configuration.GetValue<string>("RabbitMQ:HostName"),
                                            Configuration.GetValue<int>("RabbitMQ:Port").ToString(),
                                            Configuration.GetValue<string>("RabbitMQ:User"),
                                            Configuration.GetValue<string>("RabbitMQ:Password"))
                ));
            services.AddSingleton<IQueueService, QueueService>();
            services.AddSingleton<PasswordValidationMessages>();
        }

        private X509Certificate2 LoadCertificate(string base64EncodedCertificate, string password)
        {
            var certificateBytes = Convert.FromBase64String(base64EncodedCertificate);

            var certificate = new X509Certificate2(certificateBytes, password, X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet | X509KeyStorageFlags.Exportable);
            return certificate;
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseStaticFiles();
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });
        }
    }
}
