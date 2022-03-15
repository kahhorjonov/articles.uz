import React, { Component } from "react";
import { toast } from "react-toastify";
import { downloadFile } from "services/mediaService";

import {
  getArticleInfoAdmin,
  articleInfo,
  changeActivityArticles,
} from "services/articleService";

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

import "styles/userEdit.css";

class ArticleEdit extends Component {
  state = {
    status: "CHECK_AND_ACCEPT",
    file: [],

    articleId: "",
    articleInfo: "",

    articleInfoAdmin: [],
    steps: [],
  };

  async componentDidMount() {
    const articleId = this.props.location.pathname.split(":")[1];
    // ? this.props.location.pathname.split(":")[1]
    // : this.props.location.pathname.split(":")[0];

    this.setState({ articleId: articleId });

    this.getArticleInfoAdmin(articleId);
    this.getArticleInformations(articleId);
  }

  getArticleInfoAdmin = async (id) => {
    try {
      await getArticleInfoAdmin(id).then((res) => {
        this.setState({ articleInfoAdmin: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getArticleInformations = async (id) => {
    try {
      await articleInfo(id).then((res) => {
        this.setState({ articleInfo: res.data.article });
        this.setState({ steps: res.data.articleAdminInfoList });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  changeActivityOfArticle = async (bool) => {
    try {
      await changeActivityArticles(this.state.articleId, bool).then((res) =>
        toast.success(res.data.message)
      );
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

  render() {
    const { articleInfoAdmin } = this.state;

    const article = this.state.articleInfo;
    const steps = this.state.steps;

    const {
      titleArticle,
      category,
      price,
      authors,
      file,
      publicPrivate,
      user,
      description,
    } = article;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12" sm="12" lg="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Maqola Ma'lumotlari</CardTitle>
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
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Price</label>
                          <Input
                            placeholder={price && `${price.price} so'm`}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>Authors</label>
                          <Input
                            placeholder={
                              article &&
                              article.authors.map((author, idx2) => {
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
                            placeholder="Avtorlar"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>FirstName (Sender)</label>
                          <Input
                            defaultValue={user && user.firstName}
                            placeholder="FirsName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>LastName</label>
                          <Input
                            defaultValue={user && user.lastName}
                            placeholder="LastName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            defaultValue={user && user.phoneNumber}
                            placeholder="Number"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="6" md="6" lg="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            defaultValue={user && user.email}
                            placeholder="Email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6" lg="6">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            defaultValue={description}
                            placeholder="Country"
                            type="text"
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
                        />
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <Label>Sertifikat soni</Label>
                        <input
                          min="0"
                          type={"number"}
                          className="form-control"
                          placeholder={price && price.sertifikatlarSoni}
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
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </Input>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>Narxi</Label>
                          <Input
                            className="form-control h-100 pr-0"
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

                    <Row>
                      <div className="update updatess">
                        <div>
                          <Button
                            color="info"
                            onClick={() => console.log("submitted")}
                          >
                            Edit
                          </Button>
                        </div>

                        <div>
                          <Button
                            color="danger"
                            outline
                            onClick={() => console.log("deleted")}
                          >
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
        </div>
      </>
    );
  }
}

export default ArticleEdit;
