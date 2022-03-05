import React, { Component } from "react";
import magazineService from "services/magazineService";
import axios from "axios";

// import cover from "routes/books.png";
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
} from "reactstrap";

class EditMagazine extends Component {
  state = {
    title: "",
    deadline: "",
    printDay: "",
    category: "",
    file: [],
    certificateNumber: "",
    isbn: "",
    issn: "",
    cover: "",
    status: "",
    description: "",

    thisMagazineId: "0c9be012-ae13-4dca-b076-6c351fc741f2",
    magazineInfo: [],
  };

  async componentDidMount() {
    const magazineId = "0c9be012-ae13-4dca-b076-6c351fc741f2";
    await this.getMagazinesById(magazineId);

    this.state.magazineInfo && this.getImage(this.state.magazineInfo.cover.id);
  }

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
    return this.setState({ cover: URL.createObjectURL(imageBlob) });
  };

  getMagazinesById = async (id) => {
    try {
      await magazineService.getById(id).then((res) => {
        this.setState({ magazineInfo: res.data.object.journals });
        this.setState({ deadline: res.data.object.deadline });
      });
    } catch (error) {
      toast.error(error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);
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
    } = this.state.magazineInfo;

    // console.log(this.state.magazineInfo.cover);
    // console.log(this.state);

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
                  }}
                >
                  <img src={this.state.cover} alt="cover" />
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
                            // defaultValue={new Date(deadline).toLocaleDateString(
                            //   "uz-UZ",
                            //   {
                            //     year: "numeric",
                            //     month: "2-digit",
                            //     day: "2-digit",
                            //   }
                            // )}
                            placeholder="Maqola qabul qilish oxirgi sanasi"
                            type="date"
                            onChange={(e) => {
                              console.log(e.target.value);
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
                            // defaultValue={academicDegree}
                            type="file"
                            onChange={(e) =>
                              this.setState({
                                cover: e.target.files[0],
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col className="pl-1" md="4">
                        <FormGroup>
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
                        </FormGroup>
                      </Col> */}
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
        </div>
      </>
    );
  }
}

export default EditMagazine;
