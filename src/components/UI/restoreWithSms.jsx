import React from "react";
import Joi from "joi-browser";
import Form from "components/common/form";
import auth from "services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

class RestoreWithSms extends Form {
  state = {
    data: {
      phoneNumber: "",
    },
    errors: {},
  };

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
          <h1 className="regs">Parolni tiklash</h1>

          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderLoginInput("phoneNumber", "Telefon raqami")}

            <Button onClick={this.doSubmit}>Send sms code</Button>
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

export default RestoreWithSms;
