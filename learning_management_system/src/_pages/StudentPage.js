import * as React from "react";
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { PrivateRoute } from "../_components/PrivateRoute";
import { Role } from "../_helpers/role";

export function StudentPage(props) {
  console.log("Student");
  return (
    <div>
      <Redirect
        to={{ pathname: "/category", state: { from: props.location } }}
      />
    </div>
  );
}
