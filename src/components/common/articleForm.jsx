import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import articleService from "../../services/articleService";
import { getCategories } from "../../services/getCategories";

import { toast } from "react-toastify";
import { Card, CardBody, Input, Label, Row, Col } from "reactstrap";

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

    numberOfPages: "0",
    numberOfPrints: "0",
    numberOfPrintedMagazines: "0",
    numberOfLicences: "0",
    doi: false,
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

  async componentDidMount() {
    await this.populateCategories();
    // await this.populateArticles();
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

  getPrice = async () => {
    try {
      const data = {
        sahifaSoni: this.state.numberOfPages,
        JurnaldaChopEtishSoni: this.state.numberOfPrints,
        BosmaJurnalSoni: this.state.numberOfPrintedMagazines,
        SertifikatSoni: this.state.numberOfLicences,
        doi: this.state.doi,
      };

      const res = await articleService.getPrice(data);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  doSubmit = async () => {
    await articleService.addArticle(this.state.data);
    // console.log(this.state.data);
    // this.props.history.push("/article");
  };

  render() {
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
                      <div className="form-group">
                        <label>Sahifa soni</label>
                        <input
                          defaultValue={0}
                          className="form-control"
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ numberOfPages: e.target.value });
                            this.getPrice();
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="form-group">
                        <Label> Chop etiladigan jurnallar soni</Label>
                        <Input
                          defaultValue={0}
                          className="form-control h-100"
                          type="select"
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({
                              numberOfPrintedMagazines: e.target.value,
                            });
                            this.getPrice();
                          }}
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </div>
                    </Col>
                    <Col lg="2">
                      <Label>Bosma jurnal soni</Label>
                      <input
                        className="form-control"
                        onChange={(e) => {
                          e.preventDefault();
                          this.setState({ numberOfPrints: e.target.value });
                          this.getPrice();
                        }}
                      />
                    </Col>
                    <Col lg="3">
                      <Label>Sertifikat soni</Label>
                      <input
                        className="form-control"
                        onChange={(e) => {
                          e.preventDefault();
                          this.setState({ numberOfLicences: e.target.value });
                          this.getPrice();
                        }}
                      />
                    </Col>
                    <Col lg="2">
                      <div className="select">
                        <Label for="exampleEmail">Boolen</Label>
                        <Input
                          className="form-control"
                          type="select"
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ doi: e.target.value });
                            this.getPrice();
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
                      <div className="selectt">
                        <Label for="exampleEmail">Narxi</Label>
                        <Input
                          disabled
                          className="form-control h-100"
                          placeholder="1000 som"
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
