import React, { Component } from "react";
import { toast } from "react-toastify";
import { downloadFile } from "services/mediaService";

import {
  getArticleInfoAdmin,
  articleInfo,
  changeActivityArticles,
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

import "styles/userEdit.css";

class ArticleInfo extends Component {
  state = {
    status: "CHECK_AND_ACCEPT",
    file: [],

    articleId: "",
    articleInfo: "",

    articleInfoAdmin: [],
    steps: [],
  };

  async componentDidMount() {
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
    const { articleInfoAdmin } = this.state;

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
                        Sms orqali xabar yuborish
                      </h4>
                      <Form>
                        <label>Xulosa</label>
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
                          <option value="RECYCLE">Qayta ishlash uchun</option>
                          <option value="REJECTED">Rad etildi</option>
                          <option value="PUBLISHED">Nashr uchun</option>
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
                      <Label>description</Label>
                      <Input
                        placeholder="description..."
                        style={{ height: "40px" }}
                        type="text"
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="12">
                      <Button
                        // color="info"
                        // outline
                        className="btn p-3"
                        onClick={() => this.handleEdit()}
                      >
                        Send
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
                        <th className="col-md-6">Steps</th>
                        <th className="col-md-6">Date</th>
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
                  <CardTitle tag="h5">Maqola Ma'lumotlari</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            disabled
                            placeholder="Title Article"
                            type="text"
                            defaultValue={titleArticle}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Category</label>
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
                          <label>Price</label>
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
                          <label>Authors</label>
                          <Input
                            disabled
                            placeholder={
                              article &&
                              article.authors.map((author, idx2) => {
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
                          <label>Ilmiy Ishlarni yuklash</label>
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
                            Ilmiy Ishlarni yuklash
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>For Everyone?</label>
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
                          <label>FirstName (Sender)</label>
                          <Input
                            disabled
                            defaultValue={user && user.firstName}
                            placeholder="FirsName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>LastName</label>
                          <Input
                            disabled
                            defaultValue={user && user.lastName}
                            placeholder="LastName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            disabled
                            defaultValue={user && user.phoneNumber}
                            placeholder="Number"
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
                            placeholder="Email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            defaultValue={description}
                            placeholder="Country"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="3" md="3" lg="3">
                        <div>
                          <label>Sahifa soni</label>
                          <Input
                            disabled
                            className="form-control"
                            placeholder={price && price.sahifaSoni}
                          />
                        </div>
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>Bosma jurnal soni</Label>
                        <Input
                          disabled
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder={price && price.bosmaJurnallarSoni}
                        />
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>Sertifikat soni</Label>
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
                  <CardTitle tag="h4">Actions</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr className="col-md-12 col-sm-12">
                        <th className="col-md-1 col-sm-1">№</th>
                        <th className="col-md-3 col-sm-3">Person</th>
                        <th className="col-md-3 col-sm-2">Status</th>
                        <th className="col-md-3 col-sm-3">Izoh</th>
                        <th className="col-md-2 col-sm-3">File</th>
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

export default ArticleInfo;
