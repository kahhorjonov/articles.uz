import React from "react";
import Joi from "joi-browser";
import Form from "components/common/form";
import auth from "services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import ru from "translations/ru";

class RestoreWithSms extends Form {
  state = {
    data: {
      phoneNumber: "",
    },

    lang: "",
    errors: {},
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });
  }

  schema = {
    phoneNumber: Joi.string().required().label("PhoneNumber"),
  };

  doSubmit = async () => {
    try {
      const { phoneNumber } = this.state.data;
      const editedNumber = `+998${phoneNumber}`.trim();
      await auth.restorePassword(editedNumber).then((res) => {
        if (localStorage.getItem("resetToken") === null) {
          localStorage.removeItem("resetToken");
        }

        if (res.data.object) {
          localStorage.setItem("resetToken", res.data.object);
        }

        toast.success(res.data.message);

        if (localStorage.getItem("resetToken")) {
          window.location = "/changePassword";
        }
      });

      // this.autoRedirect();
    } catch (ex) {
      toast.error(ex);
    }
  };

  render() {
    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">
            {this.state.lang === "ru" ? ru.restore_h1 : "Parolni tiklash"}
          </h1>

          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderLoginInput(
              "phoneNumber",
              this.state.lang === "ru" ? ru.login_tel : "Telefon raqami"
            )}

            <Button onClick={this.doSubmit}>
              {this.state.lang === "ru" ? ru.restore_1 : "Sms kodni olish"}
            </Button>
          </form>

          <Link className="rever" style={{ fontSize: "2rem" }} to="/login">
            {this.state.lang === "ru" ? ru.login_h2 : "Profilga kirish"}
          </Link>
          <br />
        </div>
      </div>
    );
  }
}

export default React.memo(RestoreWithSms);
