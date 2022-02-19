import React, { Component } from "react";
import axios from "axios";
import { getCategories } from "services/getCategories";
import { toast } from "react-toastify";

import "../styles/userEdit.css";
// reactstrap components

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

class ArticleInfo extends Component {
  state = {
    titleArticle: "",

    articleId: "",
    articleInfo: "",
  };

  async componentDidMount() {
    const articleId = this.props.history.location.pathname.slice(20);
    this.setState({ articleId: articleId });

    await this.populateCategories();

    await axios
      .get(
        `http://192.168.100.27:8080/api/article/articleInfoForAdmin/${articleId}`
      )
      .then((res) => {
        console.log(res);
        this.setState({ articleInfo: res.data });
      })
      .catch((ex) => console.log(ex));
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  changeActivityOfArticle = async (bool) => {
    try {
      const token = localStorage.getItem("token");

      const bodyParametrs = {};

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios
        .post(
          `http://192.168.100.27:8080/api/articleStatus/changeActiveAndFalse/${this.state.articleId}/${bool}`,
          bodyParametrs,
          config
        )
        .then((res) => toast.success(res.data.message));
    } catch (ex) {
      toast.success(ex.data.message);
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
    const article = this.state.articleInfo.article;

    const steps = this.state.articleInfo.articleAdminInfoList;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card>
                <CardBody>
                  <Table>
                    <thead>
                      <tr className="col-md-12">
                        <th className="col-md-6">Steps</th>
                        <th className="col-md-6">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {steps &&
                        steps.map((step) => (
                          <tr key={step.admin.id}>
                            <td>{step.status}</td>
                            <td>{step.processDate}</td>
                          </tr>
                        ))} */}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Row>
                    <Col md="5">
                      <Form>
                        <label>Xulosa</label>
                        <select
                          style={{ fontSize: "1.4rem" }}
                          defaultValue="CHECK_AND_ACCEPT"
                          onChange={(e) =>
                            this.setState({
                              // status: e.target.value,
                            })
                          }
                          name="status"
                          className="custom-select"
                        >
                          <option value="CHECK_AND_ACCEPT">Tasdiqlayman</option>
                          <option value="CHECK_AND_CANCEL">
                            Tasdiqlamayman
                          </option>
                          <option value="CHECK_AND_RECYCLE">
                            Qayta ishlashga
                          </option>
                        </select>
                      </Form>
                    </Col>
                    <Col md="7">
                      <div className="form-group">
                        <label>File upload ⬆️</label>
                        <Input type="file" className="form-control p-0" />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Label>description</Label>
                      <Input
                        placeholder="description.."
                        // style={{ height: "40px" }}
                        type="text"
                      />
                    </Col>
                    <Col md="12">
                      <Button color="info" outline className="p-2">
                        success
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Article</CardTitle>
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
                            defaultValue={article && article.titleArticle}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Category</label>
                          <select
                            disabled
                            defaultValue={article && article.category.name}
                            style={{ fontSize: "1.4rem" }}
                            className="custom-select"
                            onChange={(e) => {
                              this.setState({
                                categoryIdForCreate: [e.target.value],
                              });
                              // this.handleChooseCategory(
                              //   e.target.value
                              // );
                            }}
                          >
                            {/* <option value="null">Kategoriya</option> */}
                            {this.state.categories &&
                              this.state.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                          </select>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Price</label>
                          <Input
                            disabled={true}
                            placeholder="Price"
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
                            defaultValue={
                              article &&
                              article.authors.map(
                                (author) => author.fullName + " "
                              )
                            }
                            placeholder="Avtorlar"
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
                                article.file && article.file.id,
                                article.file && article.file.originalName,
                                article.file && article.file.contentType
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
                            defaultValue={article && article.publicPrivate}
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
                            defaultValue={article && article.user.firstName}
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
                            defaultValue={article && article.user.lastName}
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
                            defaultValue={article && article.user.phoneNumber}
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
                            defaultValue={article && article.user.email}
                            placeholder="Email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            defaultValue={article && article.description}
                            placeholder="Country"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <div className="update updatess">
                        <div>
                          <label className="switch">
                            <input
                              defaultChecked={article && article.active}
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

                        <div>
                          <Button
                            color="danger"
                            outline
                            onClick={() => console.log("deleted")}
                          >
                            Delete
                          </Button>
                        </div>
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
