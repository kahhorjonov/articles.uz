import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "styles/login.css";
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
    if (auth.getCurrentUser()) {
      const token = auth.getCurrentUser();
      const roleName = token.roles[0].id;

      if (roleName === 1) {
        window.location = "/admin";
      }

      if (roleName === 2) {
        window.location = "/reductor";
      }

      if (roleName === 3) {
        window.location = "/reviewer";
      }
      if (roleName === 4) {
        window.location = "/user/user-page";
      }
    }
  };

  doSubmit = async () => {
    try {
      const { phoneNumber, password } = this.state.data;
      const editedNumber = `+998${phoneNumber}`.trim();
      await auth.login(password);

      this.autoRedirect();

      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("Login yoki Parol noto'g'ri");
      } else toast.error(ex);
    }
  };

  render() {
    this.autoRedirect();

    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">Login Form</h1>
          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderLoginInput("phoneNumber", "Telefon raqami")}

            {this.renderInput("password", "Password", "password")}

            {this.renderButton("Login")}
          </form>
          <Link className="rever" style={{ fontSize: "2rem" }} to="/register">
            Ro'yxatdan o'tish
          </Link>{" "}
          <br />
          <div className="mt-3">
            <Link to="/restorePassword">Parolingizni unitingizmi?</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
