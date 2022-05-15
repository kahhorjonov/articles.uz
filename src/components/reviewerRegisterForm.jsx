import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "services/userService";
import { Link } from "react-router-dom";
import { getCategories } from "services/getCategories";
import { toast } from "react-toastify";
import authService from "services/authService";
import jwtDecode from "jwt-decode";
import Multiselect from "multiselect-react-dropdown";
import { getAllActiveLanguages } from "services/languageService";
import { Card, CardBody, Row, Col } from "reactstrap";
import ru from "translations/ru";

import "styles/registerStyles.css";

class ReviewerRegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      fatherName: "",
      email: "",
      phoneNumber: "",
      password: "",
      // categoryIdList: "",
      workPlace: "",
      workExperience: 0,
      academicDegree: "",
      passport: [],
      scientificWork: [],
    },

    // categories: [],

    errors: {},

    // notificationToken: "",
    selectedValues: [],
    options: [],
    codes: [],

    selectedValues2: [],
    options2: [],
    codes2: [],
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    await this.populateCategories();
    await this.handleGetLanguage();

    // try {
    //   const msg = firebase.messaging();
    //   msg
    //     .requestPermission()
    //     .then(() => {
    //       return msg.getToken();
    //     })
    //     .then((data) => {
    //       this.setState({ notificationToken: data });
    //     });
    // } catch (ex) {
    //   toast.info(
    //     "Iltimos sizga xabar jo'natishimiz uchun brauzer xabarnomasiga ruxsat bering!"
    //   );
    // }
  }

  handleGetLanguage = async () => {
    try {
      await getAllActiveLanguages().then((res) =>
        this.setState({ options: res.data })
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  onSelect = (selectedList, selectedItem) => {
    this.setState({
      selectedValues: selectedList,
    });

    this.setState({ codes: [...this.state.codes, selectedItem.id] });
  };

  onRemove = (selectedList, removedItem) => {
    const newCodes = new Set(
      this.state.codes.filter((id) => id !== removedItem.id)
    );
    this.setState({ selectedList: selectedList });
    this.setState({ codes: [...newCodes] });
  };

  schema = {
    firstName: Joi.string().required().label("Ismi"),
    lastName: Joi.string().required().label("Familiyasi"),
    fatherName: Joi.string().required().label("Sharifi"),
    email: Joi.string().email().required().label("Email"),
    phoneNumber: Joi.string().required().label("Telefon raqami"),
    password: Joi.string().min(5).required().label("Password"),
    // categoryIdList: Joi.string().required().label("CategoryIdList"),
    workPlace: Joi.string().required().label("WorkPlace"),
    workExperience: Joi.number().required().label("WorkExperience"),
    academicDegree: Joi.string().required().label("AcademicDegree"),
    passport: Joi.required().label("Passport"),
    scientificWork: Joi.required().label("Qilingan ishlardan namuna"),
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ options2: categories });
  }

  onSelect2 = (selectedList, selectedItem) => {
    this.setState({
      selectedValues2: selectedList,
    });

    this.setState({ codes2: [...this.state.codes2, selectedItem.id] });
  };

  onRemove2 = (selectedList, removedItem) => {
    const newCodes = new Set(
      this.state.codes2.filter((id) => id !== removedItem.id)
    );
    this.setState({ selectedList2: selectedList });
    this.setState({ codes2: [...newCodes] });
  };

  doSubmit = async () => {
    try {
      await userService
        .registerReviewer(this.state.data, this.state.codes, this.state.codes2)
        .then((res) => {
          authService.loginWithJwt(res.data.object);
          toast.success(res.data.message);

          setTimeout(() => {
            const decodedToken = jwtDecode(res.data.object);
            if (decodedToken.roles[0].roleName === "ROLE_REVIEWER") {
              window.location = "/reviewer/myTasks";
            } else {
              window.location = "/user/user-page";
            }
          }, 1500);
        });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      toast.info(ex.response.data.message);
    }
  };

  render() {
    return (
      <div className="registerForm">
        <h3 style={{ textAlign: "center" }}>
          {this.state.lang === "ru"
            ? ru.register_2
            : "Taqrizchi sifatida ro'yxatdan o'tish"}
        </h3>
        <div className="col-md-8 m-auto">
          <Card className="user-card card">
            <Row className="mr-0 ml-0">
              <form className="w-100" onSubmit={this.handleSubmit}>
                <CardBody style={{ textAlign: "center" }}>
                  <Row>
                    <Col md="4" sm="6" lg="4">
                      {this.renderInput(
                        "firstName",
                        this.state.lang === "ru" ? ru.reviewerRegister_1 : "Ism"
                      )}
                    </Col>
                    <Col md="4" sm="6" lg="4">
                      {this.renderInput(
                        "lastName",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_2
                          : "Familiya"
                      )}
                    </Col>
                    <Col md="4" lg="4">
                      {this.renderInput(
                        "fatherName",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_3
                          : "Otasining Ismi"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" sm="4" className="app">
                      {/* {this.renderInput("phoneNumber", "Telefon raqami")} */}
                      {this.renderLoginInput(
                        "phoneNumber",
                        this.state.lang === "ru" ? ru.login_tel : "Telefon"
                      )}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderInput("email", "Email", "email")}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderInput(
                        "password",
                        this.state.lang === "ru" ? ru.login_password : "Parol",
                        "password"
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <label>
                        {this.state.lang === "ru"
                          ? ru.kategoriya
                          : "Kategoriya"}
                      </label>
                      <Multiselect
                        options={this.state.options2} // Options to display in the dropdown
                        selectedValues={this.state.selectedValues2} // Preselected value to persist in dropdown
                        onSelect={this.onSelect2} // Function will trigger on select event
                        onRemove={this.onRemove2} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4" sm="4">
                      {this.renderInput(
                        "workPlace",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_4
                          : "Ish joyi"
                      )}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderInput(
                        "workExperience",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_5
                          : "Tajribasi (yil)",
                        "number"
                      )}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderInput(
                        "academicDegree",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_6
                          : "Ilmiy Darajasi"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" sm="4">
                      <label>
                        {this.state.lang === "ru" ? ru.tillar : "Tillar"}
                      </label>
                      <Multiselect
                        id="search_input2"
                        options={this.state.options} // Options to display in the dropdown
                        selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderPassportInput(
                        "passport",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_7
                          : "Pasport",
                        "file"
                      )}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderWorksInput(
                        "scientificWork",
                        this.state.lang === "ru"
                          ? ru.reviewerRegister_8
                          : "Образец выполненной работы * (zip, 7zip, rar)",
                        "file"
                      )}
                    </Col>
                  </Row>
                  <div className="bt mt-5">
                    {this.renderButton(
                      this.state.lang === "ru"
                        ? ru.login_register
                        : "Ro'yxatdan o'tish"
                    )}
                  </div>
                </CardBody>
              </form>
            </Row>
          </Card>
        </div>

        <h3>
          {this.state.lang === "ru" ? ru.register_3 : "Akkauntingiz bormi?"}
        </h3>
        <Link style={{ fontSize: "2rem" }} to="/login">
          {this.state.lang === "ru" ? ru.login_h2 : "Profilga kirish"}
        </Link>
      </div>
    );
  }
}

export default ReviewerRegisterForm;
