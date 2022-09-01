import Verify from "../components/Auth/Verify";
import SignUp from "../components/Auth/SignUp.js";
import SignIn from "../components/Auth/SignIn.js";
import ResetPassword from "../components/Auth/ResetPassword";
import ForgotPassword from "../components/Auth/ForgotPassword";

const routes = [
  {
    path: "/auth/user",
    component: Verify,
  },
  {
    path: "/auth/signup",
    component: SignUp,
  },
  {
    path: "/auth/signin",
    component: SignIn,
  },
  {
    path: "/auth/resetpassword",
    component: ResetPassword,
  },
  {
    path: "/auth/forgotpassword",
    component: ForgotPassword,
  },
];

export default routes;