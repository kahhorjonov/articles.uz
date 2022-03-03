import React, { Component } from "react";
import { getCategories } from "services/getCategories";

import { Row, Col, Card, CardBody, Label, Input, CardHeader } from "reactstrap";

class JurnalQoshish extends Component {
  state = {
    categoryId: "",
    issn: "",
    isbn: "",
    deadline: "",
    certificateNumber: "",
    title: "",
    createdDate: "",
    file: [],
    cover: [],
    magazineNumber: "",

    categories: [],
  };

  async componentDidMount() {
    await this.populateCategories();
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h3>Jurnal Qo'shish</h3>
                </CardHeader>
                <CardBody>
                  <form>
                    <Row className="my-4">
                      <Col md="3" sm="3" lg="3">
                        <div>
                          <label>Title</label>
                          <input
                            placeholder="Article Title"
                            onChange={(e) =>
                              this.setState({ title: e.target.value })
                            }
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col md="3" sm="3" lg="3">
                        <div>
                          <label>Created Date</label>
                          <input
                            onChange={(e) =>
                              this.setState({ createdDate: e.target.value })
                            }
                            type="date"
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col md="3" sm="3" lg="3">
                        <div>
                          <label>File</label>
                          <input
                            onChange={(e) =>
                              this.setState({ file: e.target.files[0] })
                            }
                            type="file"
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col md="3" sm="3" lg="3">
                        <div>
                          <label>Jurnal muqovasi</label>
                          <input
                            onChange={(e) =>
                              this.setState({ cover: e.target.files[0] })
                            }
                            type="file"
                            className="form-control"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="my-4">
                      <Col sm="2" md="2" lg="2">
                        <div>
                          <label>Maqola qabul qilish oxirgi sanasi</label>
                          <input
                            onChange={(e) =>
                              this.setState({ deadline: e.target.value })
                            }
                            type="date"
                            className="form-control"
                            placeholder="deadline"
                          />
                        </div>
                      </Col>

                      <Col sm="1" md="1" lg="1">
                        <div>
                          <label>Jurnal soni</label>
                          <input
                            onChange={(e) =>
                              this.setState({ magazineNumber: e.target.value })
                            }
                            className="form-control"
                            placeholder="0"
                          />
                        </div>
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>Categories</Label>
                          <Input
                            onChange={(e) =>
                              this.setState({ categoryId: e.target.value })
                            }
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                          >
                            {this.state.categories &&
                              this.state.categories.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </Input>
                        </div>
                      </Col>

                      <Col sm="2" md="2" lg="2">
                        <div>
                          <Label>Sertifikat raqami</Label>
                          <input
                            placeholder="ex: № FS77-54438"
                            onChange={(e) =>
                              this.setState({
                                certificateNumber: e.target.value,
                              })
                            }
                            min={0}
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm="2" md="2" lg="2">
                        <div>
                          <Label>ISBN</Label>
                          <input
                            onChange={(e) =>
                              this.setState({ isbn: e.target.value })
                            }
                            min="0"
                            placeholder="ex: 2311-6099"
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm="2" md="2" lg="2">
                        <div>
                          <Label>ISSN</Label>
                          <input
                            onChange={(e) =>
                              this.setState({ issn: e.target.value })
                            }
                            min="0"
                            placeholder="ex: 2311-6099"
                            className="form-control"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="12" md="12" lg="12">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => this.handleSubmit(e)}
                        >
                          Create
                        </button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default JurnalQoshish;
