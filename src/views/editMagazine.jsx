import React, { Component } from "react";
import {
  getById,
  editMagazines,
  getParentCategories,
  ActionUnderArticlesFromMagazine,
} from "services/magazineService";
import { Link } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";

class EditMagazine extends Component {
  state = {
    title: "",
    deadline: "",
    printDay: 0,
    category: "",
    file: [],
    cover: [],
    certificateNumber: "",
    isbn: "",
    issn: "",
    coverImg: "",
    status: "",
    description: "",

    thisMagazineId: "",
    magazineInfo: [],
    articles: [],
    categories: [],
  };

  async componentDidMount() {
    const magazineId = this.props.location.pathname.split(":")[1]
      ? this.props.location.pathname.split(":")[1]
      : this.props.location.pathname.split(":")[0];

    await this.getParentCategories();

    await this.getMagazinesById(magazineId);
    this.setState({ thisMagazineId: magazineId });

    this.state.magazineInfo && this.getImage(this.state.magazineInfo.cover.id);
  }

  getParentCategories = async () => {
    try {
      await getParentCategories().then((res) =>
        this.setState({ categories: res.data })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (
        await axios.get(
          `http://192.168.100.27:8080/api/attachment/download/${id}`,
          { responseType: "blob" }
        )
      ).data;
    } catch (err) {
      return null;
    }

    return this.setState({ coverImg: URL.createObjectURL(imageBlob) });
  };

  getMagazinesById = async (id) => {
    try {
      await getById(id).then((res) => {
        this.setState({ magazineInfo: res.data.object.journals });
        this.setState({ deadline: res.data.object.deadline });
        this.setState({ articles: res.data.object.articles });
        this.setState({ category: res.data.object.journals.category.id });
      });
    } catch (error) {
      toast.error(error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editMagazines(this.state.thisMagazineId, this.state);
    } catch (error) {
      toast.error(error);
    }

    // console.log(this.state);
  };

  handleDownload = async () => {
    const { id, originalName, contentType } = this.state.magazineInfo.file
      ? this.state.magazineInfo.file
      : undefined;

    if (id && originalName && contentType) {
      try {
        await fetch(
          `http://192.168.100.27:8080/api/attachment/download/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": contentType,
            },
          }
        )
          .then((response) => response.blob())
          .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", originalName);

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

  handleChange = async (id, action) => {
    try {
      await ActionUnderArticlesFromMagazine(id, action).then((res) =>
        toast.success(res.data.message)
      );
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    let {
      title,
      certificateNumber,
      cover,
      description,
      isbn,
      issn,
      printedDate,
      journalsStatus,
      category,
    } = this.state.magazineInfo;

    const { articles } = this.state;

    // console.log(articles);

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <CardBody
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40rem",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    src={this.state.coverImg}
                    alt="cover"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Magazine</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            defaultValue={title}
                            placeholder="Title Magazine"
                            type="text"
                            onChange={(e) =>
                              this.setState({ title: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Deadline</label>
                          <Input
                            // disabled
                            defaultValue={
                              this.state.deadline && this.state.deadline
                            }
                            placeholder="Maqola qabul qilish oxirgi sanasi"
                            type="date"
                            onChange={(e) => {
                              this.setState({ deadline: e.target.value });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1 pr-1" md="3">
                        <FormGroup>
                          <label>Print Day</label>
                          <Input
                            defaultValue={printedDate}
                            type="number"
                            onChange={(e) =>
                              this.setState({ printDay: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>Status</label>
                          <Input
                            defaultValue={journalsStatus}
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                            onChange={(e) =>
                              this.setState({ status: e.target.value })
                            }
                          >
                            <option value=""></option>
                            <option value="PUBLISHED">Published</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>Pdf file of Magazine</label>
                          <Input
                            style={{ padding: "0" }}
                            // defaultValue={firstName}
                            placeholder="Final version of Magazine"
                            type="file"
                            onChange={(e) =>
                              this.setState({ file: e.target.files[0] })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1 pr-1" md="3">
                        <FormGroup>
                          <label>Certificate Number</label>
                          <Input
                            defaultValue={certificateNumber}
                            placeholder="ex: № FS77-54438"
                            type="text"
                            onChange={(e) =>
                              this.setState({
                                certificateNumber: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>ISBN</label>
                          <Input
                            defaultValue={isbn}
                            placeholder="ex: 2311-6099"
                            type="text"
                            onChange={(e) =>
                              this.setState({ isbn: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>ISSN</label>
                          <Input
                            defaultValue={issn}
                            placeholder="ex: 2311-6099"
                            type="text"
                            onChange={(e) =>
                              this.setState({ issn: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Download Magazine</label>
                          <Button
                            disabled={
                              this.state.magazineInfo.file ? false : true
                            }
                            className="m-0"
                            style={{ width: "100%", padding: "0.75rem" }}
                            onClick={() => this.handleDownload()}
                          >
                            Jurnalni yuklash
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Cover</label>
                          <Input
                            style={{ padding: "0" }}
                            type="file"
                            onChange={(e) =>
                              this.setState({
                                cover: e.target.files[0],
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Categories</label>
                          <Input
                            defaultValue={category && category.id}
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                            onChange={(e) =>
                              this.setState({ category: e.target.value })
                            }
                          >
                            {this.state.categories &&
                              this.state.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            style={{
                              overscrollBehaviorY: "none",
                              padding: "1rem",
                              height: "10rem",
                            }}
                            type="textarea"
                            // defaultValue={languages}
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          // type="button"
                          onClick={(e) => this.handleSubmit(e)}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card style={{ padding: "1rem" }}>
                <Table>
                  <thead>
                    <tr>
                      <th className="col-md-3 text-center">Title</th>
                      <th className="col-md-3 text-center">Status</th>
                      <th className="col-md-3 text-center">Public ?</th>
                      <th className="col-md-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles &&
                      articles.map((article) => (
                        <tr key={article.id}>
                          <td className="col-md-3 text-center">
                            <Link to={`/admin/articleInfo/:${article.id}`}>
                              {article.titleArticle}
                            </Link>
                          </td>
                          <td className="col-md-3 text-center">
                            {article.articleStatusName}
                          </td>
                          <td className="col-md-3 text-center">
                            {article.publicPrivate.toString()}
                          </td>
                          <td className="col-md-3 text-center">
                            <label className="switch">
                              <input
                                defaultChecked={article.journalsActive}
                                onChange={(e) =>
                                  this.handleChange(
                                    article.id,
                                    e.target.checked
                                  )
                                }
                                type="checkbox"
                              />
                              <span className="slider round"></span>
                            </label>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default EditMagazine;
