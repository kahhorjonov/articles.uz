import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import { Link } from "react-router-dom";
import { getCategories } from "../services/getCategories";
import { toast } from "react-toastify";
import authService from "../services/authService";
import jwtDecode from "jwt-decode";
import Multiselect from "multiselect-react-dropdown";
import firebase from "../firebase";
import { getAllActiveLanguages } from "services/languageService";

import { Card, CardBody, Row, Col } from "reactstrap";

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
      categoryIdList: "",
      workPlace: "",
      workExperience: 0,
      academicDegree: "",
      languages: "",
      passport: [],
      scientificWork: [],
    },

    categories: [],
    errors: {},

    notificationToken: "",
    selectedValues: [],
    options: [],
    codes: [],
    checkedArticles: [],
  };

  async componentDidMount() {
    try {
      const msg = firebase.messaging();
      msg
        .requestPermission()
        .then(() => {
          return msg.getToken();
        })
        .then((data) => {
          this.setState({ notificationToken: data });
        });
    } catch (ex) {
      toast.info(
        "Iltimos sizga xabar jo'natishimiz uchun brauzer xabarnomasiga ruxsat bering!"
      );
    }
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
    categoryIdList: Joi.string().required().label("CategoryIdList"),
    workPlace: Joi.string().required().label("WorkPlace"),
    workExperience: Joi.number().required().label("WorkExperience"),
    academicDegree: Joi.string().required().label("AcademicDegree"),
    languages: Joi.string().required().label("Languages"),
    passport: Joi.required().label("Passport"),
    scientificWork: Joi.required().label("Qilingan ishlardan namuna"),
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async componentDidMount() {
    await this.populateCategories();
  }

  doSubmit = async () => {
    try {
      await userService.registerReviewer(this.state.data).then((res) => {
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
    }
  };

  render() {
    return (
      <div className="registerForm">
        <h3 style={{ textAlign: "center" }}>Reviewer Register Form</h3>
        <div className="col-md-8 m-auto">
          <Card className="user-card card">
            <Row className="mr-0 ml-0">
              <form className="w-100" onSubmit={this.handleSubmit}>
                <CardBody style={{ textAlign: "center" }}>
                  <Row>
                    <Col md="4" sm="6" lg="4">
                      {this.renderInput("firstName", "Ismi")}
                    </Col>
                    <Col md="4" sm="6" lg="4">
                      {this.renderInput("lastName", "Familiyasi")}
                    </Col>
                    <Col md="4" lg="4">
                      {this.renderInput("fatherName", "Sharifi")}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" sm="4" className="app">
                      {/* {this.renderInput("phoneNumber", "Telefon raqami")} */}
                      {this.renderLoginInput("phoneNumber", "Telefon raqami")}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderInput("email", "Email", "email")}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderInput("password", "Password", "password")}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" sm="3">
                      {this.renderSelect(
                        "categoryIdList",
                        "CategoryIdList",
                        this.state.categories
                      )}
                    </Col>
                    <Col md="3" sm="3">
                      {this.renderInput("workPlace", "WorkPlace")}
                    </Col>
                    <Col md="3" sm="3">
                      {this.renderInput(
                        "workExperience",
                        "WorkExperience",
                        "number"
                      )}
                    </Col>
                    <Col md="3" sm="3">
                      {this.renderInput("academicDegree", "AcademicDegree")}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" sm="4">
                      <label>Languages</label>
                      <Multiselect
                        options={this.state.options} // Options to display in the dropdown
                        selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderPassportInput("passport", "Passport", "file")}
                    </Col>
                    <Col md="4" sm="4">
                      {this.renderWorksInput(
                        "scientificWork",
                        "Qilingan ishlardan namuna",
                        "file"
                      )}
                    </Col>
                  </Row>
                  <div className="bt mt-5">{this.renderButton("Register")}</div>
                </CardBody>
              </form>
            </Row>
          </Card>
        </div>

        <h3>Akkauntingiz bormi?</h3>
        <Link style={{ fontSize: "2rem" }} to="/login">
          Profilga kirish
        </Link>
      </div>
    );
  }
}

export default ReviewerRegisterForm;
