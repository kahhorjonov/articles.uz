import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      phoneNumber: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    phoneNumber: Joi.string().required().label("PhoneNumber"),
    password: Joi.string().required().label("Password"),
  };

  autoRedirect = () => {
    const admin = "ROLE_ADMINISTRATOR";
    const reductor = "ROLE_REDACTOR";
    const reviewer = "ROLE_REVIEWER";
    const user = "ROLE_USER";

    if (auth.getCurrentUser()) {
      const token = auth.getCurrentUser();
      const roleName = token.roles[0].roleName;

      if (roleName === admin) {
        window.location = "/admin";
      }

      if (roleName === reductor) {
        window.location = "/reductor";
      }

      if (roleName === reviewer) {
        window.location = "/reviewer";
      }
      if (roleName === user) {
        window.location = "/user/user-page";
      }
    }
  };

  doSubmit = async () => {
    try {
      const { phoneNumber, password } = this.state.data;
      await auth.login(phoneNumber, password);

      this.autoRedirect();

      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    this.autoRedirect();

    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">Login Form</h1>
          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderInput("phoneNumber", "Telefon raqami")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>

          <Link className="rever" style={{ fontSize: "2rem" }} to="/register">
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginForm;
