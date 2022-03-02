import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import articleService from "../../services/articleService";
import { getCategories } from "../../services/getCategories";

import { Card, CardBody, Input, Label, Row, Col, Toast } from "reactstrap";

import { toast } from "react-toastify";

import "../../styles/articleForm.css";

class ArticleForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      titleArticle: "",
      description: "",
      author: "",
      tags: "",
      categoryId: "",
      file: [],
    },

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
    author: Joi.string().required().label("Authors"),
    tags: Joi.string().required().label("Tags"),
    file: Joi.required().label("File"),
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

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

    console.log(data);

    // await articleService.getPrice(data).then((res) => {
    //   this.setState({ price: res.data.object });
    // });
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
    await articleService.addArticle(this.state.data);
    // this.props.history.push("/article");
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
                    <Col lg="3">
                      {this.renderSelect(
                        "categoryId",
                        "Categories",
                        this.state.categories
                      )}
                    </Col>
                    <Col lg="3">{this.renderInput("author", "Author")}</Col>
                    <Col lg="3">{this.renderInput("tags", "Tags")}</Col>
                    <Col lg="3">
                      {this.renderFileInput("file", "File", "file")}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="2">
                      <div>
                        <label>Sahifa soni</label>
                        <input
                          className="form-control"
                          placeholder="0"
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ sahifaSoni: e.target.value });
                            this.getPriceFromPages(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div>
                        <Label> Chop etiladigan jurnallar soni</Label>
                        <input
                          min="0"
                          type={"number"}
                          className="form-control"
                          defaultValue={0}
                          onChange={(e) => {
                            this.setState({
                              jurnaldaChopEtishSoni: e.target.value,
                            });
                            this.getPriceNumberOfPrints(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg="2">
                      <Label>Bosma jurnal soni</Label>
                      <input
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
                    <Col lg="3">
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
                    <Col lg="2">
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
                    <Col lg="3">
                      <div>
                        <Label for="exampleEmail">Narxi</Label>
                        <Input
                          disabled
                          className="form-control h-100"
                          placeholder={`${price} so'm`}
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
