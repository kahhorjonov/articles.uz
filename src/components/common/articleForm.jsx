import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import articleService from "../../services/articleService";
import { getCategories } from "../../services/getCategories";

import { Card, CardBody, Input, Label, Row, Col, Toast } from "reactstrap";

import { toast } from "react-toastify";

import "../../styles/articleForm.css";
import "../../styles/multipleTags.scss";

class ArticleForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      titleArticle: "",
      description: "",
      categoryId: "",
      file: [],
      publicOrPrivate: "",
    },

    tags: [],

    categories: [],
    errors: {},

    sahifaSoni: "0",
    jurnaldaChopEtishSoni: "0",
    bosmaJurnalSoni: "0",
    sertifikatSoni: "0",
    doi: false,

    price: 0,
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    titleArticle: Joi.string().required().label("Article Title"),
    categoryId: Joi.string().required().label("Category Id"),
    description: Joi.string().required().min(0).max(200).label("Description"),
    file: Joi.required().label("File"),
    publicOrPrivate: Joi.required().label("publicOrPrivate"),
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  removeTags = (indexToRemove) => {
    this.setState({
      tags: [...this.state.tags.filter((_, index) => index !== indexToRemove)],
    });
  };

  addTags = (value) => {
    if (value !== "") {
      this.setState({ tags: [...this.state.tags, value] });
      value = "";
    }
  };

  // async populateArticles() {
  //   try {
  //     const articleId = this.props.match.params.id;
  //     if (articleId === "new") return;

  //     // const { data: article } = await getArticles(articleId);
  //     // this.setState({ data: this.mapToViewModel(article) });
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       this.props.history.replace("/not-found");
  //   }
  // }

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

  async componentDidMount() {
    await this.populateCategories();
  }

  // mapToViewModel(article) {
  //   return {
  //     id: article.id,
  //     title: article.title,
  //     categoryId: article.categoryId,
  //     numberInStock: movie.numberInStock,
  //     dailyRentalRate: movie.dailyRentalRate,
  //   };
  // }

  doSubmit = async () => {
    try {
      await articleService.addArticle(this.state).then((res) => {
        console.log(res);
        toast.success(res.data.message);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const price = this.state.price && this.state.price;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <h1>Article Form</h1>
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col lg="4">
                      {this.renderInput(
                        "firstName",
                        "First Name",
                        "text",
                        "form-control"
                      )}
                    </Col>
                    <Col lg="4">
                      {this.renderInput("lastName", "Last Name")}
                    </Col>
                    <Col lg="4">
                      {this.renderInput("titleArticle", "Title")}
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      {this.renderInput("description", "Description")}
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4" lg="4">
                      {this.renderSelect(
                        "categoryId",
                        "Categories",
                        this.state.categories
                      )}
                    </Col>
                    {/* <Col lg="3">{this.renderInput("author", "Author")}</Col> */}
                    <Col sm="4" md="4" lg="4">
                      <div>
                        <label>PublicOrPrivate</label>
                        <Input
                          type="select"
                          style={{ height: "3rem" }}
                          className="form-control"
                          onChange={(e) =>
                            this.setState({ publicOrPrivate: e.target.value })
                          }
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Input>
                      </div>
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      {this.renderFileInput("file", "File", "file")}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="2" md="2" lg="2">
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
                    <Col sm="3" md="3" lg="3">
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
                    </Col>
                    <Col sm="2" md="2" lg="2">
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
                    <Col sm="2" md="2" lg="2">
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
                          className="form-control h-100"
                          placeholder={`${price} so'm`}
                        />
                      </div>
                    </Col>
                    <Col sm="9" md="9" lg="9">
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
                    </Col>
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
