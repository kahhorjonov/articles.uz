import React, { Component } from "react";
import { toast } from "react-toastify";
import { downloadFile } from "services/mediaService";

import { getArticlesById } from "services/articleService";

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
} from "reactstrap";

import "styles/userEdit.css";

class ArticleEdit extends Component {
  state = {
    title: "",
    categoryId: "",
    price: "",
    authors: [],
    publicPrivate: "",
    description: "",
    sahifaSoni: "",
    bosmaJurnallarSoni: "",
    sertifikatlarSoni: "",
    doi: "",
    tags: [],

    file: [],
    articleId: "",
    articleInfo: "",
  };

  async componentDidMount() {
    const articleId = this.props.location.pathname.split(":")[1];
    // ? this.props.location.pathname.split(":")[1]
    // : this.props.location.pathname.split(":")[0];

    this.setState({ articleId: articleId });
    this.getArticleInformations(articleId);
  }

  getArticleInformations = async (id) => {
    try {
      await getArticlesById(id).then((res) => {
        this.setState({ articleInfo: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleDownload = async (fileId, fileName, type) => {
    if (fileId && fileName && type) {
      try {
        await downloadFile(fileId, {
          method: "GET",
          headers: {
            "Content-Type": type,
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);

            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
          });
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("file topilmadi");
    }
  };

  handleEdit = () => {
    console.log(this.state);
  };

  handleDelete = () => {
    console.log(this.state);
  };

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

  render() {
    const article = this.state.articleInfo;

    const {
      titleArticle,
      category,
      price,
      authors,
      file,
      publicPrivate,
      description,
    } = article;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12" sm="12" lg="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Articles</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            placeholder="Title Article"
                            type="text"
                            defaultValue={titleArticle}
                            onChange={(e) =>
                              this.setState({ title: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Category</label>
                          <Input
                            defaultValue={category && category.name}
                            style={{ fontSize: "1.4rem" }}
                            className="custom-select"
                            onChange={(e) =>
                              this.setState({ categoryId: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Price</label>
                          <Input
                            disabled
                            placeholder={price && `${price.price} so'm`}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>Authors</label>
                          <Input
                            disabled
                            placeholder={
                              authors &&
                              authors.map((author, idx2) => {
                                if (article.authors.length - 1 !== idx2) {
                                  return `${author.fullname}, `;
                                }
                                return `${author.fullname}`;
                              })
                            }
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Ilmiy Ishlarni yuklash</label>
                          <Button
                            className="m-0"
                            style={{
                              width: "100%",
                              padding: "0.75rem",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.handleDownload(
                                file && file.id,
                                file && file.originalName,
                                file && file.contentType
                              )
                            }
                          >
                            Ilmiy Ishlarni yuklash
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col md="3">
                        <FormGroup>
                          <label>For Everyone?</label>
                          <Input
                            defaultValue={publicPrivate}
                            style={{ fontSize: "1.4rem" }}
                            className="custom-select"
                            type="select"
                            onChange={(e) =>
                              this.setState({ publicPrivate: e.target.value })
                            }
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="12" md="12" lg="12">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            defaultValue={description}
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="3" md="3" lg="3">
                        <div>
                          <label>Sahifa soni</label>
                          <Input
                            className="form-control"
                            placeholder={price && price.sahifaSoni}
                            onChange={(e) =>
                              this.setState({ sahifaSoni: e.target.value })
                            }
                          />
                        </div>
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>Bosma jurnal soni</Label>
                        <Input
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder={price && price.bosmaJurnallarSoni}
                          onChange={(e) =>
                            this.setState({
                              bosmaJurnallarSoni: e.target.value,
                            })
                          }
                        />
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>Sertifikat soni</Label>
                        <input
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder={price && price.sertifikatlarSoni}
                          onChange={(e) =>
                            this.setState({ sertifikatlarSoni: e.target.value })
                          }
                        />
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>Doi</Label>
                          <Input
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                            placeholder={price && price.doi.toString()}
                            onChange={(e) =>
                              this.setState({ doi: e.target.value })
                            }
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </Input>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="8" md="8" lg="8">
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
                            onKeyUp={(e) =>
                              e.key === "ArrowUp"
                                ? this.addTags(e.target.value)
                                : null
                            }
                            placeholder="Press Up Arrow to add tags"
                          />
                        </div>
                      </Col>

                      <Col
                        sm="4"
                        md="4"
                        lg="4"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        <div>
                          <br />
                          <Button
                            style={{ margin: "0 1rem" }}
                            color="success"
                            onClick={this.handleEdit}
                          >
                            Edit
                          </Button>
                        </div>

                        <div>
                          <br />
                          <Button
                            style={{ margin: "0 1rem" }}
                            color="danger"
                            onClick={this.handleDelete}
                          >
                            Delete
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                  <br />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ArticleEdit;
