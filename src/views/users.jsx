import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "services/userService";
import { getAllActiveLanguages } from "services/languageService";
import { getCategories } from "services/getCategories";
import { toast } from "react-toastify";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";

import firebase from "../firebase";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  InputGroupText,
  Form,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
} from "reactstrap";

import "styles/usersStyles.css";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from "multiselect-react-dropdown";

class Users extends Component {
  state = {
    modal: true,
    categories: [],
    categoryId: null,
    roleUser: null,
    users: [],
    text: "777",
    activity: true,
    firstName: "",
    lastName: "",
    categoryIdForCreate: [],
    email: "",
    password: "",
    phoneNumber: "",
    roleId: "null",

    currentPage: 1,
    pageSize: 8,
    notificationToken: "",

    selectedValues: [],
    options: [],
    codes: [],
    checkedArticles: [],
    selectedValues: [],
  };

  async componentDidMount() {
    await this.populateCategories();
    await this.handleChooseRole(null);
    await this.handleGetLanguages();

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

    // await this.populateArticles();
  }

  handleGetLanguages = async () => {
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleChangeUserActivity = async (userId, activity) => {
    await userService
      .changeUserActivity(userId, activity)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((ex) => {
        toast.error(ex.res.data.message);
      });
  };

  handleChange = async (text) => {
    const data = {
      search: text,
      roles_id: this.state.roleUser,
      enabled: this.state.activity,
      categoryId: this.state.categoryId,
    };

    await userService
      .searchUser(data)
      .then((res) => {
        this.setState({ users: res.data.object });
      })
      .catch((ex) => {
        toast.error(ex.message);
      });
  };

  handleChooseRole = async (role) => {
    const data = {
      search: this.state.text,
      roles_id: role,
      enabled: this.state.activity,
    };

    await userService
      .searchUser(data)
      .then((res) => this.setState({ users: res.data.object }))
      .catch((ex) => {
        // toast.error(ex.response.data.message);
      });
  };

  handleChooseCategory = async (id) => {
    const data = {
      search: this.state.text,
      roles_id: this.state.roleUser,
      enabled: this.state.activity,
      categoryId: id,
    };

    await userService
      .searchUser(data)
      .then((res) => this.setState({ users: res.data.object }))
      .catch((ex) => {
        console.error(ex);
      });
  };

  handleChooseActivity = async (activity) => {
    const data = {
      search: this.state.text,
      roles_id: this.state.roleUser,
      enabled: activity,
      categoryId: this.state.categoryId,
    };

    await userService
      .searchUser(data)
      .then((res) => this.setState({ users: res.data.object }))
      .catch((ex) => {
        console.error(ex);
      });
  };

  handleRemove = async (userId) => {
    await userService
      .deleteUser(userId)
      .then((res) => toast(res.data.message))
      .catch((ex) => {
        toast.error(ex.response.data.message);
      });
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  createUser = async () => {
    const data = {
      categoryId: this.state.categoryIdForCreate,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      roleId: this.state.roleId,
      languages: this.state.codes,
    };

    await userService
      .createUser(data)
      .then((res) => {
        toast.success("Yangi foydalanuvchi qo'shildi");

        this.setState({ firstName: "" });
        this.setState({ lastName: "" });
        this.setState({ email: "" });
        this.setState({ password: "" });
        this.setState({ phoneNumber: "" });
        this.setState({ roleId: null });
      })
      .catch((ex) => {
        toast.error(ex.response.data.message);
      });
  };

  render() {
    const { users: allUsers, currentPage, pageSize } = this.state;
    const users = paginate(allUsers, currentPage, pageSize);

    return (
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row oquvchilar justify-content-between">
                  <div className="col-md-6">
                    <h2>Foydalanuvchilar</h2>
                  </div>
                  <div className="col-md-6 endt">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#myModal"
                      className="btn btn-success btSucses"
                    >
                      + Yangi foydalanuvchi qo'shish
                    </button>
                  </div>
                  <div className="modal" id="myModal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <Card
                          className="card-user m-0"
                          style={{ borderRadius: "10px" }}
                        >
                          <CardHeader>
                            <CardTitle tag="h5">
                              Foydalanuvchi Qo'shish
                            </CardTitle>
                          </CardHeader>
                          <CardBody>
                            <Form>
                              <Row>
                                <Col className="pr-1" md="6">
                                  <FormGroup>
                                    <Label>Ism</Label>
                                    <Input
                                      required
                                      placeholder="Ism"
                                      type="text"
                                      onChange={(e) => {
                                        // console.log("ismi:", e.target.value);
                                        this.setState({
                                          firstName: e.target.value,
                                        });
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                  <FormGroup>
                                    <Label>Familiya</Label>
                                    <Input
                                      required
                                      onChange={(e) =>
                                        this.setState({
                                          lastName: e.target.value,
                                        })
                                      }
                                      placeholder="Familiya"
                                      type="text"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="pr-1" md="6">
                                  <FormGroup>
                                    <Label>Telfon</Label>
                                    <InputGroup>
                                      <InputGroupText
                                        style={{ fontSize: "1.4rem" }}
                                        className="bg-white"
                                      >
                                        +998
                                      </InputGroupText>
                                      <Input
                                        required
                                        onChange={(e) =>
                                          this.setState({
                                            phoneNumber:
                                              "+998" + e.target.value,
                                          })
                                        }
                                        placeholder="Telfon"
                                        type="tel"
                                        maxLength={9}
                                        minLength={9}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                  <FormGroup>
                                    <label>Email</label>
                                    <Input
                                      required
                                      placeholder="Email"
                                      type="email"
                                      onChange={(e) =>
                                        this.setState({
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="12" sm="12" lg="12">
                                  <FormGroup>
                                    <select
                                      required
                                      style={{ fontSize: "1.4rem" }}
                                      className="custom-select"
                                      onChange={(e) => {
                                        this.setState({
                                          categoryIdForCreate: [e.target.value],
                                        });
                                      }}
                                    >
                                      <option value="null">Kategoriya</option>
                                      {this.state.categories &&
                                        this.state.categories.map(
                                          (category) => (
                                            <option
                                              key={category.id}
                                              value={category.id}
                                            >
                                              {category.name}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="pr-1" md="5">
                                  <FormGroup>
                                    <label>Type</label>
                                    <select
                                      required
                                      onChange={(e) =>
                                        this.setState({
                                          roleId: e.target.value,
                                        })
                                      }
                                      style={{ fontSize: "1.4rem" }}
                                      className="custom-select"
                                    >
                                      <option value="null">
                                        Foydalanuvchi roli
                                      </option>
                                      <option value="1">Adminstrator</option>
                                      <option value="2">Reductor</option>
                                      <option value="3">Reviewer</option>
                                      <option value="4">User</option>
                                    </select>
                                  </FormGroup>
                                </Col>
                                <Col className="pl-1" md="7">
                                  <FormGroup>
                                    <label>Parol</label>
                                    <Input
                                      required
                                      placeholder="Parol"
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

                              <Row>
                                <Col md="12">
                                  <FormGroup>
                                    <label>Languages</label>
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
                                <div className="update ml-auto mr-auto">
                                  <Button
                                    className="btn-round"
                                    color="primary"
                                    onClick={() => this.createUser()}
                                  >
                                    Create Profile
                                  </Button>
                                </div>
                              </Row>
                            </Form>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div className="guruxlar col-md-12 pt-3">
                    <hr />
                    <div className="selctlar">
                      <form className="d-flex col-md-12">
                        <div className="row w-100">
                          <div className="sle col-lg-3 col-md-6 col-sm-12 pr-0">
                            <select
                              name="roleUsers"
                              className="custom-select"
                              onChange={(e) => {
                                this.setState({ roleUser: e.target.value });
                                this.handleChooseRole(e.target.value);
                              }}
                            >
                              <option value="null">Foydalanuvchi roli</option>
                              <option value="1">Adminstrator</option>
                              <option value="2">Reductor</option>
                              <option value="3">Reviewer</option>
                              <option value="4">User</option>
                            </select>
                          </div>
                          <div className="sle col-lg-3 col-md-6 col-sm-12 pr-0">
                            <select
                              name="categories"
                              className="custom-select"
                              onChange={(e) => {
                                this.setState({ categoryId: e.target.value });
                                this.handleChooseCategory(e.target.value);
                              }}
                            >
                              <option value="null">Kategoriya</option>
                              {this.state.categories &&
                                this.state.categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="sle col-lg-3 col-md-6 col-sm-12 pr-0">
                            <select
                              name="activity"
                              className="custom-select"
                              onChange={(e) => {
                                this.setState({ activity: e.target.value });
                                this.handleChooseActivity(e.target.value);
                              }}
                            >
                              <option value="true">Activity</option>
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </div>
                          <div className="sle col-lg-3 col-md-6 col-sm-12 pr-0">
                            {/* <div className="input-group mb-3 input-group-sm"> */}
                            <input
                              type="text"
                              className="form-control p-2 ins"
                              placeholder="Qidiruv..."
                              onChange={(e) => {
                                this.handleChange(e.target.value);
                                this.setState({ text: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* TAbles */}

                    <div className="usersTables">
                      <table className="table">
                        <thead className="theades">
                          <tr className="col-lg-12 px-0">
                            <th className="col-lg-1 ">№</th>
                            <th className="col-lg-2 ">F.I.SH</th>
                            <th className="col-lg-1 ">Telfon</th>
                            <th className="col-lg-1 ">Email</th>
                            <th className="col-lg-1 ">Ish joyi</th>
                            <th className="col-lg-1 ">Ish Staji (yil)</th>
                            <th className="col-lg-1 ">Ilmiy Darajasi</th>
                            <th className="col-lg-1 ">Tili</th>
                            <th className="col-lg-1 ">Categoriyasi</th>
                            <th className="col-lg-1 ">Active</th>
                            <th className="col-lg-1 ">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="tbodyes">
                          {users &&
                            users.map((user, idx) => (
                              <tr key={user.id}>
                                <td>{idx + 1}</td>
                                <td style={{ color: "#51cbce" }}>
                                  <Link
                                    style={{ color: "#51cbce" }}
                                    to={`/admin/userEdit/:${user.id}`}
                                  >
                                    {user.firstName} {user.lastName}{" "}
                                    {user.fatherName}
                                  </Link>
                                </td>
                                <td style={{ color: "#51cbce" }}>
                                  <Link
                                    style={{ color: "#51cbce" }}
                                    to={`/admin/userEdit/:${user.id}`}
                                  >
                                    {user.phoneNumber}
                                  </Link>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.workPlace}</td>
                                <td>{user.workExperience}</td>
                                <td>{user.academicDegree}</td>
                                <td>
                                  {user.languages.map((language, idx2) => {
                                    if (user.languages.length - 1 !== idx2) {
                                      return `${language.name}, `;
                                    }
                                    return `${language.name}`;
                                  })}
                                </td>
                                <td>
                                  {user.categories.map((category, idx2) => {
                                    if (user.categories.length - 1 !== idx2) {
                                      return `${category.name}, `;
                                    }
                                    return `${category.name}`;
                                  })}
                                </td>
                                <td>
                                  <form>
                                    <div className="custom-control custom-switch">
                                      <label className="switch">
                                        <input
                                          defaultChecked={user.enabled}
                                          onChange={(e) => {
                                            this.handleChangeUserActivity(
                                              user.id,
                                              e.target.checked
                                            );
                                          }}
                                          type="checkbox"
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                    </div>
                                  </form>
                                </td>
                                <td>
                                  <button
                                    className="removeBtn"
                                    onClick={() => this.handleRemove(user.id)}
                                  >
                                    <i
                                      style={{
                                        fontSize: "4rem",
                                        paddingTop: "1rem",
                                      }}
                                      className="nc-icon nc-simple-remove iconSize"
                                    />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <Pagination
                  itemsCount={this.state.users && this.state.users.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
