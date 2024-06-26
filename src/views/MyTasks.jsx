import React, { Component } from "react";
import {
  myDuties,
  myNewArticles,
  reviewerActionForArticle,
  sendWork,
  myCheckedArticles,
} from "services/articleService";
import { getCurrentUser } from "services/authService";

import { downloadFile } from "services/mediaService";

import { Card, CardBody, Row, Col, CardHeader, Table } from "reactstrap";
import { toast } from "react-toastify";
import ru from "translations/ru";

import "styles/mytasks.css";

class MyTasks extends Component {
  state = {
    status: "CHECK_AND_ACCEPT",
    file: null,
    articles: [],
    myArticles: [],
    description: "",

    myallArticles: [],
    user: "",

    lang: "",
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    const user = getCurrentUser().roles[0].id;

    await this.newMyArticles();

    this.handleGetMyCheckedArticles();
  }

  newMyArticles = async () => {
    try {
      await myNewArticles().then((res) => {
        this.setState({ articles: res.data });
      });
    } catch (ex) {
      toast.error(ex);
    }
  };

  handleGetMyCheckedArticles = async () => {
    try {
      await myCheckedArticles().then((res) =>
        this.setState({ myallArticles: res.data })
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  async getAcceptedArticles() {
    try {
      await myDuties().then((res) =>
        this.setState({ myArticles: res.data.object })
      );
    } catch (ex) {
      toast.error(ex);
    }
  }

  handleAction = async (action, id) => {
    try {
      await reviewerActionForArticle(action, id).then((res) => {
        toast.success(res.data.message);
        this.newMyArticles();
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleSubmit = async (id) => {
    try {
      const { status, file, description } = this.state;

      await sendWork(id, status, file, description).then((res) => {
        toast.success(res.data.message);
        this.getAcceptedArticles();
      });
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
      } catch (ex) {
        toast.error(ex.response.data.message);
      }
    } else {
      toast.error("file topilmadi");
    }
  };

  render() {
    const { myallArticles, lang } = this.state;

    return (
      <div className="content">
        <Row>
          <Col sm="12" md="12" lg="12">
            <Card>
              <CardHeader>
                <a className="nav-link text-muted disabled">
                  <h2 className="meningvaz">
                    {lang === "ru" ? ru.my_tasks : "Mening vazifalarim"}
                  </h2>
                </a>
              </CardHeader>
              <CardBody>
                <div className="justify-content-between row">
                  <div className="col-lg-3">
                    <ul className="nav nav-pills flex-column" role="tablist">
                      <li className="nav-item"></li>
                      <li className="nav-item">
                        <a
                          className="nav-link navvs active"
                          href="#home"
                          data-toggle="pill"
                          onClick={() => this.newMyArticles()}
                        >
                          {lang === "ru" ? ru.new_tasks : "Mening vazifalarim"}
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.getAcceptedArticles()}
                      >
                        <a
                          href="#menu1"
                          className="nav-link navvs"
                          data-toggle="pill"
                        >
                          {lang === "ru"
                            ? ru.toBeChecked
                            : "Tekshirishim kerak bo'lgan vazifalar"}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link navvs"
                          href="#menu2"
                          data-toggle="pill"
                          onClick={this.handleGetMyCheckedArticles}
                        >
                          {lang === "ru"
                            ? ru.checked
                            : "Tekshirilgan Maqolalarim"}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-9">
                    <div className="tab-content">
                      <div
                        className="tab-pane container tab-pane active"
                        id="home"
                      >
                        <div className="container-flud ml-0 mr-0 mt-4">
                          <div className="tr1">
                            <p className="p-2">
                              {lang === "ru"
                                ? ru.new_tasks
                                : "Mening vazifalarim"}
                            </p>
                          </div>
                          <div className="tebles">
                            <div className="row ml-0 mr-0">
                              <div className="col-lg-5 border-right col-sm-3 pr-0">
                                <p>
                                  {lang === "ru"
                                    ? ru.jurnal_title
                                    : "Maqola nomi"}
                                </p>
                              </div>
                              <div className="col-lg-3 border-right col-sm-3 pr-0">
                                <p>
                                  {lang === "ru"
                                    ? ru.sendDate
                                    : "Yuborilgan sana"}
                                </p>
                              </div>
                              <div className="col-lg-2 border-right col-sm-3 pr-0">
                                <p>Deadline</p>
                              </div>
                              <div className="col-lg-2 col-sm-3 pr-0">
                                <p>
                                  {lang === "ru"
                                    ? ru.recieve
                                    : "Qabul qilasizmi?"}
                                </p>
                              </div>
                            </div>

                            <Table className="table teble-ramka">
                              <tbody>
                                {this.state.articles
                                  ? this.state.articles.map((article) => (
                                      <tr
                                        key={article.article.id}
                                        className="tbs col-md-12"
                                        onSubmit={() => this.handleSubmit()}
                                      >
                                        <td className="col-md-5 pr-0">
                                          <a
                                            style={{
                                              paddingLeft: "1.5rem",
                                              cursor: "pointer",
                                              color: "#51cbce",
                                            }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              this.handleDownload(
                                                article.article.file.id,
                                                article.article.file
                                                  .originalName,
                                                article.article.file.contentType
                                              );
                                            }}
                                          >
                                            {article.article.titleArticle}
                                          </a>
                                        </td>
                                        <td className="col-md-3 pr-0">
                                          <p style={{ paddingLeft: "1.5rem" }}>
                                            {article.sendDate}
                                          </p>
                                        </td>
                                        <td className="col-md-2 pr-0">
                                          <p style={{ paddingLeft: "1.5rem" }}>
                                            {article.deadLine} kun
                                          </p>
                                        </td>
                                        <td className="col-md-2 pr-0">
                                          <button
                                            onClick={() =>
                                              this.handleAction(
                                                "I_ACCEPTED",
                                                article.article.id
                                              )
                                            }
                                            className="btn btn-success m-0 p-3"
                                          >
                                            {lang === "ru" ? "Да" : "HA"}
                                          </button>
                                          <button
                                            onClick={() =>
                                              this.handleAction(
                                                "I_DID_NOT_ACCEPT",
                                                article.article.id
                                              )
                                            }
                                            className="btn btn-danger m-0 p-3"
                                          >
                                            {lang === "ru" ? "Нет" : "Yo'q"}
                                          </button>
                                        </td>
                                      </tr>
                                    ))
                                  : null}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane container tab-pane fade"
                        id="menu1"
                      >
                        <div>
                          <table className="container p-0 mt-4">
                            <tbody className="tab-les">
                              <tr className="row row-tables1">
                                <th className="col-lg-3 col-sm-3 ">
                                  <p>
                                    {lang === "ru"
                                      ? ru.jurnal_title
                                      : "Maqola nomi"}
                                  </p>
                                </th>

                                <th className="col-lg-3 col-sm-3 ">
                                  <p>Deadline</p>
                                </th>

                                <th className="col-lg-3 col-sm-3 ">
                                  <p>{lang === "ru" ? ru.xulosa : " Xulosa"}</p>
                                </th>

                                <th className="col-lg-3 col-sm-3 ">
                                  <p>{lang === "ru" ? ru.file : "File"}</p>
                                </th>
                              </tr>
                            </tbody>
                          </table>

                          <table className="table table-striped table-bordered mb-0">
                            {this.state.myArticles &&
                              this.state.myArticles.map((article) => (
                                <tbody key={article.article.id}>
                                  <tr className="row row-tables ml-0 mr-0 pr-0 pl-0">
                                    <td className="col-lg-3 col-sm-3 ">
                                      <a
                                        style={{
                                          cursor: "pointer",
                                          color: "#51cbce",
                                        }}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          this.handleDownload(
                                            article.article.file.id,
                                            article.article.file.originalName,
                                            article.article.file.contentType
                                          );
                                        }}
                                      >
                                        {article.article.titleArticle}
                                      </a>
                                    </td>
                                    <td className="col-lg-3 col-sm-3  d-flex align-items-center justify-content-center">
                                      {article.deadLine}
                                    </td>
                                    <td className="col-lg-3 col-sm-3 ">
                                      <form>
                                        <select
                                          style={{
                                            height: "3rem",
                                            fontSize: "1.3rem",
                                          }}
                                          defaultValue="CHECK_AND_ACCEPT"
                                          onChange={(e) =>
                                            this.setState({
                                              status: e.target.value,
                                            })
                                          }
                                          name="status"
                                          className="custom-select"
                                        >
                                          <option value="CHECK_AND_ACCEPT">
                                            {lang === "ru"
                                              ? ru.accepted
                                              : "Tasdiqlayman"}
                                          </option>
                                          <option value="CHECK_AND_CANCEL">
                                            {lang === "ru"
                                              ? ru.not_accepted
                                              : "Tasdiqlamayman"}
                                          </option>
                                          <option value="CHECK_AND_RECYCLE">
                                            {lang === "ru"
                                              ? ru.admin_4
                                              : "Qayta ishlashga"}
                                          </option>
                                        </select>
                                      </form>
                                    </td>
                                    <td className="col-lg-3 col-sm-3  d-flex">
                                      <span>
                                        <input
                                          style={{ fontSize: "1.2rem" }}
                                          onChange={(e) => {
                                            this.setState({
                                              file: e.target.files[0],
                                            });
                                          }}
                                          type="file"
                                          className="form-control-file mx-0 w-100 form-control"
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr className="row row-tables mx-0">
                                    <td className="col-md-12 col-sm-12 col-lg-9 border-0">
                                      <input
                                        placeholder={
                                          lang === "ru"
                                            ? ru.description
                                            : "Izoh"
                                        }
                                        className="col-md-12 col-sm-12 col-lg-12 border-0"
                                        type="text"
                                        onChange={(e) =>
                                          this.setState({
                                            description: e.target.value,
                                          })
                                        }
                                      />
                                    </td>
                                    <td className="col-lg-3 p-2 border-top-0 border-bottom-0">
                                      <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        onClick={() =>
                                          this.handleSubmit(article.article.id)
                                        }
                                      >
                                        {lang === "ru"
                                          ? ru.restore_3
                                          : "Tasdiqlash"}
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                          </table>
                        </div>
                      </div>

                      <div id="menu2" className="container tab-pane fade">
                        <hr />
                        <table className="table table-striped">
                          <thead>
                            <tr className="col-lg-12">
                              <th className="col-lg-3">
                                {lang === "ru"
                                  ? ru.jurnal_title
                                  : "Maqola nomi"}
                              </th>
                              <th className="col-lg-3">
                                {lang === "ru" ? ru.file : "Fayl"}
                              </th>
                              {/* <th className="col-lg-3">File Name</th> */}
                              <th className="col-lg-3">
                                {lang === "ru" ? ru.jurnal_status : "Status"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {myallArticles &&
                              myallArticles.map((article) => (
                                <tr key={article.id}>
                                  <td>{article.printedJournalName}</td>
                                  <td>
                                    <a
                                      style={{
                                        cursor: "pointer",
                                        color: "#51cbce",
                                      }}
                                      onClick={() =>
                                        this.handleDownload(
                                          article.file && article.file.id,
                                          article.file.originalName,
                                          article.file.contentType
                                        )
                                      }
                                    >
                                      {article.file.originalName}
                                    </a>
                                  </td>
                                  <td>{article && article.status}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default React.memo(MyTasks);
