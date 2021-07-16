# Jurnal Medical

[![GitHub contributors](https://img.shields.io/github/contributors/code4romania/stam-acasa.svg?style=for-the-badge)](https://github.com/code4romania/stam-acasa/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/stam-acasa.svg?style=for-the-badge)](https://github.com/code4romania/stam-acasa/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

This repo holds the frontend app and the API for Jurnal Medical

Objective: Reduction in the over overloading of emergency phone numbers, quick and easy collection of information from a very large population, constant evaluation of a large population, the offer of support in the management of cases for authorities.

How: Centralization and monitoring of the state of people under auto-isolation with standardized questionnaires completed daily directly in the users’ web application, for their families.

## Live:

### Production `not released`
[jurnalmedical.ro](https://jurnalmedical.ro/)

### Development `in progress`
[frontend - start here ;)](https://dev.stamacasa.ro)

[identity server](https://dev-is.stamacasa.ro/account/login?ReturnUrl=/connect/authorize/callback%253Fclient_id=awsjsclient&redirect_uri=https%253A%252F%252Fdev.stamacasa.ro%252Fsignin-oidc&response_type=id_token%2520token&scope=openid%2520email%2520answersApi%2520usersApi)

[api](https://dev-api.stamacasa.ro/swagger)

---

[Contributing](#contributing) | [Built with](#built-with) | [Repos and projects](#repos-and-projects) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)

## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project](.github/CONTRIBUTING.md).

## Built With

### Programming languages
- C#
- Javascript

### Platforms
.NET Core 3.1

### Frontend framework
- [ReactJS](https://reactjs.org/)
- [Bulma](https://bulma.io/)

### Package managers
npm

### Database technology & provider
PostgreSQL

## Repos and projects

## Deployment

### Backend
1. Install Docker for your platform https://docs.docker.com/

2. Run project

```
cd backend/src
docker-compose up
```

Alternatively:
```
cd backend/src
docker-compose -f docker-compose-dep.yml up
docker-compose -f docker-compose-services.yml -f docker-compose.override.yml up
```
Is also starting the frontend on port `5002`

Alternatively 2: Start only the backend
(frontend has to be started using the instructions below)

```
cd backend/src
docker-compose -f docker-compose-backend-only.yml up
```

### Frontend
1. Install dependencies

```
npm install
```

2. Run project

```
npm start
```

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
