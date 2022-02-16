import React from "react";
import { Redirect, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { me } from "../services/authService";
import UserInformations from "../routes/userInformations";
import UserNav from "../components/userNav";
import ProtectedRoute from "../components/protectedRoute";
import ArticleForm from "../components/common/articleForm";

import "../styles/userPageStyles.css";
import ChangeImage from "../routes/changeImage";
import ChangePassword from "./../routes/changePassword";
import BrowserRouter from "react-router-dom/BrowserRouter";

class UserPage extends React.Component {
  state = {
    currentUser: null,
  };

  async componentDidMount() {
    const { data } = await me();
    this.setState({ user: data });

    this.setState({ currentUser: jwtDecode(localStorage.getItem("token")) });
  }

  render() {
    if (this.state.currentUser) {
      if (this.state.currentUser.roles[0].roleName !== "ROLE_USER") {
        this.props.history.replace("/");
      }
    }

    return (
      <BrowserRouter>
        <div className="user__page__container">
          <div className="container d-flex">
            <UserNav user={this.state.user} />
            <Switch>
              <ProtectedRoute
                exact
                user={this.state.user}
                path="/user/my-profile"
                component={UserInformations}
              />
              <ProtectedRoute
                path="/user/articleForm"
                component={ArticleForm}
              />
              <ProtectedRoute
                path="/user/changeImage"
                component={ChangeImage}
              />
              <ProtectedRoute
                path="/user/changePassword"
                component={ChangePassword}
              />
              {/* <Redirect from="/" exact to="/" /> */}
              {/* <Redirect to="/not-found" /> */}
              {/* <ArticleActivation /> */}
              {/*  <ArticleReductor/>*/}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default UserPage;
