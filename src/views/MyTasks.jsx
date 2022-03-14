import React, { Component } from "react";
import {
  myDuties,
  myNewArticles,
  reviewerActionForArticle,
  sendWork,
} from "../services/articleService";

import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";
import { toast } from "react-toastify";

import "styles/mytasks.css";

class MyTasks extends Component {
  state = {
    status: "CHECK_AND_ACCEPT",
    file: null,
    articles: [],
    myArticles: [],
    description: "",
  };

  async componentDidMount() {
    await this.newMyArticles();
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
      await reviewerActionForArticle(action, id).then((res) =>
        toast.success(res.data.message)
      );
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
          });
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("file topilmadi");
    }
  };

  render() {
    return (
      <div className="content">
        <Row>
          <Col sm="12" md="12" lg="12">
            <Card>
              <CardHeader>
                <a className="nav-link text-muted disabled">
                  <h2 className="meningvaz">Mening vazifalarim</h2>
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
                          Yangi vazifalar
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
                          Tekshirishim kerak bo'lgan vazifalar
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link navvs"
                          href="#menu2"
                          data-toggle="pill"
                        >
                          Tekshirilgan Maqolalarim
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
                            <p className="p-2">Mening vazifalarim</p>
                          </div>
                          <div className="tebles">
                            <div className="row ml-0 mr-0">
                              <div className="col-lg-5 border-right col-sm-3 pr-0">
                                <p>Maqola nomi</p>
                              </div>
                              <div className="col-lg-3 border-right col-sm-3 pr-0">
                                <p>Yuborilgan sana</p>
                              </div>
                              <div className="col-lg-2 border-right col-sm-3 pr-0">
                                <p>Dedline</p>
                              </div>
                              <div className="col-lg-2 col-sm-3 pr-0">
                                <p>Qabul qilasizmi?</p>
                              </div>
                            </div>
                            <table className="table  teble-ramka">
                              <tbody>
                                {this.state.articles &&
                                  this.state.articles.map((article) => (
                                    <tr
                                      key={new Date().getTime()}
                                      className="tbs col-md-12"
                                      onSubmit={() => this.handleSubmit()}
                                    >
                                      <td className="col-md-5 pr-0">
                                        <a
                                          href=""
                                          style={{
                                            paddingLeft: "1.5rem",
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
                                          HA
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
                                          YO'Q
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
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
                                  <p>Maqola nomi</p>
                                </th>
                                <th className="col-lg-3 col-sm-3 ">
                                  <p>Maqolani Tekshirish vaqti</p>
                                </th>
                                <th className="col-lg-3 col-sm-3 ">
                                  <p>Xulosa</p>
                                </th>
                                <th className="col-lg-3 col-sm-3 ">
                                  <p>File</p>
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
                                        href=""
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
                                      {article.article.deadLine} kun qoldi
                                    </td>
                                    <td className="col-lg-3 col-sm-3 ">
                                      <form>
                                        <select
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
                                            Tasdiqlayman
                                          </option>
                                          <option value="CHECK_AND_CANCEL">
                                            Tasdiqlamayman
                                          </option>
                                          <option value="CHECK_AND_RECYCLE">
                                            Qayta ishlashga
                                          </option>
                                        </select>
                                      </form>
                                    </td>
                                    <td className="col-lg-3 col-sm-3  d-flex">
                                      <span>
                                        <input
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
                                        placeholder="Description field (optional)"
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
                                        Submit
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
                              <th className="col-lg-3">Article Name</th>
                              <th className="col-lg-3">File</th>
                              <th className="col-lg-3">Status 1</th>
                              <th className="col-lg-3">Status 2</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>John</td>
                              <td>
                                <a href="#" download="w3logo">
                                  file
                                </a>
                              </td>
                              <td>jo, nesciunt! </td>
                              <td>john@example.com</td>
                            </tr>
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

export default MyTasks;
