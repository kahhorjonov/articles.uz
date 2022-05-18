import React, { Component } from "react";
import { me } from "services/authService";
import { getAllActiveLanguages } from "services/languageService";
import { profileEdit } from "services/userService";
import { profilePhoto, downloadMedia } from "services/mediaService";
import { downloadFile } from "services/mediaService";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import noUser from "assets/img/no-user-image.gif";
import ru from "translations/ru";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class User extends Component {
  state = {
    firstName: "",
    lastName: "",
    fatherName: "",
    phoneNumber: "xyz",
    password: "xyz",
    academicDegree: "",
    workPlace: "",
    scientificWork: "",
    workExperience: "",
    email: "",

    currentUser: {},
    photo: "",

    selectedValues: [],
    options: [],
    codes: [],

    selectedValues2: [],
    // options2: [],
    // codes2: [],

    lang: "",
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    await this.getUserByMe();
    await this.handleGetLanguages();

    this.handleFillDefaultIds();
  }

  handleFillDefaultIds = async () => {
    this.state.selectedValues &&
      this.state.selectedValues.map((language) =>
        this.setState({ codes: [...this.state.codes, language.id] })
      );

    // this.state.selectedValues2 &&
    //   this.state.selectedValues2.map((category) =>
    //     this.setState({ codes2: [...this.state.codes2, category.id] })
    //   );
  };

  handleGetLanguages = async () => {
    try {
      await getAllActiveLanguages().then((res) => {
        this.setState({ options: res.data });
      });
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

  getUserByMe = async () => {
    await me()
      .then((res) => {
        this.setState({ currentUser: res.data });
        this.setState({ phoneNumber: res.data.phoneNumber });
        if (res.data.photos[0]) {
          this.getImage(res.data.photos[0].id);
        }
        this.setState({ selectedValues: res.data.languages });
        this.setState({ selectedValues2: res.data.categories });
      })
      .catch((ex) => toast.error(ex.response.data.message));
  };

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (await downloadMedia(id, { responseType: "blob" })).data;
    } catch (err) {
      return null;
    }

    return this.setState({ photo: URL.createObjectURL(imageBlob) });
  };

  // onSelect2 = (selectedList, selectedItem) => {
  //   this.setState({
  //     selectedValues2: selectedList,
  //   });

  //   this.setState({ codes2: [...this.state.codes2, selectedItem.id] });
  // };

  // onRemove2 = (selectedList, removedItem) => {
  //   const newCodes = new Set(
  //     this.state.codes2.filter((id) => id !== removedItem.id)
  //   );
  //   this.setState({ selectedList2: selectedList });
  //   this.setState({ codes2: [...newCodes] });
  // };

  handleSubmit = async (e) => {
    e.preventDefault();

    await profileEdit(this.state)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        this.getUserByMe();
      })
      .catch((ex) => toast.error(ex.data.message));
  };

  handleDownload = async () => {
    const { id, originalName, contentType } = this.state.currentUser
      .scientificWork.length
      ? this.state.currentUser.scientificWork[0]
      : undefined;

    if (id && originalName && contentType) {
      try {
        await downloadFile(id, {
          method: "GET",
          headers: {
            "Content-Type": contentType,
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", originalName);

            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);
          });
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("file topilmadi");
    }
  };

  onImageChange = async (photo) => {
    this.setState({
      photo: URL.createObjectURL(photo),
    });

    try {
      await profilePhoto(photo).then((res) => toast.success(res.data.message));
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const { lang } = this.state;

    const {
      firstName,
      lastName,
      phoneNumber,
      academicDegree,
      workPlace,
      code,
      scientificWork,
      workExperience,
      email,
      languages,
      createdAt,
      fatherName,
    } = this.state.currentUser;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  {/* <img alt="..." src={damirBosnjak} /> */}
                </div>
                <CardBody>
                  <div className="author">
                    <a href="" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="no Photo"
                        className="avatar border-gray"
                        src={this.state.photo ? this.state.photo : noUser}
                      />

                      <h5 className="title">
                        {firstName} {lastName}
                      </h5>
                    </a>
                  </div>
                  <p className="description text-center">
                    {`${
                      lang === "ru" ? ru.reviewerRegister_6 : "Ilmiy Daraja"
                    }: ${academicDegree}`}
                  </p>

                  <h6 className="p-0 m-0">ID:{code}</h6>

                  <label>{lang === "ru" ? ru.foto : "Profil Rasmi"}</label>
                  <Input
                    className="p-0 col-md-8"
                    type="file"
                    onChange={(e) => {
                      e.preventDefault();
                      e.target.files[0] &&
                        this.onImageChange(e.target.files[0]);
                    }}
                  />
                </CardBody>
                <CardFooter>
                  {/* <hr /> */}
                  {/* <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          13
                          <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          1GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          124,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div> */}
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    {lang === "ru" ? ru.admin_edit : "Autentifikatsiya"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="12" xs="12">
                          <FormGroup>
                            <label>
                              {lang === "ru" ? ru.admin_edit : "Telefon raqami"}
                            </label>
                            <Input
                              defaultValue={phoneNumber}
                              type="text"
                              onChange={(e) =>
                                this.setState({
                                  phoneNumber: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="12" xs="12">
                          <FormGroup>
                            <label>
                              {lang === "ru" ? ru.login_password : "Parol"}
                            </label>
                            <Input
                              type="text"
                              placeholder={
                                lang === "ru" ? ru.login_password : "Parol"
                              }
                              onChange={(e) =>
                                this.setState({
                                  password: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </li>

                    <li>
                      {/* <Row>
                        <Col md="12" xs="12">
                          <FormGroup>
                            <label>Parol (qayta)</label>
                            <Input
                              // defaultValue="Toshkent Shahar, Yunusobod tumani"
                              placeholder="parol"
                              type="text"
                              onChange={(e) =>
                                this.setState({
                                  workExperience: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">
                    {lang === "ru" ? ru.edit : "Tahrirlash"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col sm="4" md="4" lg="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.reviewerRegister_1 : "Ism"}
                          </label>
                          <Input
                            defaultValue={firstName}
                            type="text"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4" lg="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.reviewerRegister_2 : "Familiya"}
                          </label>
                          <Input
                            defaultValue={lastName}
                            type="text"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="4" md="4" lg="4">
                        <FormGroup>
                          <label>
                            {lang === "ru"
                              ? ru.reviewerRegister_3
                              : "Otasining Ismi"}
                          </label>
                          <Input
                            defaultValue={fatherName}
                            type="text"
                            onChange={(e) =>
                              this.setState({ fatherName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.workplace : "Ish joyi"}
                          </label>
                          <Input
                            defaultValue={workPlace && workPlace}
                            type="text"
                            onChange={(e) =>
                              this.setState({ workPlace: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>
                            {lang === "ru"
                              ? ru.register_date
                              : "Ro'yxatdan o'tgan sana"}
                          </label>
                          <Input
                            disabled
                            placeholder={
                              createdAt &&
                              new Date(createdAt).toLocaleDateString()
                            }
                            type="text"
                            onChange={(e) =>
                              this.setState({ username: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <Input
                            defaultValue={email}
                            placeholder="Email"
                            type="email"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Toshkent Shahar, Yunusobod tumani"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.download : "Yuklab olish"}
                          </label>
                          <Button
                            disabled={
                              this.state.currentUser.scientificWork !== 0
                                ? false
                                : true
                            }
                            className="m-0"
                            style={{ width: "100%", padding: "0.75rem" }}
                            onClick={() => this.handleDownload()}
                          >
                            {lang === "ru"
                              ? ru.reviewerRegister_9
                              : "Ilmiy ishlardan namuna"}
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.reviewerRegister_6 : "Daraja"}
                          </label>
                          <Input
                            defaultValue={academicDegree}
                            type="text"
                            onChange={(e) =>
                              this.setState({
                                academicDegree: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru"
                              ? ru.reviewerRegister_5
                              : "Tajriba (yil)"}
                          </label>
                          <Input
                            defaultValue={workExperience}
                            min={0}
                            type="number"
                            onChange={(e) =>
                              this.setState({
                                workExperience: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>{lang === "ru" ? ru.tillar : "Tillar"}</label>
                          <Multiselect
                            options={this.state.options}
                            selectedValues={this.state.selectedValues}
                            onSelect={this.onSelect}
                            onRemove={this.onRemove}
                            displayValue="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <label>
                          {lang === "ru" ? ru.kategoriya : "Kategoriya"}
                        </label>
                        <Multiselect
                          disable
                          // options={this.state.options2} // Options to display in the dropdown
                          selectedValues={this.state.selectedValues2} // Preselected value to persist in dropdown
                          // onSelect={this.onSelect2} // Function will trigger on select event
                          // onRemove={this.onRemove2} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      </Col>
                    </Row>

                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          // type="button"
                          onClick={(e) => this.handleSubmit(e)}
                        >
                          {lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default React.memo(User);
