import React, { Component } from "react";
import {
  getParentCategories,
  getParentMagazines,
} from "services/getCategories";
import magazineService from "services/magazineService";
import { toast } from "react-toastify";

import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  CardHeader,
  FormGroup,
} from "reactstrap";
import axios from "axios";

class JurnalQoshish extends Component {
  state = {
    id: "",
    parentId: "",
    categoryId: "",
    issn: "",
    isbn: "",
    deadline: "",
    certificateNumber: "",
    title: "",
    createdDate: "",
    file: [],
    cover: [],
    status: "NEW_JOURNALS",
    magazineNumber: "",
    description: "",
    printedDate: "",
    releaseNumberOfThisYear: "",
    allReleasesNumber: "",
    parentCategoryId: "",

    categories: [],
    parentMagazines: [],
  };

  async componentDidMount() {
    await this.populateCategories();

    await this.populateMagazines();
    // console.log(this.state.categories);
  }

  handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await magazineService
        .createMagazine(this.state)
        .then((res) => toast.success(res.data.message));

      this.setState({ title: "" });
      this.setState({ createdDate: "" });
      this.setState({ file: "" });
      this.setState({ cover: "" });
      this.setState({ deadline: "" });
      this.setState({ categories: "" });
      this.setState({ certificateNumber: "" });
      this.setState({ issn: "" });
      this.setState({ isbn: "" });
      this.setState({ description: "" });
      this.setState({ status: "" });
      this.setState({ printedDate: "" });
      this.setState({ parentCategoryId: "" });
    } catch (error) {
      console.log(error);
    }
  };

  async populateCategories() {
    const { data: categories } = await getParentCategories();
    this.setState({ categories });
  }

  async populateMagazines() {
    const { data: parentMagazines } = await getParentMagazines();
    this.setState({ parentMagazines });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h3 className="mr-0">Jurnal Qo'shish</h3>
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
                            className="form-control p-0"
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
                            className="form-control p-0"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="my-4">
                      <Col sm="3" md="3" lg="3">
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

                      {/* <Col sm="1" md="1" lg="1">
                        <div>
                          <label>Jurnal soni</label>
                          <input
                            min={0}
                            type="number"
                            onChange={(e) =>
                              this.setState({ magazineNumber: e.target.value })
                            }
                            className="form-control"
                            placeholder="0"
                          />
                        </div>
                      </Col> */}

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>Categories</Label>
                          <Input
                            defaultValue={
                              this.state.categories[0] &&
                              this.state.categories[0].id
                            }
                            onChange={(e) =>
                              this.setState({ categoryId: e.target.value })
                            }
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                          >
                            <option value={null}></option>

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
                      <Col sm="5" md="5" lg="5">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            style={{
                              overscrollBehaviorY: "none",
                              padding: "1rem",
                              height: "10rem",
                            }}
                            type="textarea"
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="2" md="2" lg="2">
                        <label>Status</label>
                        <Input
                          defaultValue="NEW_JOURNALS"
                          style={{ height: "3rem" }}
                          className="form-control"
                          type="select"
                          onChange={(e) =>
                            this.setState({ status: e.target.value })
                          }
                        >
                          <option value="NEW_JOURNALS">New</option>
                          <option value="PUBLISHED">Published</option>
                        </Input>
                      </Col>
                      <Col sm="1" md="1" lg="1">
                        <label>Print Date</label>
                        <Input
                          min="0"
                          onChange={(e) =>
                            this.setState({ printedDate: e.target.value })
                          }
                          type="number"
                        />
                      </Col>

                      <Col sm="4" md="4" lg="4">
                        <label>Parent Category (optional)</label>
                        <Input
                          defaultValue=" "
                          style={{ height: "3rem" }}
                          className="form-control"
                          type="select"
                          onChange={(e) =>
                            this.setState({ parentCategoryId: e.target.value })
                          }
                        >
                          <option value=""></option>

                          {this.state.parentMagazines &&
                            this.state.parentMagazines.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.title}
                              </option>
                            ))}
                        </Input>
                      </Col>

                      {/* <Col sm="2" md="2" lg="2">
                        <label>Release Number Of This Year</label>
                        <Input
                          min="0"
                          onChange={(e) =>
                            this.setState({
                              releaseNumberOfThisYear: e.target.value,
                            })
                          }
                          type="number"
                        />
                      </Col> */}
                      {/* <Col sm="2" md="2" lg="2">
                        <label>All Releases Number</label>
                        <Input
                          onChange={(e) =>
                            this.setState({ allReleasesNumber: e.target.value })
                          }
                          type="number"
                        />
                      </Col> */}
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
