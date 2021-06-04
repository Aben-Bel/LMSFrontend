import { Redirect, BrowserRouter as Router } from "react-router-dom";

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
