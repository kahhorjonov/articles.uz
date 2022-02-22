import React, { Component } from "react";
import userService from "../services/userService";

import "../styles/userEdit.css";
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
  Label,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  NavLink,
  Table,
} from "reactstrap";

import mikeImg from "../assets/img/mike.jpg";
import damirBosnjak from "../assets/img/damir-bosnjak.jpg";
import { toast } from "react-toastify";

class UserEdit extends Component {
  state = {
    userId: "",
    firstName: "",
    lastName: "",
    academicDegree: "",
    categories: "",
    createdAt: "",
    email: "",
    enabled: "",
    fatherName: "",
    languages: "",
    phoneNumber: "",
    password: "",
    photos: [],
    scientificWork: [],
    workExperience: "",
    workPlace: "",
    userData: {},
    articleStatistics: {},

    accepteds: "",
    checkAndAccepteds: "",
    checkAndCancels: "",
    checkAndRecycles: "",
    didNotAccepteds: "",
  };

  async componentDidMount() {
    const userId = this.props.history.location.pathname.slice(17);
    this.setState({ userId: userId });
    // console.log(userId);

    await userService
      .getUserForEdit(userId)
      .then((res) => {
        this.setState({ userData: res.data.object });
      })
      .catch((ex) => console.log(ex));

    await userService
      .getStatisticsOfArticles(userId)
      .then((res) => {
        this.setState({
          accepteds: res.data.accepteds,
          checkAndAccepteds: res.data.checkAndAccepteds,
          checkAndCancels: res.data.checkAndCancels,
          checkAndRecycles: res.data.checkAndRecycles,
          didNotAccepteds: res.data.didNotAccepteds,
        });
      })
      .catch((ex) => console.log(ex));
  }

  updateProfileByAdmin = async () => {
    await userService
      .profileEditFromAdmin(this.state)
      .then((res) => toast.success(res.data.message))
      .catch((ex) => toast.error(ex.response.data.message));
  };

  render() {
    const {
      firstName,
      lastName,
      academicDegree,
      categories,
      createdAt,
      email,
      languages,
      phoneNumber,
      scientificWork,
      workExperience,
      workPlace,
    } = this.state.userData;

    const {
      accepteds,
      checkAndAccepteds,
      checkAndCancels,
      checkAndRecycles,
      didNotAccepteds,
    } = this.state;

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
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={mikeImg}
                      />
                      <h5 className="title">
                        {firstName} {lastName}
                      </h5>
                    </a>
                    <p className="description">
                      tel: {phoneNumber ? phoneNumber : "nomalum"}
                    </p>
                  </div>
                  <p className="description text-center">
                    Academic Degree:{" "}
                    {academicDegree ? academicDegree : " mavjud emas"}
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          {scientificWork ? scientificWork.length : "0"} <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
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
              <Card>
                <ListGroup className="listgropus">
                  <ListGroupItem className="justify-content-between">
                    <b className="pl-3">Foydalanuvchi statistikasi</b>
                  </ListGroupItem>
                </ListGroup>

                <ListGroup className="listgropus">
                  <NavLink active href="#">
                    <ListGroupItem className="justify-content-between border-0">
                      <span>Tekshirishga olgan maqolalar</span>{" "}
                      <Badge className="badges_1" pill>
                        {accepteds ? accepteds : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink active href="#">
                    <ListGroupItem className="justify-content-between border-0">
                      <span>Tekshirishga olinmagan maqolalar</span>
                      <Badge className="badges_1" pill>
                        {didNotAccepteds ? didNotAccepteds : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink active href="#">
                    <ListGroupItem className="justify-content-between border-0">
                      <span>Maqulangan maqolalar</span>
                      <Badge className="badges_1" pill>
                        {checkAndAccepteds ? checkAndAccepteds : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink active href="#">
                    <ListGroupItem className="justify-content-between border-0">
                      <span> Maqulanmagan maqolalar</span>
                      <Badge className="badges_1" pill>
                        {checkAndCancels ? checkAndCancels : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink active href="#">
                    <ListGroupItem className="justify-content-between border-0">
                      <span>Qayta ishlashga bergan Maqolalar</span>
                      <Badge className="badges_1" pill>
                        {checkAndRecycles ? checkAndRecycles : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>
                </ListGroup>
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
                          <label>Ish joyi</label>
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
                            defaultValue={new Date(createdAt ? createdAt : null)
                              .toISOString()
                              .slice(0, 10)}
                            placeholder="Ro'yxatdan o'tkan sana"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <Input
                            placeholder="Email"
                            type="email"
                            defaultValue={email}
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
                            placeholder="Ism"
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
                            placeholder="Familiya"
                            type="text"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Categories</label>
                          <Input
                            defaultValue={categories ? categories[0] : "null"}
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>File</label>
                          <Input
                            // defaultValue="Ilmiy ishlar"
                            placeholder="File"
                            type="file"
                          />
                        </FormGroup>
                      </Col> */}

                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Ilmiy Ishlarni yuklash</label>
                          <Button
                            // disabled={
                            //   this.state.currentUser.scientificWork
                            //     ? false
                            //     : true
                            // }
                            className="m-0"
                            style={{ width: "100%", padding: "0.75rem" }}
                            // onClick={() =>
                            //   this.handleDownload(
                            //     this.state.currentUser.scientificWork[0].id,

                            //     this.state.currentUser.scientificWork[0]
                            //       .originalName,

                            //     this.state.currentUser.scientificWork[0]
                            //       .contentType
                            //   )
                            // }
                          >
                            Ilmiy Ishlarni yuklash
                          </Button>
                        </FormGroup>
                      </Col>

                      {/* <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Category</label>
                          <Input
                            defaultValue="Informatika"
                            placeholder="Categoriya"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col> */}

                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Daraja</label>
                          <Input
                            defaultValue="Akademik"
                            placeholder="Daraja"
                            type="text"
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
                          <label>Languages</label>
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
                          onClick={(e) => this.updateProfileByAdmin()}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                    <Row>
                      <div className="update updatess">
                        <div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              defaultChecked={false}
                              onChange={(e) => console.log(e.target.checked)}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>

                        <div>
                          <Button color="danger" outline>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="row">
                    <b className="pl-4 py-3">
                      Tekshirshga olgan maqolalarni qidirish
                    </b>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-lg-4">
                      <Form>
                        <FormGroup>
                          <Label for="exampleDate">Boshlang'ich sana</Label>
                          <Input
                            id="exampleDate"
                            name="date"
                            placeholder="Boshlang'ich sana"
                            type="date"
                          />
                        </FormGroup>
                      </Form>
                    </div>

                    <div className="col-lg-4">
                      <Form>
                        <FormGroup>
                          <Label for="exampleTime">Oxirgi sana</Label>
                          <Input
                            id="exampleDate"
                            name="time"
                            placeholder="Oxirgi sana"
                            type="date"
                          />
                        </FormGroup>
                      </Form>
                    </div>

                    <div className="col-lg-4 mt-2">
                      <Label for="exampleTime">Tasdiqlash</Label> <br />
                      <a href="#">
                        <Button color="primary" className="mt-0">
                          Qidirish
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <Table>
                  <thead>
                    <tr>
                      <th>Article Name</th>
                      <th>Tekshirilgan Vaqti</th>
                      <th>Status</th>
                      <th>Xulosa</th>
                      <th>File</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <NavLink active href="#">
                          Astranomiya asoslari
                        </NavLink>
                      </td>
                      <td>25/02/2022</td>
                      <td>Lorem, ipsum.</td>
                      <td>Hammasi yaxshi</td>
                      <td>
                        <a href="#" download>
                          File:
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserEdit;
