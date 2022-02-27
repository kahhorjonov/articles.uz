import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import jwtDecode from "jwt-decode";

import firebase from "../firebase";

import "../styles/registerStyles.css";

class RegisterForm extends Form {
  state = {
    data: {
      password: "",
      phoneNumber: "",
      // role: "",
    },
    notificationToken: "",
    errors: {},
  };

  componentDidMount() {
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        this.setState({ notificationToken: data });
      });
  }

  schema = {
    phoneNumber: Joi.string().required().label("Telefon raqami"),
    password: Joi.string().min(5).required().label("Password"),
    // role: Joi.string().required().label("Rol"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.data);
      // auth.loginWithJwt(response.headers["x-auth-token"]);
      const decodedToken = jwtDecode(response.data);
      if (decodedToken.roles[0].roleName === "ROLE_REVIEWER") {
        window.location = "/reviewerPage";
      } else {
        window.location = "/user/user-page";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log(this.state.notificationToken);

    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">Register Form</h1>
          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderInput("phoneNumber", "Telefon raqami")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>

          <Link
            style={{ fontSize: "2rem" }}
            to="/registerReviewer"
            className="rever"
          >
            Reviewer sifatida ro'yxatdan o'tish
          </Link>

          <h3 className="yes">Akkauntingiz bormi?</h3>
          <Link style={{ fontSize: "2rem" }} to="/login" className="kirish">
            Profilga kirish
            {/* <FontAwesomeIcon icon={faArrowRight} style={{ color: "black" }} /> */}
          </Link>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
