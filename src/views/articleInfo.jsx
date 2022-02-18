import React, { Component } from "react";
import axios from "axios";

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
    articleId: "",
    articleInfo: "",
  };

  async componentDidMount() {
    const articleId = this.props.history.location.pathname.slice(20);
    this.setState({ articleId: articleId });
    console.log(articleId);

    await axios
      .get(
        `http://192.168.100.27:8080/api/article/articleInfoForAdmin/${articleId}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ articleInfo: res.data });
      })
      .catch((ex) => console.log(ex));
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
                        <Input
                          className="mb-3"
                          style={{ height: "40px" }}
                          type="select"
                        >
                          <option>Default Select</option>
                          <option>Select</option>
                          <option>Default</option>
                        </Input>
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
                          <Input placeholder="Company" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Category</label>
                          <Input
                            bsSize="lg"
                            style={{ height: "40px" }}
                            className="mb-3 border-radius"
                            type="select"
                          >
                            <option>Large Select</option>
                            <option>Select</option>
                            <option>Large</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Price</label>
                          <Input placeholder="Price" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Authors</label>
                          <Input
                            defaultValue="Akbarjon"
                            placeholder="Maqola jo'natuvchisi Ismi"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>FirsName (Sender)</label>
                          <Input
                            defaultValue={article && article.user.firstName}
                            placeholder="FirsName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>LastName</label>
                          <Input
                            defaultValue={
                              article ? article.user.lastName : "null"
                            }
                            placeholder="LastName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            defaultValue="1212"
                            placeholder="Number"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            defaultValue="Melbourne@gmail.com"
                            placeholder="Email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="6">
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
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <div>
                          <Button color="info">Submit</Button>
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
