import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import ArticleService from "../../services/articleService";
import { getCategories } from "../../services/getCategories";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  ListGro,
  ListGroupItem,
  Badge,
  NavLink,
  Table,
} from "reactstrap";

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

  doSubmit = async () => {
    await ArticleService.addArticle(this.state.data);
    console.log(this.state.data);
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
                      <div className="selectt">
                        {this.renderSelect(
                          "categoryId",
                          "Categories",
                          this.state.categories
                        )}
                      </div>
                    </Col>
                    <Col lg="3">{this.renderInput("author", "Author")}</Col>
                    <Col lg="3">{this.renderInput("tags", "Tags")}</Col>
                    <Col lg="3">
                      {this.renderFileInput("file", "File", "file")}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="2">
                      <div className="selectt">
                        <Label for="exampleEmail">Sahifa soni</Label>
                        <Input className="form-control h-100" />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="selectt">
                        <Label for="exampleEmail">
                          Bitta jurnalda jop etish soni
                        </Label>
                        <Input className="form-control h-100" />
                      </div>
                    </Col>
                    <Col lg="2">
                      <div className="selectt">
                        <Label for="exampleEmails">
                          Bitta bosma jurnal soni
                        </Label>
                        <Input className="form-control h-100" />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="selectt">
                        <Label for="exampleEmail">bitta Sertifikat soni</Label>
                        <Input className="form-control h-100" />
                      </div>
                    </Col>
                    <Col lg="2">
                    <div className="selectt">
                    <Label for="exampleEmail">Boolen</Label>
                      <Input className="form-control h-100" type="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
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
