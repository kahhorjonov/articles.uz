import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/protectedRoute";
import ReviewerRegisterForm from "./components/reviewerRegisterForm";
import DemoNavbar from "components/Navbars/DemoNavbar";

import Logout from "./components/logout";
import AdminLayout from "./layouts/Admin.js";
import ReductorLayout from "./layouts/Reductor.js";
import ReviewerLayout from "./layouts/Reviewer.js";
import UserLayout from "./layouts/User.js";
import { ToastContainer } from "react-toastify";
import Asosiy from "./components/UI/asosiy";
import JurnallarRoyxati from "./components/UI/jurnallarRo'yhati";
import NashrShartlari from "./components/UI/nashrShartlari";
import Aloqa from "./components/UI/aloqa";
import NotFound from "./components/common/notFound";
import auth from "services/authService.js";
import MagazineInfo from "./components/UI/magazineInfo";
import JurnalArxive from "./components/UI/jurnalArxive";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    const user = auth.getCurrentUser() && auth.getCurrentUser().roles[0];

    if (user && user) {
      if (user.id === 1)
        return (
          <>
            <DemoNavbar />
            <ToastContainer />
            <Switch>
              <Route
                path="/"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/main"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/main/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/release/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/termsOfPublication"
                exact
                component={(props) => <NashrShartlari {...props} />}
              />

              <Route
                path="/listOfMagazines"
                exact
                component={(props) => <JurnallarRoyxati {...props} />}
              />

              <Route
                path="/contact"
                exact
                component={(props) => <Aloqa {...props} />}
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
                path="/registerReviewer"
                exact
                component={ReviewerRegisterForm}
              />

              <Redirect from="/admin" exact to="/admin/dashboard" />

              <ProtectedRoute
                path="/admin"
                component={AdminLayout}
                // render={(props) => <AdminLayout {...props} />}
              />

              <Redirect to="/not-found" />
            </Switch>
          </>
        );
      if (user.id === 2)
        return (
          <>
            <DemoNavbar />
            <ToastContainer />
            <Switch>
              <Route
                path="/"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/main"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/main/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/listOfMagazines"
                exact
                component={(props) => <JurnallarRoyxati {...props} />}
              />

              <Route
                path="/release/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/termsOfPublication"
                exact
                component={(props) => <NashrShartlari {...props} />}
              />

              <Route
                path="/contact"
                exact
                component={(props) => <Aloqa {...props} />}
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
                path="/registerReviewer"
                exact
                component={ReviewerRegisterForm}
              />
              <Redirect from="/reductor" exact to="/reductor/myTasks" />
              <ProtectedRoute
                path="/reductor"
                component={ReductorLayout}
                // render={(props) => <ReductorLayout {...props} />}
              />
              <Redirect to="/not-found" />
            </Switch>
          </>
        );
      if (user.id === 3)
        return (
          <>
            <DemoNavbar />
            <ToastContainer />
            <Switch>
              <Route
                path="/"
                exact
                component={(props) => <Asosiy {...props} />}
              />
              <Route
                path="/main"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/listOfMagazines"
                exact
                component={(props) => <JurnallarRoyxati {...props} />}
              />

              <Route
                path="/main/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/release/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/termsOfPublication"
                exact
                component={(props) => <NashrShartlari {...props} />}
              />

              <Route
                path="/contact"
                exact
                component={(props) => <Aloqa {...props} />}
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
                path="/registerReviewer"
                exact
                component={ReviewerRegisterForm}
              />

              <Redirect from="/reviewer" exact to="/reviewer/myTasks" />

              <ProtectedRoute
                path="/reviewer"
                component={ReviewerLayout}
                // render={(props) => <ReviewerLayout {...props} />}
              />
              <Redirect to="/not-found" />
            </Switch>
          </>
        );
      if (user.id === 4)
        return (
          <>
            <DemoNavbar />
            <ToastContainer />
            <Switch>
              <Route
                path="/"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/main"
                exact
                component={(props) => <Asosiy {...props} />}
              />

              <Route
                path="/listOfMagazines"
                exact
                component={(props) => <JurnallarRoyxati {...props} />}
              />

              <Route
                path="/main/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <MagazineInfo {...props} />}
              />

              <Route
                path="/release/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/listOfMagazines/magazineInfo/:id"
                exact
                component={(props) => <JurnalArxive {...props} />}
              />

              <Route
                path="/termsOfPublication"
                exact
                component={(props) => <NashrShartlari {...props} />}
              />

              <Route
                path="/contact"
                exact
                component={(props) => <Aloqa {...props} />}
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
                path="/registerReviewer"
                exact
                component={ReviewerRegisterForm}
              />
              <Redirect from="/user" exact to="/user/user-page" />
              <ProtectedRoute
                path="/user"
                component={UserLayout}
                // render={(props) => <UserLayout {...props} />}
              />
              <Redirect to="/not-found" />
            </Switch>
          </>
        );
    } else if (!user)
      return (
        <>
          <DemoNavbar />
          <ToastContainer />
          <Switch>
            <Route
              path="/"
              exact
              component={(props) => <Asosiy {...props} />}
            />
            <Route
              path="/main/magazineInfo/:id"
              exact
              component={(props) => <MagazineInfo {...props} />}
            />
            <Route
              path="/listOfMagazines/magazineInfo/:id"
              exact
              component={(props) => <MagazineInfo {...props} />}
            />
            <Route
              path="/main"
              exact
              component={(props) => <Asosiy {...props} />}
            />
            <Route
              path="/listOfMagazines"
              exact
              component={(props) => <JurnallarRoyxati {...props} />}
            />
            <Route
              path="/release/:id"
              exact
              component={(props) => <JurnalArxive {...props} />}
            />
            <Route
              path="/listOfMagazines/magazineInfo/:id"
              exact
              component={(props) => <JurnalArxive {...props} />}
            />
            <Route
              path="/termsOfPublication"
              exact
              component={(props) => <NashrShartlari {...props} />}
            />
            <Route
              path="/contact"
              exact
              component={(props) => <Aloqa {...props} />}
            />
            PJu
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
              path="/registerReviewer"
              exact
              component={ReviewerRegisterForm}
            />
            <Route path="/not-found" component={NotFound} />
            {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
            {/* <ProtectedRoute path="/admin" component={AdminPage} /> */}
            {/* <ProtectedRoute path="/reductor" component={ReductorPage} /> */}
            {/* <ProtectedRoute path="/reviewer" component={ReviewerPage} /> */}
            {/* <ProtectedRoute path="/user" component={UserPage} /> */}
            <Redirect to="/not-found" />
          </Switch>
        </>
      );
  }
}

export default App;
