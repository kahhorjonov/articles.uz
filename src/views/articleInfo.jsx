import React, { Component } from "react";

import "../styles/userEdit.css";
// reactstrap components

// import mikeImg from "../assets/img/mike.jpg";
import damirBosnjak from "../assets/img/damir-bosnjak.jpg";

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

class ArticleInfo extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img src={damirBosnjak} alt="articlePhoto" />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {/* <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg").default}
                    /> */}
                      {/* <h5 className="title">Article Haqida To'liq malumot</h5> */}
                    </a>
                    <p className="description">Avtor</p>
                  </div>
                  <p className="description text-center">
                    Boshqa
                    <br />
                    Malumotlar <br />
                    qo'shilishi mumkin
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <Table>
                  <thead>
                    <tr className="col-md-12">
                      <th className="col-md-6">Admin Status</th>
                      <th className="col-md-6">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Osd</td>
                      <td>2020-12-23</td>
                    </tr>
                    <tr>
                      <td>Thornton</td>
                      <td>2020-8-23</td>
                    </tr>
                    <tr>
                      <td>the Bird</td>
                      <td>2020-12-3</td>
                    </tr>
                  </tbody>
                </Table>
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
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Title of Article</label>
                          <Input
                            defaultValue="Astranomiya asoslari"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Category</label>
                          <Input
                            defaultValue="Astranomiya"
                            placeholder="Username"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address (Sender)
                          </label>
                          <Input
                            placeholder="Email"
                            defaultValue={"akbarjon3028@gmail.com"}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name (Author)</label>
                          <Input
                            defaultValue="Akbarjon"
                            placeholder="Maqola jo'natuvchisi Ismi"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name (Author)</label>
                          <Input
                            defaultValue="Qoxorjonov"
                            placeholder="Maqola jo'natuvchisi"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Authors</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row> */}
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Maqola haqida izoh (optional)</label>
                          <Input
                            type="textarea"
                            defaultValue="OTM lar uchun qo'llanma"
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
