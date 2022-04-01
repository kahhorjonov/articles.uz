import React, { Component } from "react";
import { Link } from "react-router-dom";
import ru from "translations/ru";

import {
  changeUserActivity,
  deleteUser,
  getStatisticsOfArticles,
  getUserForEdit,
  profileEditFromAdmin,
} from "services/userService";
import Multiselect from "multiselect-react-dropdown";
import noUser from "assets/img/no-user-image.gif";

import { getAllActiveLanguages } from "services/languageService";
import { getArticlesCheckedByReviewers } from "services/articleService";
import { downloadMedia } from "services/mediaService";
import { toast } from "react-toastify";

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

import "styles/userEdit.css";

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
    photo: "",

    accepteds: "",
    checkAndAccepteds: "",
    checkAndCancels: "",
    checkAndRecycles: "",
    didNotAccepteds: "",

    selectedValues: [],
    options: [],
    codes: [],

    selectedValues2: [],
    options2: [],
    codes2: [],

    checkedArticles: [],

    lang: "",
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    const userId = this.props.history.location.pathname.slice(17);
    this.setState({ userId: userId });
    this.handleGetLanguages();

    await getUserForEdit(userId)
      .then((res) => {
        this.setState({ userData: res.data.object });
        if (res.data.object.photos[0]) {
          this.getImage(res.data.object.photos[0].id);
        }
        this.getCheckedArticles(userId);
        this.setState({ selectedValues: res.data.object.languages });
        this.setState({ selectedValues2: res.data.object.categories });
      })
      .catch((ex) => toast.error(ex.response.data.message));

    await getStatisticsOfArticles(userId)
      .then((res) => {
        this.setState({
          accepteds: res.data.accepteds,
          checkAndAccepteds: res.data.checkAndAccepteds,
          checkAndCancels: res.data.checkAndCancels,
          checkAndRecycles: res.data.checkAndRecycles,
          didNotAccepteds: res.data.didNotAccepteds,
        });
      })
      .catch((ex) => toast.error(ex.response.data.message));

    this.handleFillDefaultIds();
  }

  handleFillDefaultIds = () => {
    this.state.selectedValues &&
      this.state.selectedValues.map((language) =>
        this.setState({ codes: [...this.state.codes, language.id] })
      );

    this.state.selectedValues2 &&
      this.state.selectedValues2.map((category) =>
        this.setState({ codes2: [...this.state.codes2, category.id] })
      );
  };

  handleGetLanguages = async () => {
    try {
      await getAllActiveLanguages().then((res) =>
        this.setState({ options: res.data })
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getCheckedArticles = async (id) => {
    try {
      await getArticlesCheckedByReviewers(id).then((res) =>
        this.setState({ checkedArticles: res.data.object })
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
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

  updateProfileByAdmin = async () => {
    await profileEditFromAdmin(this.state)
      .then((res) => toast.success(res.data.message))
      .catch((ex) => toast.error(ex.response.data.message));
  };

  handleDownload = async (id, originalName, contentType) => {
    if (id && originalName && contentType) {
      try {
        await fetch(
          `http://192.168.100.27:8080/api/attachment/download/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": contentType,
            },
          }
        )
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

  handleChange = async (bool) => {
    try {
      await changeUserActivity(this.state.userId, bool).then((res) =>
        toast.success(res.data.message)
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleDelete = async () => {
    try {
      await deleteUser(this.state.userId).then((res) => {
        toast.success(res.data.message);
        this.props.history.goBack();
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
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
      passport,
      enabled,
    } = this.state.userData;

    const {
      accepteds,
      checkAndAccepteds,
      checkAndCancels,
      checkAndRecycles,
      didNotAccepteds,
      checkedArticles,
      lang,
    } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image"></div>
                <CardBody>
                  <div className="author">
                    <a href="" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="no photo"
                        className="avatar border-gray"
                        src={this.state.photo ? this.state.photo : noUser}
                      />
                      <h5 className="title">
                        {firstName} {lastName}
                      </h5>
                    </a>
                    <p className="description">
                      {lang === "ru" ? ru.login_tel : "Telefon"}:{" "}
                      {phoneNumber ? phoneNumber : "nomalum"}
                    </p>
                  </div>
                  <p className="description text-center">
                    {lang === "ru" ? ru.reviewerRegister_6 : "Ilmiy Darajasi "}:{" "}
                    {academicDegree ? academicDegree : " mavjud emas"}
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="mx-auto" lg="6" md="6" xs="6">
                        <h5>
                          <Button
                            className="m-0"
                            style={{ width: "100%", padding: "0.75rem" }}
                            onClick={() =>
                              this.handleDownload(
                                passport && passport.id,

                                passport && passport.originalName,

                                passport && passport.contentType
                              )
                            }
                          >
                            {lang === "ru"
                              ? ru.downloadPassport
                              : "Pasportni yuklash"}
                          </Button>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    {lang === "ru" ? ru.admin_edit : "Tahrirlash"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="12" xs="12">
                          <FormGroup>
                            <label>
                              {lang === "ru" ? ru.login_tel : "Telefon"}:{" "}
                            </label>
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
                            <label>
                              {this.state.lang === "ru"
                                ? ru.login_password
                                : "Parol"}
                            </label>
                            <Input
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
                    <b className="pl-3">
                      {lang === "ru"
                        ? ru.info_user
                        : "Foydalanuvchi statistikasi"}
                    </b>
                  </ListGroupItem>
                </ListGroup>

                <ListGroup className="listgropus">
                  <NavLink>
                    <ListGroupItem className="justify-content-between border-0">
                      <span>
                        {lang === "ru"
                          ? ru.user_checked
                          : "Tekshirishga olgan maqolalar"}
                      </span>{" "}
                      <Badge
                        style={{ fontSize: "100%" }}
                        className="badges_1"
                        pill
                      >
                        {accepteds ? accepteds : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink>
                    <ListGroupItem className="justify-content-between border-0">
                      <span>
                        {lang === "ru"
                          ? ru.user_noChecked
                          : "Tekshirishga olinmagan maqolalar"}
                      </span>
                      <Badge
                        style={{ fontSize: "100%" }}
                        className="badges_1"
                        pill
                      >
                        {didNotAccepteds ? didNotAccepteds : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink>
                    <ListGroupItem className="justify-content-between border-0">
                      <span>
                        {lang === "ru"
                          ? ru.user_published
                          : "Chop etilgan maqolalar"}
                      </span>
                      <Badge
                        style={{ fontSize: "100%" }}
                        className="badges_1"
                        pill
                      >
                        {checkAndAccepteds ? checkAndAccepteds : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink>
                    <ListGroupItem className="justify-content-between border-0">
                      <span>
                        {lang === "ru"
                          ? ru.maqolalar_rad_etilgan
                          : "Maqulanmagan maqolalar"}
                      </span>
                      <Badge
                        style={{ fontSize: "100%" }}
                        className="badges_1"
                        pill
                      >
                        {checkAndCancels ? checkAndCancels : "0"}
                      </Badge>
                    </ListGroupItem>
                  </NavLink>

                  <NavLink>
                    <ListGroupItem className="justify-content-between border-0">
                      <span>
                        {lang === "ru"
                          ? ru.admin_4
                          : "Qayta ishlashga bergan Maqolalar"}
                      </span>
                      <Badge
                        style={{ fontSize: "100%" }}
                        className="badges_1"
                        pill
                      >
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
                  <CardTitle tag="h5">
                    {lang === "ru" ? ru.edit : "Tahrirlash"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
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
                      <Col md="6">
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
                    </Row>

                    {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Kategoriya</label>
                          <Input
                            defaultValue={categories ? categories[0] : "null"}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}

                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.workplace : "Ish joyi"}
                          </label>
                          <Input
                            defaultValue={workPlace}
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
                            value={new Date(
                              createdAt && createdAt
                            ).toLocaleDateString()}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
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

                      <Col md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.download : "Yuklab olish"}
                          </label>
                          <Button
                            className="m-0"
                            style={{ width: "100%", padding: "0.75rem" }}
                            onClick={() =>
                              this.handleDownload(
                                scientificWork && scientificWork[0].id,

                                scientificWork &&
                                  scientificWork[0].originalName,

                                scientificWork && scientificWork[0].contentType
                              )
                            }
                          >
                            {lang === "ru"
                              ? ru.reviewerRegister_9
                              : "Ilmiy ishlardan namuna"}
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

                      <Col md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.reviewerRegister_6 : "Daraja"}
                          </label>
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
                        <label>
                          {lang === "ru" ? ru.kategoriya : "Kategoriya"}
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
                      <Col md="12">
                        <label>{lang === "ru" ? ru.tillar : "Tillar"}</label>
                        <Multiselect
                          options={this.state.options} // Options to display in the dropdown
                          selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
                          onSelect={this.onSelect} // Function will trigger on select event
                          onRemove={this.onRemove} // Function will trigger on remove event
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
                          onClick={(e) => this.updateProfileByAdmin()}
                        >
                          {lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                        </Button>
                      </div>
                    </Row>
                    <Row>
                      <div className="update updatess">
                        <div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              defaultChecked={enabled && enabled}
                              onChange={(e) =>
                                this.handleChange(e.target.checked)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>

                        <div>
                          <Button
                            outline
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleDelete();
                            }}
                          >
                            {lang === "ru" ? ru.admin_delete : "Удалить"}
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
                          <Input placeholder="Boshlang'ich sana" type="date" />
                        </FormGroup>
                      </Form>
                    </div>

                    <div className="col-lg-4">
                      <Form>
                        <FormGroup>
                          <Label>Oxirgi sana</Label>
                          <Input placeholder="Oxirgi sana" type="date" />
                        </FormGroup>
                      </Form>
                    </div>

                    <div className="col-lg-4 mt-2">
                      <Label>Tasdiqlash</Label> <br />
                      <a href="">
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
                      <th>Sarlavha</th>
                      <th>Tekshirilgan Vaqti</th>
                      <th>Status</th>
                      <th>Xulosa</th>
                      <th>Fayl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkedArticles &&
                      checkedArticles.map((article) => (
                        <tr key={article.id}>
                          <td>
                            <Link to={`/admin/articleInfo/:${article.id}`}>
                              {article.title}
                            </Link>
                          </td>
                          <td>
                            {new Date(article.processDate).toLocaleDateString()}
                          </td>
                          <td>{article.status}</td>
                          <td>{article.description}</td>
                          <td>
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                this.handleDownload(
                                  article.fileId,
                                  article.originalName,
                                  article.contentType
                                );
                              }}
                            >
                              File
                            </a>
                          </td>
                        </tr>
                      ))}
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
