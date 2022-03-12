import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import articleService from "services/articleService";
import { getChildCategories } from "services/getCategories";
import magazineService from "services/magazineService";
import { getUsersById } from "services/userService";

import { Card, CardBody, Input, Label, Row, Col, Button } from "reactstrap";

import { toast } from "react-toastify";

import "styles/articleForm.css";
import "styles/multipleTags.scss";

class ArticleForm extends Form {
  state = {
    data: {
      // firstName: "",
      // lastName: "",
      titleArticle: "",
      description: "",
      categoryId: "",
      file: [],
    },

    publicOrPrivate: "False",
    tags: [],

    errors: {},

    sahifaSoni: "0",
    jurnaldaChopEtishSoni: "0",
    bosmaJurnalSoni: "0",
    sertifikatSoni: "0",
    doi: false,

    price: 0,

    parentCategoryId: "",
    parentCategories: [],
    childCategories: [],
    inputFields: [{ ID: "" }],
  };

  schema = {
    // firstName: Joi.string().required().label("First Name"),
    // lastName: Joi.string().required().label("Last Name"),
    titleArticle: Joi.string().required().label("Article Title"),
    categoryId: Joi.string().required().label("Category Id"),
    description: Joi.string().required().min(0).max(200).label("Description"),
    file: Joi.required().label("File"),
  };

  async componentDidMount() {
    await this.populateCategories();
  }

  async populateCategories() {
    try {
      await magazineService.getParentMagazines().then((res) => {
        this.setState({ parentCategories: res.data });
      });
    } catch (error) {
      toast.error(error);
    }
  }

  // removeTags = (indexToRemove) => {
  //   this.setState({
  //     tags: [...this.state.tags.filter((_, index) => index !== indexToRemove)],
  //   });
  // };

  // addTags = (value) => {
  //   if (value !== "") {
  //     this.setState({ tags: [...this.state.tags, value] });
  //     value = "";
  //   }
  // };

  getChildCategories = async (id) => {
    try {
      await getChildCategories(id).then((res) =>
        this.setState({ childCategories: res.data })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  getPriceFromPages = async (sahifaSoni) => {
    const data = {
      sahifaSoni: sahifaSoni,
      jurnaldaChopEtishSoni: this.state.jurnaldaChopEtishSoni,
      bosmaJurnalSoni: this.state.bosmaJurnalSoni,
      sertifikatSoni: this.state.sertifikatSoni,
      doi: this.state.doi,
    };

    await articleService.getPrice(data).then((res) => {
      this.setState({ price: res.data.object });
    });
  };

  getPriceNumberOfPrints = async (numberOfPrints) => {
    const data = {
      sahifaSoni: this.state.sahifaSoni,
      jurnaldaChopEtishSoni: numberOfPrints,
      bosmaJurnalSoni: this.state.bosmaJurnalSoni,
      sertifikatSoni: this.state.sertifikatSoni,
      doi: this.state.doi,
    };

    await articleService.getPrice(data).then((res) => {
      this.setState({ price: res.data.object });
    });
  };

  getPriceFromNumberOfPrintedMagazines = async (bosmaJurnalSoni) => {
    const data = {
      sahifaSoni: this.state.sahifaSoni,
      jurnaldaChopEtishSoni: this.state.jurnaldaChopEtishSoni,
      bosmaJurnalSoni: bosmaJurnalSoni,
      sertifikatSoni: this.state.sertifikatSoni,
      doi: this.state.doi,
    };

    await articleService.getPrice(data).then((res) => {
      this.setState({ price: res.data.object });
    });
  };

  getPriceFromNumberOfLicences = async (sertifikatSoni) => {
    const data = {
      sahifaSoni: this.state.sahifaSoni,
      jurnaldaChopEtishSoni: this.state.jurnaldaChopEtishSoni,
      bosmaJurnalSoni: this.state.bosmaJurnalSoni,
      sertifikatSoni: sertifikatSoni,
      doi: this.state.doi,
    };

    await articleService.getPrice(data).then((res) => {
      this.setState({ price: res.data.object });
    });
  };

  getPriceFromDoi = async (doi) => {
    const data = {
      sahifaSoni: this.state.sahifaSoni,
      jurnaldaChopEtishSoni: this.state.jurnaldaChopEtishSoni,
      bosmaJurnalSoni: this.state.bosmaJurnalSoni,
      sertifikatSoni: this.state.sertifikatSoni,
      doi: doi,
    };

    await articleService.getPrice(data).then((res) => {
      this.setState({ price: res.data.object });
    });
  };

  handleChangeInput = (id, event) => {
    const newInputFields = this.state.inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    this.setState({ inputFields: newInputFields });
  };

  handleAddFields = () => {
    this.setState({
      inputFields: [...this.state.inputFields, { firstName: "", lastName: "" }],
    });
  };

  handleRemoveFields = (id) => {
    const values = [...this.state.inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    this.setState({ inputFields: values });
  };

  handleSearchUsers = async (id, event) => {
    // this.setState({ inputFields: newInputFields });

    console.log(event.target.name);
    // try {
    //   await getUsersById(code).then((res) =>
    //     this.setState({ inputFields: [...this.state.IDs, res.data] })
    //   );
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  doSubmit = async () => {
    try {
      await articleService.addArticle(this.state).then((res) => {
        toast.success(res.data.message);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const { inputFields } = this.state;

    const price = this.state.price && this.state.price;

    console.log(this.state.IDs);

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col sm="6" md="6" lg="6">
                    <span style={{ fontSize: "4rem" }}>Article Form</span>
                  </Col>
                  <Col sm="6" md="6" lg="6">
                    <label>Jurnalni tanlang</label>
                    <Input
                      sm="6"
                      md="6"
                      lg="6"
                      type="select"
                      style={{ height: "3rem" }}
                      className="form-control"
                      onChange={(e) => {
                        {
                          this.setState({
                            parentCategoryId: e.target.value,
                          });
                          this.getChildCategories(e.target.value);
                        }
                      }}
                    >
                      <option value="">Jurnalni tanlang</option>

                      {this.state.parentCategories &&
                        this.state.parentCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </Row>

                <form onSubmit={this.handleSubmit}>
                  <Row>
                    {/* <Col lg="4">
                      {this.renderInput(
                        "firstName",
                        "First Name",
                        "text",
                        "form-control"
                      )}
                    </Col>
                    <Col lg="4">
                      {this.renderInput("lastName", "Last Name")}
                    </Col> */}
                  </Row>

                  <Row>
                    <Col lg="8">
                      {this.renderInput("description", "Description")}
                    </Col>

                    <Col lg="4">
                      {this.renderInput("titleArticle", "Title")}
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4" lg="4">
                      {this.renderSelect(
                        "categoryId",
                        "Categories",
                        this.state.childCategories
                      )}
                    </Col>
                    {/* <Col lg="3">{this.renderInput("author", "Author")}</Col> */}
                    <Col sm="4" md="4" lg="4">
                      <div>
                        <label>Public Or Private</label>
                        <Input
                          defaultValue="false"
                          type="select"
                          style={{ height: "3rem" }}
                          className="form-control"
                          onChange={(e) =>
                            this.setState({ publicOrPrivate: e.target.value })
                          }
                        >
                          <option value="false">False</option>
                          <option value="true">True</option>
                        </Input>
                      </div>
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      {this.renderFileInput("file", "File", "file")}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3" md="3" lg="3">
                      <div>
                        <label>Sahifa soni</label>
                        <Input
                          className="form-control"
                          placeholder="0"
                          onChange={(e) => {
                            this.setState({ sahifaSoni: e.target.value });
                            this.getPriceFromPages(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    {/* <Col sm="3" md="3" lg="3">
                      <div>
                        <Label> Chop etiladigan jurnallar soni</Label>
                        <Input
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder="0"
                          onChange={(e) => {
                            this.setState({
                              jurnaldaChopEtishSoni: e.target.value,
                            });
                            this.getPriceNumberOfPrints(e.target.value);
                          }}
                        />
                      </div>
                    </Col> */}
                    <Col sm="3" md="3" lg="3">
                      <Label>Bosma jurnal soni</Label>
                      <Input
                        min="0"
                        type={"number"}
                        className="form-control"
                        onChange={(e) => {
                          this.setState({ bosmaJurnalSoni: e.target.value });
                          this.getPriceFromNumberOfPrintedMagazines(
                            e.target.value
                          );
                        }}
                      />
                    </Col>
                    <Col sm="3" md="3" lg="3">
                      <Label>Sertifikat soni</Label>
                      <input
                        min="0"
                        type={"number"}
                        className="form-control"
                        onChange={(e) => {
                          this.setState({ sertifikatSoni: e.target.value });
                          this.getPriceFromNumberOfLicences(e.target.value);
                        }}
                      />
                    </Col>
                    <Col sm="3" md="3" lg="3">
                      <div>
                        <Label>Doi</Label>
                        <Input
                          style={{ height: "3rem" }}
                          className="form-control"
                          type="select"
                          onChange={(e) => {
                            this.setState({ doi: e.target.value });
                            this.getPriceFromDoi(e.target.value);
                          }}
                        >
                          <option>True</option>
                          <option>False</option>
                        </Input>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="3" md="3" lg="3">
                      <div>
                        <Label for="exampleEmail">Narxi</Label>
                        <Input
                          disabled
                          className="form-control h-100 pr-0"
                          placeholder={`${price} so'm`}
                        />
                      </div>
                      <div className="hisoblash mt-5">
                        <p>
                          <b>Sahifa soni</b>:{" "}
                          <span className="pl-3">
                            <b>{this.state.sahifaSoni.length && this.state.sahifaSoni} $</b>
                          </span>
                        </p>
                        <p>
                          <b>24x 1000: </b> <span>{this.state.sahifaSoni * 1000} so'm</span>
                        </p>

                        <p>
                          <b>Chop Etilgan: 1000 </b>:
                        </p>

                        <p>
                          <b>Total: 48000</b> :
                        </p>
                      </div>
                    </Col>

                    <Col md="9" className="pl-0">
                      {this.state.inputFields.map((inputField, idx) => (
                        <div
                          key={idx}
                          // className="col-sm-12 col-md-12 col-lg-12"
                        >
                          <Col
                            style={{ display: "inline-block" }}
                            sm="5"
                            md="5"
                            lg="5"
                            className="pl-0"
                          >
                            <Label>User ID</Label>
                            <Input
                              name="id"
                              className="form-control h-100"
                              onChange={(event) => {
                                if (event.target.value.length === 6) {
                                  this.handleSearchUsers(inputField.id, event);
                                }
                                this.handleChangeInput(inputField.id, event);
                              }}
                            />
                          </Col>
                          <Col
                            className="pl-0"
                            style={{ display: "inline-block" }}
                            sm="5"
                            md="5"
                            lg="5"
                          >
                            <Label>Full Name</Label>
                            <Input
                              disabled
                              name="fullName"
                              className="form-control h-100 "
                              // value={this.state.ID}
                              onChange={(event) =>
                                this.handleChangeInput(inputField.id, event)
                              }
                            />
                          </Col>

                          <Col
                            style={{ display: "inline-block" }}
                            sm="2"
                            md="2"
                            lg="2"
                            className="pr-0 pl-0"
                          >
                            <Button
                              style={{ padding: "0.6rem 1.5rem", margin: "0" }}
                              disabled={inputFields.length === 1}
                              onClick={() =>
                                this.handleRemoveFields(inputField.id)
                              }
                            >
                              -
                            </Button>

                            <Button
                              style={{ padding: "0.6rem 1.5rem", margin: "0" }}
                              onClick={this.handleAddFields}
                            >
                              +
                            </Button>
                          </Col>
                        </div>
                      ))}
                    </Col>

                    {/* <Col sm="9" md="9" lg="9">
                      <Label for="exampleEmail">Authors ID</Label>
                      <div className="tags-input ">
                        <ul id="tags">
                          {this.state.tags &&
                            this.state.tags.map((tag, index) => (
                              <li key={index} className="tag">
                                <span className="tag-title">{tag}</span>
                                <span
                                  className="tag-close-icon"
                                  onClick={() => this.removeTags(index)}
                                >
                                  x
                                </span>
                              </li>
                            ))}
                        </ul>
                        <input
                          className="col-sm-9 col-lg-9 col-md-9"
                          type="text"
                          onKeyUp={(e) =>
                            e.key === "ArrowUp"
                              ? this.addTags(e.target.value)
                              : null
                          }
                          placeholder="Press Up Arrow to add tags"
                        />
                      </div>
                    </Col> */}
                  </Row>

                  <div className="savee">{this.renderButton("Save")}</div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ArticleForm;
