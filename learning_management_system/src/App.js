import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
import AccountPage from "./_pages/AccountPage";
import GoBack from "./_helpers/GoBack";

// configureFakeBackend();

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
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    display: "flex",
  },
  spacing: {
    margin: theme.spacing(1),
  },
  zindexhigh: {
    zIndex: 10000000,
  },
  ignore: {
    textDecoration: "none",
    color: "inherit",
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
        <AppBar className={classes.zindexhigh} position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <a href="/student" className={classes.ignore}>
                {Role[currentUser.role]}
              </a>
            </Typography>
            <GoBack className={classes.spacing}>Go Back</GoBack>
            <div className={classes.rightalign}>
              <Button className={classes.spacing} color="inherit">
                <a className={classes.ignore} href="/account">
                  {currentUser.username}
                </a>
              </Button>
              <Button
                onClick={logout}
                className={classes.spacing}
                color="inherit"
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      )}

      <Router history={history}>
        <Route exact path={"/"} user={currentUser} component={HomePage} />
        <Route path={"/login"} component={LoginPage} />
        <Route path="/register" component={RegisterPage} />

        <PrivateRoute path="/account" component={AccountPage} />
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
          user={currentUser}
          path="/category"
          roles={[Role.Student, Role.Teacher]}
          component={AlbumCategory}
        />

        <PrivateRoute
          exact
          user={currentUser}
          path="/category/:head"
          roles={[Role.Student, Role.Teacher]}
          component={AlbumCourses}
        />

        <PrivateRoute
          exact
          user={currentUser}
          path="/category/:head/courses/:head/contents"
          roles={[Role.Student, Role.Teacher]}
          component={CourseDetail}
        />
      </Router>
    </div>
  );
}

export default App;
