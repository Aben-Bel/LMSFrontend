import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { history } from "./_helpers/history";
import { PrivateRoute } from "./_components/PrivateRoute";
import { authenticationService } from "./_services/authentication.service";

import { AdminPage } from "./_pages/AdminPage";
import { TeacherPage } from "./_pages/TeacherPage";
import { StudentPage } from "./_pages/StudentPage";

import { Role } from "./_helpers/role";
import { HomePage } from "./_pages/HomePage";
import { LoginPage } from "./_pages/LoginPage";
import { RegisterPage } from "./_pages/RegisterPage";
import { configureFakeBackend } from "./_helpers/fake-backend";
import AlbumCategory from "./_pages/StudentStuff/AlbumCategory";
import AlbumCourses from "./_pages/StudentStuff/AlbumCourses";
import CourseDetail from "./_pages/StudentStuff/CourseDetail";

import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

configureFakeBackend();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
  highlight: {
    backgroundColor: "red",
  },
  rightalign: {
    right: 0,
    position: "absolute",
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const classes = useStyles();

  React.useEffect(() => {
    authenticationService.currentUser.subscribe((x) => {
      setCurrentUser(x);
    });
  });

  function logout() {
    authenticationService.logout();
  }

  return (
    <div>
      {currentUser && (
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {Role[currentUser.role]}
            </Typography>

            <Button
              onClick={logout}
              className={classes.rightalign}
              color="inherit"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}

      <Router history={history}>
        <Route exact path={"/"} user={currentUser} component={HomePage} />
        <Route path={"/login"} component={LoginPage} />
        <Route path="/register" component={RegisterPage} />

        <PrivateRoute
          path="/admin"
          roles={[Role.Admin]}
          component={AdminPage}
        />
        <PrivateRoute
          path="/student"
          roles={[Role.Student]}
          component={StudentPage}
        />
        <PrivateRoute
          path="/teacher"
          roles={[Role.Teacher]}
          component={TeacherPage}
        />

        <PrivateRoute
          exact
          path="/category"
          roles={[Role.Student]}
          component={AlbumCategory}
        />

        <PrivateRoute
          exact
          path="/category/:head"
          roles={[Role.Student]}
          component={AlbumCourses}
        />

        <PrivateRoute
          exact
          path="/category/:head/courses/:head/contents"
          roles={[Role.Student]}
          component={CourseDetail}
        />
      </Router>
    </div>
  );
}

export default App;
