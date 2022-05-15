import React from "react";
import Joi from "joi-browser";
import Form from "components/common/form";
import { changePassword, getCurrentUser } from "services/authService";
import { toast } from "react-toastify";
import ru from "translations/ru";

class RestorePassword extends Form {
  state = {
    data: {
      verificationCode: "",
      password: "",
    },

    lang: "",
    errors: {},
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });
  }

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
    console.log(this.state);

    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">
            {this.state.lang === "ru" ? ru.restore_h1 : "Parolni tiklash"}
          </h1>

          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderInput(
              "verificationCode",
              this.state.lang === "ru" ? ru.restore_2 : "Tasdiqlash kodi"
            )}
            {this.renderInput(
              "password",
              this.state.lang === "ru" ? ru.login_password : "Parol",
              "password"
            )}

            {this.renderButton(
              this.state.lang === "ru" ? ru.restore_3 : "Tasdiqlash"
            )}
          </form>

          <br />
        </div>
      </div>
    );
  }
}

export default RestorePassword;
