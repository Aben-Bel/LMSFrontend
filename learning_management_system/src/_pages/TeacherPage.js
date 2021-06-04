import { Redirect } from "react-router";

export function TeacherPage(props) {
  console.log("Teacher");
  return (
    <div>
      <Redirect
        to={{ pathname: "/category", state: { from: props.location } }}
      />
    </div>
  );
}
