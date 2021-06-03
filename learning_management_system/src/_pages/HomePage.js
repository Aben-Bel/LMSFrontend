import { Redirect, Link } from "react-router-dom";

import { authenticationService } from "../_services/authentication.service";
import { Role } from "../_helpers/role";

export function HomePage(props) {
  const user = authenticationService.currentUserValue;

  if (!user) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
  if (user.role === Role.Admin) {
    return (
      <Redirect to={{ pathname: "/admin", state: { from: props.location } }} />
    );
  }

  if (user.role === Role.Student) {
    return (
      <Redirect
        to={{ pathname: "/Student", state: { from: props.location } }}
      />
    );
  }
  if (user.role === Role.Teacher) {
    return (
      <Redirect
        to={{ pathname: "/teacher", state: { from: props.location } }}
      />
    );
  }
  return <div></div>;
}
