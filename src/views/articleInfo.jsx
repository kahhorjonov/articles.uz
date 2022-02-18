import React, { Component } from "react";
import axios from "axios";
import { getCategories } from "services/getCategories";

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
        this.setState({ articleInfo: res.data });
      })
      .catch((ex) => console.log(ex));
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

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
                      {steps &&
                        steps.map((step) => (
                          <tr key={step.admin.id}>
                            <td>{step.status}</td>
                            <td>{step.processDate}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Form>
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
                    <Col md="6" className="mt-3">
                      <a>
                        Download: <span>File</span>
                      </a>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Label>discription</Label>
                      <Input
                        placeholder="discription.."
                        style={{ height: "40px" }}
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

                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>Public</label>
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
                          <label>Message</label>
                          <Input
                            defaultValue="Hello watsap ?"
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
                              onClick={(e) => console.log(e.target.checked)}
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
                  <CardTitle tag="h4">Redactor</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr className="col-md-12">
                        <th className="col-md-1">№</th>
                        <th className="col-md-3">Biriktiruvchi revyu</th>
                        <th className="col-md-2">Status</th>
                        <th className="col-md-3">Izoh</th>
                        <th className="col-md-2">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        {/* <td>Axborot Xafsizligi</td> */}
                        <td>
                          <div
                            className="avatar w-100  d-flex m-0 mr-0"
                            style={{ overflow: "unset" }}
                          >
                            <div className="pl-3">
                              NDT <br />
                              <span className="text-success m-2">
                                <small>Reductor</small>
                              </span>
                              <br />
                              {/* <span>ilon Musk</span>
                            <p className="text-muted">roul</p> */}
                            </div>
                          </div>
                        </td>
                        <td>sds</td>
                        <td>Nashrga tayyor</td>
                        <td>
                          <a href="#">File:</a>
                        </td>
                      </tr>

                      <tr>
                        <th>2</th>
                        {/* <td>Axborot Xafsizligi</td> */}
                        <td>
                          <div
                            className="avatar w-100  d-flex m-0 mr-0"
                            style={{ overflow: "unset" }}
                          >
                            {/* <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/ayo-ogunseinde-2.jpg")
                                .default
                            }
                          /> */}
                            <div className="pl-3">
                              Jeff Bezos <br />
                              <span className="text-success m-2">
                                <small>Reviewer</small>
                              </span>
                              <br />
                              {/* <span>ilon Musk</span>
                            <p className="text-muted">roul</p> */}
                            </div>
                          </div>
                        </td>
                        <td>sds</td>
                        <td>Nashrga tayyor</td>
                        <td>
                          <a href="">File:</a>
                        </td>
                      </tr>
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
