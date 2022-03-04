import React, { Component } from "react";

import cover from "routes/books.png";
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
  state = {};

  async componentDidMount() {}

  handleSubmit = async (e) => {};

  handleDownload = async () => {
    const { id, originalName, contentType } = this.state.currentUser
      .scientificWork.length
      ? this.state.currentUser.scientificWork[0]
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
                  <img src={cover} alt="cover" />
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
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            // defaultValue={workPlace}
                            placeholder="Title Magazine"
                            type="text"
                            onChange={(e) =>
                              this.setState({ workPlace: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Deadline</label>
                          <Input
                            // disabled
                            // defaultValue={new Date(createdAt ? createdAt : null)
                            //   .toISOString()
                            //   .slice(0, 10)}
                            placeholder="Maqola qabul qilish oxirgi sanasi"
                            type="date"
                            onChange={(e) =>
                              this.setState({ username: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Print Day</label>
                          <Input
                            // defaultValue={email}
                            placeholder={`ex: ${new Date().toISOString().slice()}`}
                            type="email"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            // defaultValue={firstName}
                            placeholder="Ismingiz"
                            type="text"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            // defaultValue={lastName}
                            placeholder="Familiyangiz"
                            type="text"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Ilmiy Ishlarni yuklash</label>
                          <Button
                            className="m-0"
                            style={{ width: "100%", padding: "0.75rem" }}
                            onClick={() => this.handleDownload()}
                          >
                            Ilmiy Ishlarni yuklash
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Daraja</label>
                          <Input
                            // defaultValue={academicDegree}
                            placeholder="Daraja"
                            type="text"
                            onChange={(e) =>
                              this.setState({
                                // academicDegree: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Work Experience (year)</label>
                          <Input
                            // defaultValue={workExperience}
                            placeholder="Ish tajribangiz"
                            min={0}
                            type="number"
                            onChange={(e) =>
                              this.setState({
                                // workExperience: e.target.value,
                              })
                            }
                          />
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
                              this.setState({ languages: e.target.value })
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
