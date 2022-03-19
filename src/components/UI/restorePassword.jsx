import React from "react";
import Joi from "joi-browser";
import Form from "components/common/form";
import { changePassword, getCurrentUser } from "services/authService";
import { toast } from "react-toastify";

class RestorePassword extends Form {
  state = {
    data: {
      verificationCode: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    verificationCode: Joi.string().required().label("Verification Code"),
    password: Joi.string().required().label("Password"),
  };

  autoRedirect = () => {
    if (getCurrentUser()) {
      const token = getCurrentUser();
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
      const { verificationCode, password } = this.state.data;
      await changePassword(verificationCode, password).then((res) => {
        localStorage.setItem("token", res.data.object);
        toast.success(res.data.message);
      });

      this.autoRedirect();
      localStorage.removeItem("resetToken");

      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  render() {
    this.autoRedirect();

    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">Parolni tiklash</h1>

          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderInput("verificationCode", "Verification Code")}
            {this.renderInput("password", "Password", "password")}

            {this.renderButton("Submit")}
          </form>

          <br />
        </div>
      </div>
    );
  }
}

export default RestorePassword;
