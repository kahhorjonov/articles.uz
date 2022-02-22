import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/protectedRoute";
import ReviewerRegisterForm from "./components/reviewerRegisterForm";

import Logout from "./components/logout";
import AdminLayout from "./layouts/Admin.js";
import ReductorLayout from "./layouts/Reductor.js";
import ReviewerLayout from "./layouts/Reviewer.js";
import UserLayout from "./layouts/User.js";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/UI/homePage";
import Asosiy from "./components/UI/asosiy";
import JurnallarRoyxati from "components/UI/jurnallarRo'yhati";
import NashrShartlari from "components/UI/nashrShartlari";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />

        <Switch>
          <Route
            path="/"
            exact
            component={(props) => <HomePage {...props} />}
          />

          <Route
            path="/login"
            component={(props) => <LoginForm {...props} />}
          />

          <Route
            path="/logout"
            exact
            component={(props) => <Logout {...props} />}
          />

          <Route
            path="/register"
            exact
            component={(props) => <RegisterForm {...props} />}
          />

          <Route
            path="/reviewerRegister"
            exact
            component={ReviewerRegisterForm}
          />

          <Route path="/" exact component={(props) => <Asosiy {...props} />} />

          <Route
            path="/listOfMagazines"
            exact
            component={(props) => <JurnallarRoyxati {...props} />}
          />

          <Route
            path="/termsOfPublication"
            exact
            component={(props) => <NashrShartlari {...props} />}
          />

          {/* <Route path="/not-found" component={NotFound} /> */}
          {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
          {/* <ProtectedRoute path="/admin" component={AdminPage} /> */}
          {/* <ProtectedRoute path="/reductor" component={ReductorPage} /> */}
          {/* <ProtectedRoute path="/reviewer" component={ReviewerPage} /> */}
          {/* <ProtectedRoute path="/user" component={UserPage} /> */}

          <Redirect from="/admin" exact to="/admin/dashboard" />
          <Redirect from="/reductor" exact to="/reductor/myTasks" />
          <Redirect from="/reviewer" exact to="/reviewer/myTasks" />
          <Redirect from="/user" exact to="/user/user-page" />
          {/* <Redirect to="/not-found" /> */}

          <ProtectedRoute
            path="/admin"
            render={(props) => <AdminLayout {...props} />}
          />

          <ProtectedRoute
            path="/reductor"
            render={(props) => <ReductorLayout {...props} />}
          />

          <ProtectedRoute
            path="/reviewer"
            render={(props) => <ReviewerLayout {...props} />}
          />

          <ProtectedRoute
            path="/user"
            render={(props) => <UserLayout {...props} />}
          />
        </Switch>
      </>
    );
  }
}

export default App;
