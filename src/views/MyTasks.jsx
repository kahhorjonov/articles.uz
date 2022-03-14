import React, { Component } from "react";
import articleService from "../services/articleService";
import { Card, CardBody, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

import "styles/mytasks.css";

class MyTasks extends Component {
  state = {
    status: "CHECK_AND_ACCEPT",
    file: null,
    articles: [],
    myArticles: [],
    isActive: true,
    description: "",
  };

  async componentDidMount() {
    await this.newMyArticles();
  }

  newMyArticles = async () => {
    try {
      await articleService.myNewArticles().then((res) => {
        this.setState({ articles: res.data });
      });
    } catch (ex) {
      toast.error(ex);
    }
  };

  async getAcceptedArticles() {
    try {
      await articleService
        .myDuties()
         
        .then((res) => this.setState({ myArticles: res.data.object }), );
    } catch (ex) {
      toast.error(ex);
    }
  }

  handleAction = async (action, id) => {
    try {
      await articleService
        .reviewerActionForArticle(action, id)
        .then((res) => toast.success(res.data.message));
    } catch (ex) {
      // console.log(ex);
      toast.error(ex.response.data.message);
    }
  };

  handleClick = async (text) => {
    const token = localStorage.getItem("token");

    if (text === "yangilari") {
      this.setState({ isActive: true });
      this.newMyArticles(token);
    } else {
      this.setState({ isActive: false });
      this.getAcceptedArticles(token);
    }
  };

  handleSubmit = async (id) => {
    try {
      const { status, file, description } = this.state;

      await articleService
        .sendWork(id, status, file, description)
        .then((res) => toast.success(res.data.message));
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    console.log(this.state.articles);
    console.log(this.state.myArticles);

    return (
      <div className="content">
        <Row>
          <Col sm="12" md="12" lg="12">
            <Card>
              <CardBody>
                <div className="justify-content-between row">
                  <div className="col-lg-3">
                    <ul className="nav nav-pills flex-column" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link text-muted disabled">
                          <h2 className="meningvaz">Mening vazifalarim</h2>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link navvs"
                          // onClick={(e) => {
                          //   this.handleClick("yangilari");
                          //   this.setState({ step: "START" });
                          //   this.render(this.setState({ step: "START" }));
                          // }}
                          href="#home"
                          data-toggle="pill"
                        >
                          Yangi vazifalar
                        </a>
                      </li>
                      <li className="nav-item ">
                        <a
                          // onClick={(e) => {
                          //   this.handleClick("menikilar");
                          //   this.setState({
                          //     step: "PREPARING_FOR_PUBLICATION",
                          //   });
                          // }}
                          href="#menu1"
                          className="nav-link navvs"
                          data-toggle="pill"
                        >
                          Tekshirishim kerak bo'lgan vazifalar
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#menu2"
                          data-toggle="pill"
                        >
                          Tekshirilgan Maqolalarim
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-9">
                    {/* {this.state.isActive ? ( */}
                    <div class="tab-content">
                      <div class="tab-pane container tab-pane fade" id="home">
                        <div className="container-flud ml-0 mr-0 mt-4">
                          <div className="tebles">
                            <div className="tr1">
                              <p className="p-2">Mening vazifalarim</p>
                            </div>
                            <div className="row ml-0 mr-0">
                              <div className="col-lg-5 col-sm-3 pr-0">
                                <p>Maqola nomi</p>
                              </div>
                              <div className="col-lg-3 col-sm-3 pr-0">
                                <p>Yuborilgan sana</p>
                              </div>
                              <div className="col-lg-2 col-sm-3 pr-0">
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
                                          style={{ paddingLeft: "1.5rem" }}
                                          className="linkk"
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
                                {/* <tr className="col-md-12">
                                <td>
                                  <p className="pl-5 text-muted">
                                    show 20-30 of 50 items
                                  </p>
                                </td>
                              </tr> */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* ) : ( */}

                      <div
                        className="tab-pane container tab-pane fade"
                        id="menu1"
                      >
                        <div>
                          <table className="container p-0 mt-4">
                            <tbody className="tab-les">
                              <tr className="row row-tables1">
                                <th className="col-lg-3 col-sm-3 ">
                                  {/* <td className="col-md-3"> */}
                                  <p>Maqola nomi</p>
                                  {/* </td> */}
                                </th>
                                <th className="col-lg-3 col-sm-3 ">
                                  {/* <td className="col-md-3"> */}
                                  <p>Maqolani Tekshirish vaqti</p>
                                  {/* </td> */}
                                </th>
                                <th className="col-lg-3 col-sm-3 ">
                                  {/* <td className="col-md-3"> */}
                                  <p>Xulosa</p>
                                  {/* </td> */}
                                </th>
                                <th className="col-lg-3 col-sm-3 ">
                                  {/* <td className="col-md-3"> */}
                                  <p>File</p>
                                  {/* </td> */}
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
                                        href={article.article.file}
                                        download={article.article.file}
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
                                          className="form-control-file form-control"
                                        />
                                      </span>
                                      <br />
                                      <span className="sp">
                                        <button
                                          style={{
                                            position: "absolute",
                                            top: "90px",
                                            left: "118px",
                                            fontSize: "13px",
                                            padding: "5px",
                                          }}
                                          type="submit"
                                          className="btn btn-primary my-md-3 mr-sm-5 my-sm-3"
                                          onClick={() =>
                                            this.handleSubmit(
                                              article.article.id
                                            )
                                          }
                                        >
                                          Submit
                                        </button>
                                      </span>
                                    </td>
                                  </tr>
                                  <tr className="row row-tables">
                                    <td className="col-md-12 col-sm-12 col-lg-12 border-0">
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
                                  </tr>
                                </tbody>
                              ))}
                          </table>
                        </div>
                      </div>

                      <div id="menu2" class="container tab-pane fade">
                        <h3>Menu 2</h3>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam.
                        </p>
                      </div>

                      {/* )} */}
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
