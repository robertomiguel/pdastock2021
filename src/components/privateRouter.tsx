import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import UserStore from "../stores/user";

export const PrivateRouter = (props: RouteProps) => {
  const user = useContext(UserStore);

  if (!user.isLogged) return <Redirect to="/login" />;

  return <Route {...props} />;
};
