import React from "react";
import Joi from "joi-browser";
import Form from "components/common/form";
import auth from "services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class RestorePassword extends Form {
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
      await auth.login(editedNumber, password);

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
          <h1 className="regs">Parolni tiklash</h1>
          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderLoginInput("phoneNumber", "Telefon raqami")}
            {this.renderInput(
              "password",
              "SMS orqali kelgan kodni kiriting",
              "password"
            )}
            {this.renderButton("Submit")}
          </form>
          <Link className="rever" style={{ fontSize: "2rem" }} to="/login">
            Profilga kirish
          </Link>
          <br />
        </div>
      </div>
    );
  }
}

export default RestorePassword;
