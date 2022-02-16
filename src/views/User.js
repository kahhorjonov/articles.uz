import React, { Component } from "react";
import authService from "../services/authService";

import { profileEdit } from "../services/userService";

// reactstrap components
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
  ButtonToolbar,
} from "reactstrap";

import mikeImg from "../assets/img/mike.jpg";
import damirBosnjak from "../assets/img/damir-bosnjak.jpg";

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
    languages: "",

    currentUser: {},
  };

  async componentDidMount() {
    await this.getUserByMe();
  }

  getUserByMe = async () => {
    await authService
      .me()
      .then((res) => {
        // console.log(res.data);
        this.setState({ currentUser: res.data });
        this.setState({ phoneNumber: res.data.phoneNumber });
      })
      .catch((ex) => console.log(ex));
  };

  handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log(this.state);

    await profileEdit(this.state)
      .then((res) => {
        console.log(res);
        this.getUserByMe();
      })
      .catch((ex) => console.log(ex));
  };

  handleDownload = async (fileId, fileName, type) => {
    // if (fileId !== null) {
    await fetch(
      `http://192.168.100.27:8080/api/attachment/download/${fileId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": type,
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((ex) => {
        console.log(ex);
      });
    // } else {
    //   toast.error("file mavjud emas");
    // }
  };

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      academicDegree,
      workPlace,
      scientificWork,
      workExperience,
      email,
      languages,
    } = this.state.currentUser;

    console.log(this.state.currentUser);

    // const { id, contentType, fileName } = this.state.currentUser.scientificWork;

    // console.log(id);
    // console.log(contentType);
    // console.log(fileName);

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={damirBosnjak} />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={mikeImg}
                      />
                      <h5 className="title">
                        {firstName} {lastName}
                      </h5>
                    </a>
                    {/* <p className="description">{`Username: ${username}`}</p> */}
                  </div>
                  <p className="description text-center">
                    {`Academic Degree: ${academicDegree}`}
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
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
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Auth</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="12" xs="12">
                          <FormGroup>
                            <label>Phone Number</label>
                            <Input
                              defaultValue={phoneNumber}
                              placeholder="telefon nomer"
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
                            <label>Parol</label>
                            <Input
                              placeholder="parol"
                              type="text"
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
                  <CardTitle tag="h5">Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Ish joyi </label>
                          <Input
                            defaultValue={workPlace}
                            placeholder="Company"
                            type="text"
                            onChange={(e) =>
                              this.setState({ workPlace: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Ro'yxatdan o'tgan sana</label>
                          <Input
                            disabled
                            // defaultValue={new Date(createdAt ? createdAt : null)
                            //   .toISOString()
                            //   .slice(0, 10)}
                            placeholder="Ro'yxatdan o'tgan sana"
                            type="text"
                            onChange={(e) =>
                              this.setState({ username: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
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
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={firstName}
                            placeholder="Ismingiz"
                            type="text"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={lastName}
                            placeholder="Familiyangiz"
                            type="text"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
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
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Ilmiy Ishlarni yuklash</label>
                          <Button
                            disabled={
                              this.state.currentUser.scientificWork
                                ? false
                                : true
                            }
                            className="m-0"
                            style={{ width: "100%" }}
                            onClick={() =>
                              this.handleDownload(
                                this.state.currentUser.scientificWork[0].id,

                                this.state.currentUser.scientificWork[0]
                                  .originalName,

                                this.state.currentUser.scientificWork[0]
                                  .contentType
                              )
                            }
                          >
                            Ilmiy Ishlarni yuklash
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Daraja</label>
                          <Input
                            defaultValue={academicDegree}
                            placeholder="Daraja"
                            type="text"
                            onChange={(e) =>
                              this.setState({
                                academicDegree: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Work Experience (year)</label>
                          <Input
                            defaultValue={workExperience}
                            placeholder="Ish tajribangiz"
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
                          <label>Tillar</label>
                          <Input
                            type="textarea"
                            defaultValue={languages}
                            onChange={(e) =>
                              this.setState({ languages: e.target.value })
                            }
                          />
                        </FormGroup>
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
                          Update Profile
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

export default User;
