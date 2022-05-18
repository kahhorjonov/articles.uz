import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import { loginWithJwt } from "../services/authService";
import jwtDecode from "jwt-decode";
import ru from "translations/ru";

// import firebase from "../firebase";
import { toast } from "react-toastify";

import "styles/registerStyles.css";

class RegisterForm extends Form {
  state = {
    data: {
      password: "",
      phoneNumber: "",
    },

    // notificationToken: "",
    lang: "",
    errors: {},
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });
  }

  // componentDidMount() {
  //   try {
  //     const msg = firebase.messaging();
  //     msg
  //       .requestPermission()
  //       .then(() => {
  //         return msg.getToken();
  //       })
  //       .then((data) => {
  //         this.setState({ notificationToken: data });
  //       });
  //   } catch (ex) {
  //     toast.info(
  //       "Iltimos sizga xabar jo'natishimiz uchun brauzer xabarnomasiga ruxsat bering!"
  //     );
  //   }
  // }

  schema = {
    phoneNumber: Joi.string().required().label("Telefon raqami"),
    password: Joi.string().min(5).required().label("Password"),
    // role: Joi.string().required().label("Rol"),
  };

  doSubmit = async () => {
    try {
      const { phoneNumber, password } = this.state.data;
      const newNumber = `+998${phoneNumber}`;
      await userService
        .register(
          newNumber,
          password
          // this.state.notificationToken
        )
        .then((res) => {
          loginWithJwt(res.data);
          toast.info(res.message);

          const decodedToken = jwtDecode(res.data);
          if (decodedToken.roles[0].roleName === "ROLE_REVIEWER") {
            window.location = "/reviewerPage";
          } else {
            window.location = "/user/user-page";
          }
        });

      // auth.loginWithJwt(response.headers["x-auth-token"]);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="registerForm">
        <div>
          <h1 className="regs">
            {this.state.lang === "ru" ? ru.register_h1 : "Ro'yxatdan o'tish"}
          </h1>

          <form className="form-register" onSubmit={this.handleSubmit}>
            {this.renderLoginInput(
              "phoneNumber",
              this.state.lang === "ru" ? ru.login_tel : "Telefon raqami"
            )}

            {this.renderInput(
              "password",
              this.state.lang === "ru" ? ru.login_password : "Parol",
              "password"
            )}

            {this.renderButton(
              this.state.lang === "ru" ? ru.register : "Ro'yxatdan o'tish"
            )}
          </form>

          <Link
            style={{ fontSize: "2rem" }}
            to="/registerReviewer"
            className="rever"
          >
            {this.state.lang === "ru"
              ? ru.register_2
              : "Taqrizchi sifatida ro'yxatdan o'tish"}
          </Link>

          <h3 className="yes">
            {this.state.lang === "ru" ? ru.register_3 : "Akkauntingiz bormi?"}
          </h3>

          <Link style={{ fontSize: "2rem" }} to="/login" className="kirish">
            {this.state.lang === "ru" ? ru.login_h2 : "Profilga kirish"}
            {/* <FontAwesomeIcon icon={faArrowRight} style={{ color: "black" }} /> */}
          </Link>
        </div>
      </div>
    );
  }
}

export default React.memo(RegisterForm);
