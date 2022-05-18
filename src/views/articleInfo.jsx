import React, { Component } from "react";
import { toast } from "react-toastify";
import { downloadFile } from "services/mediaService";

import {
  getArticleInfoAdmin,
  articleInfo,
  changeActivityArticles,
  editArticleByAdmin,
} from "services/articleService";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Table,
} from "reactstrap";
import ru from "translations/ru";

import "styles/userEdit.css";

class ArticleInfo extends Component {
  state = {
    status: "NULL",
    file: [],

    articleId: "",
    articleInfo: "",

    articleInfoAdmin: [],
    steps: [],

    lang: "",
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    const articleId = this.props.location.pathname.split(":")[1];
    // ? this.props.location.pathname.split(":")[1]
    // : this.props.location.pathname.split(":")[0];

    this.setState({ articleId: articleId });

    this.getArticleInfoAdmin(articleId);
    this.getArticleInformations(articleId);
  }

  getArticleInfoAdmin = async (id) => {
    try {
      await getArticleInfoAdmin(id).then((res) => {
        this.setState({ articleInfoAdmin: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getArticleInformations = async (id) => {
    try {
      await articleInfo(id).then((res) => {
        this.setState({ articleInfo: res.data.article });
        this.setState({ steps: res.data.articleAdminInfoList });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  changeActivityOfArticle = async (bool) => {
    try {
      await changeActivityArticles(this.state.articleId, bool).then((res) =>
        toast.success(res.data.message)
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleDownload = async (fileId, fileName, type) => {
    if (fileId && fileName && type) {
      try {
        await downloadFile(fileId, {
          method: "GET",
          headers: {
            "Content-Type": type,
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
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

  handleEdit = async () => {
    try {
      await editArticleByAdmin(this.state).then((res) => {
        toast.success(res.data.message);
        this.getArticleInfoAdmin(this.state.articleId);
        this.getArticleInformations(this.state.articleId);
      });
    } catch (ex) {
      toast.error("Server bilan aloqa yo'q");
    }
  };

  render() {
    const { articleInfoAdmin, lang } = this.state;

    const article = this.state.articleInfo;
    const steps = this.state.steps;

    const {
      titleArticle,
      category,
      price,
      authors,
      file,
      publicPrivate,
      user,
      description,
    } = article;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <h4
                        style={{
                          marginTop: "0",
                        }}
                      >
                        {lang === "ru"
                          ? ru.info_sms
                          : "Sms orqali xabar yuborish"}
                      </h4>
                      <Form>
                        <label>
                          {lang === "ru" ? ru.jurnal_status : "Status"}
                        </label>
                        <select
                          style={{ fontSize: "1.4rem" }}
                          defaultValue="Qayta ishlash uchun"
                          onChange={(e) =>
                            this.setState({
                              status: e.target.value,
                            })
                          }
                          name="status"
                          className="custom-select"
                        >
                          <option value="NULL"></option>
                          <option value="RECYCLE">
                            {lang === "ru"
                              ? ru.maqolalar_qayta_ishlash
                              : "Qayta ishlash uchun"}
                          </option>
                          <option value="REJECTED">
                            {lang === "ru"
                              ? ru.maqolalar_rad_etilgan
                              : "Rad etildi"}
                          </option>
                          <option value="PUBLISHED">
                            {lang === "ru"
                              ? ru.maqolalar_nashr_jarayonida
                              : "Nashr uchun"}
                          </option>
                        </select>
                      </Form>
                    </Col>

                    {/* <Col md="7">
                      <div className="form-group">
                        <label>File upload ⬆️ (optional)</label>
                        <Input
                          type="file"
                          className="form-control p-0"
                          onChange={(e) =>
                            this.setState({ file: e.target.files[0] })
                          }
                        />
                      </div>
                    </Col> */}
                  </Row>

                  <Row>
                    <Col md="12">
                      <Label>
                        {lang === "ru" ? ru.description : "Izoh bildirish"}
                      </Label>
                      <Input
                        style={{ height: "40px" }}
                        type="text"
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="12">
                      <Button
                        className="btn p-3"
                        onClick={() => this.handleEdit()}
                      >
                        {lang === "ru" ? ru.send : "Yuborish"}
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Table>
                    <thead>
                      <tr className="col-md-12">
                        <th className="col-md-6">
                          {lang === "ru" ? ru.admin_actions : "Amaliyotlar"}
                        </th>
                        <th className="col-md-6">
                          {lang === "ru" ? ru.data : "Sana"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td>{status}</td>
                        <td>{processDate}</td>
                      </tr> */}
                      {articleInfoAdmin[0] &&
                        articleInfoAdmin.map((step, idx) => (
                          <tr key={idx}>
                            <td>{step.status}</td>
                            <td>{step.processDate}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">
                    {lang === "ru" ? ru.info_article : " Maqola Ma'lumotlari"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.jurnal_title : "Sarlavha"}
                          </label>
                          <Input
                            disabled
                            type="text"
                            defaultValue={titleArticle}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.kategoriya : "Kategoriya"}
                          </label>
                          <Input
                            disabled
                            defaultValue={category && category.name}
                            style={{ fontSize: "1.4rem" }}
                            className="custom-select"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>{lang === "ru" ? ru.price : "Narxi"}</label>
                          <Input
                            disabled={true}
                            placeholder={price && `${price.price} so'm`}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.authors : "Mualliflar"}
                          </label>
                          <Input
                            disabled
                            placeholder={
                              authors &&
                              authors.map((author, idx2) => {
                                if (article.authors.length - 1 !== idx2) {
                                  return `${author.fullname}, `;
                                }
                                return `${author.fullname}`;
                              })
                            }
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.download : "Yuklash"}
                          </label>
                          <Button
                            className="m-0"
                            style={{
                              width: "100%",
                              padding: "0.75rem",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.handleDownload(
                                file && file.id,
                                file && file.originalName,
                                file && file.contentType
                              )
                            }
                          >
                            {lang === "ru" ? ru.download : "Yuklash"}
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.jurnal_public : "Ommaviyligi"}
                          </label>
                          <Input
                            disabled
                            defaultValue={publicPrivate}
                            placeholder="Avtorlar"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.author_name : "Yuboruvchi ismi"}
                          </label>
                          <Input
                            disabled
                            defaultValue={user && user.firstName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru"
                              ? ru.author_name
                              : "Yuboruvchi familiyasi"}
                          </label>
                          <Input
                            disabled
                            defaultValue={user && user.lastName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.login_tel : "Telefon"}
                          </label>
                          <Input
                            disabled
                            defaultValue={user && user.phoneNumber}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            disabled
                            defaultValue={user && user.email}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>
                            {lang === "ru" ? ru.description : "Izoh"}
                          </label>
                          <Input
                            style={{
                              overscrollBehaviorY: "none",
                              padding: "1rem",
                              height: "10rem",
                            }}
                            type="textarea"
                            defaultValue={description}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="3" md="3" lg="3">
                        <div>
                          <label>
                            {lang === "ru" ? ru.sahifa_soni : "Sahifa soni"}
                          </label>
                          <Input
                            disabled
                            className="form-control"
                            placeholder={price && price.sahifaSoni}
                          />
                        </div>
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>
                          {lang === "ru" ? ru.jurnal_soni : "Bosma jurnal soni"}
                        </Label>
                        <Input
                          disabled
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder={price && price.bosmaJurnallarSoni}
                        />
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>
                          {lang === "ru"
                            ? ru.sertificat_soni
                            : "Sertifikat soni"}
                        </Label>
                        <input
                          disabled
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder={price && price.sertifikatlarSoni}
                        />
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>Doi</Label>
                          <Input
                            disabled
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                            placeholder={price && price.doi.toString()}
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </Input>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <div className="update updatess">
                        <div>
                          <label className="switch">
                            <input
                              defaultChecked={user && article.active}
                              type="checkbox"
                              onClick={(e) =>
                                this.changeActivityOfArticle(e.target.checked)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        {/* <div>
                          <Button
                            color="info"
                            onClick={() => console.log("submitted")}
                          >
                            Submit
                          </Button>
                        </div> */}

                        {/* <div>
                          <Button
                            color="danger"
                            outline
                            onClick={() => console.log("deleted")}
                          >
                            Delete
                          </Button>
                        </div> */}
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle tag="h4">
                    {lang === "ru" ? ru.admin_actions : "Actions"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr className="col-md-12 col-sm-12">
                        <th className="col-md-1 col-sm-1">№</th>
                        <th className="col-md-3 col-sm-3">
                          {lang === "ru" ? ru.users : "Foydalanuvchi"}
                        </th>
                        <th className="col-md-3 col-sm-2">
                          {lang === "ru" ? ru.jurnal_status : "Holat"}
                        </th>
                        <th className="col-md-3 col-sm-3">
                          {lang === "ru" ? ru.description : "Izoh"}
                        </th>
                        <th className="col-md-2 col-sm-3">
                          {lang === "ru" ? ru.file : "Fayl"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {steps &&
                        steps.map((step, idx) => (
                          <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>
                              {step.fullName}
                              <br />
                              <span className="text-success">
                                {step.role.slice(5)}
                              </span>
                            </td>
                            <td>
                              {step.status}
                              <span>
                                <br />
                                <small className="text-succes">
                                  {step.processDate}
                                </small>
                              </span>
                            </td>
                            <td>{step.comment}</td>
                            <td>
                              {step.file && (
                                <a
                                  className="btn btn-success"
                                  onClick={() =>
                                    this.handleDownload(
                                      step.file && step.file.id,
                                      step.file && step.file.originalName,
                                      step.file && step.file.contentType
                                    )
                                  }
                                >
                                  Download File
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default React.memo(ArticleInfo);
