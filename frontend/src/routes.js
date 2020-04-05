import Home from "./components/Home";
import About from "./components/About";
import AddMember from "./components/AddMember";
import SelfEvaluation from "./components/SelfEvaluation";
import {
  signinCallback,
  signoutCallback,
  silentRefreshCallback
} from "./api/auth";
import OtherEvaluation from "./components/OtherEvaluation";

export const ROUTES = {
  base: {
    despre: {
      path: "/despre",
      component: About
    },
    home: {
      path: "/",
      component: Home
    }
  },
  oidc: {
    signin: {
      path: "/signin-oidc",
      method: signinCallback
    },
    postlogout: {
      path: "/post-logout",
      method: signoutCallback
    },
    silentrefresh: {
      path: "/silent-refresh",
      method: silentRefreshCallback
    },
    registercomplete: {
      path: "/register-complete"
    }
  },
  home: {
    selfevaluation: {
      path: "/evaluation/self",
      component: SelfEvaluation
    },
    otherevaluation: {
      path: "/evaluation/other",
      component: OtherEvaluation
    },
    addmember: {
      path: "/add-member",
      component: AddMember
    },
    account: {
      path: "/account",
      component: () => "Placeholder account"
    }
  }
};
