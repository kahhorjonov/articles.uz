import React, { Component } from "react";
import {
  getParentCategories,
  getParentMagazines,
} from "services/getCategories";
import magazineService from "services/magazineService";
import { toast } from "react-toastify";
import ru from "translations/ru";

import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  CardHeader,
  FormGroup,
} from "reactstrap";

class JurnalQoshish extends Component {
  state = {
    id: "",
    parentId: "",
    categoryId: "",
    issn: "",
    isbn: "",
    deadline: "",
    certificateNumber: "",
    title: "",
    createdDate: "",
    file: [],
    cover: [],
    status: "NEW_JOURNALS",
    magazineNumber: "",
    description: "",
    printedDate: "",
    releaseNumberOfThisYear: "",
    allReleasesNumber: "",
    parentCategoryId: "",

    categories: [],
    parentMagazines: [],
    errors: {},

    lang: "",
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    await this.populateCategories();

    await this.populateMagazines();
    // console.log(this.state.categories);
  }

  async populateCategories() {
    const { data: categories } = await getParentCategories();
    this.setState({ categories });
  }

  async populateMagazines() {
    const { data: parentMagazines } = await getParentMagazines();
    this.setState({ parentMagazines });
  }

  formValidation = () => {
    const {
      categoryId,
      issn,
      isbn,
      deadline,
      certificateNumber,
      title,
      cover,
      description,
      printedDate,
    } = this.state;

    let isValid = true;
    let errors = {};

    if (title.trim().length < 1) {
      errors.titleLength = "Title is not allowed to be empty";
      isValid = false;
    }
    if (deadline.trim().length < 1) {
      errors.deadline = "Deadline is not allowed to be empty";
      isValid = false;
    }
    if (categoryId.trim().length < 1) {
      errors.categories = "Category is not allowed to be empty";
      isValid = false;
    }
    if (description.trim().length < 1) {
      errors.description = "Description is not allowed to be empty";
      isValid = false;
    }
    if (certificateNumber.trim().length < 1) {
      errors.certificateNumber =
        "Certificate number is not allowed to be empty";
      isValid = false;
    }
    if (printedDate.trim().length < 1) {
      errors.printedDate = "Print Day is not allowed to be empty";
      isValid = false;
    }
    if (issn.trim().length < 1) {
      errors.issn = "issn is not allowed to be empty";
      isValid = false;
    }
    if (isbn.trim().length < 1) {
      errors.isbn = "isbn is not allowed to be empty";
      isValid = false;
    }
    if (cover.length === 0) {
      errors.cover = "Cover is not allowed to be empty";
      isValid = false;
    }

    // if (file.length < 1) {
    //   errors.file = "File is not allowed to be empty";
    //   isValid = false;
    // }

    this.setState({ errors: errors });
    return isValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { errors } = this.state;
    // const isValid = await ;

    if (this.formValidation()) {
      try {
        await magazineService.createMagazine(this.state).then((res) => {
          toast.success(res.data.message);
          this.setState({ title: "" });
          this.setState({ categoryId: "" });
          this.setState({ parentCategoryId: "" });
          this.setState({ deadline: "" });
          this.setState({ certificateNumber: "" });
          this.setState({ isbn: "" });
          this.setState({ issn: "" });
          this.setState({ description: "" });
          this.setState({ printedDate: "" });
          this.setState({ cover: [] });
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      return Object.keys(errors).map((key) => toast.error(errors[key]));
    }
  };

  render() {
    const {
      lang,
      title,
      categoryId,
      parentCategoryId,
      deadline,
      certificateNumber,
      isbn,
      issn,
      description,
      printedDate,
    } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h3 className="mr-0">
                    {lang === "ru" ? ru.jurnal_qoshish : "Jurnal Qo'shish"}
                  </h3>
                </CardHeader>
                <CardBody>
                  <form>
                    <Row className="my-4">
                      <Col md="4" sm="4" lg="4">
                        <div>
                          <label>
                            {lang === "ru" ? ru.jurnal_title : "Sarlavha"}
                          </label>
                          <input
                            value={title}
                            onChange={(e) =>
                              this.setState({ title: e.target.value })
                            }
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm="4" md="4" lg="4">
                        <Label>
                          {lang === "ru"
                            ? ru.admin_kategoriyalar
                            : "Kategoriyalar"}
                        </Label>
                        <Input
                          value={categoryId}
                          onChange={(e) =>
                            this.setState({ categoryId: e.target.value })
                          }
                          style={{ height: "3rem" }}
                          className="form-control"
                          type="select"
                        >
                          <option value={null}></option>

                          {this.state.categories &&
                            this.state.categories.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                        </Input>
                      </Col>

                      {/* <Col md="3" sm="3" lg="3">
                        <div>
                          <label>Ro'yxatdan o'tkazilgan sana</label>
                          <input
                            onChange={(e) =>
                              this.setState({ createdDate: e.target.value })
                            }
                            type="date"
                            className="form-control"
                          />
                        </div>
                      </Col> */}

                      <Col sm="4" md="4" lg="4">
                        <label>
                          {lang === "ru"
                            ? ru.nav_jurnallar
                            : "Jurnallar (yangi soni uchun)"}
                        </label>
                        <Input
                          value={parentCategoryId}
                          style={{ height: "3rem" }}
                          className="form-control"
                          type="select"
                          onChange={(e) =>
                            this.setState({ parentCategoryId: e.target.value })
                          }
                        >
                          <option value=""></option>

                          {this.state.parentMagazines &&
                            this.state.parentMagazines.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.title}
                              </option>
                            ))}
                        </Input>
                      </Col>

                      {/* <Col md="3" sm="3" lg="3">
                        <div>
                          <label>Jurnal fayli</label>
                          <input4                            onChange={(e) =>
                              this.setState({ file: e.target.files[0] })
                            }
                            type="file"
                            className="form-control p-0"
                          />
                        </div>
                      </Col> */}
                    </Row>

                    <Row className="my-4">
                      <Col sm="3" md="3" lg="3">
                        <div>
                          <label>
                            {lang === "ru"
                              ? ru.main_deadline
                              : "Maqola qabul qilish oxirgi sanasi"}
                          </label>
                          <input
                            value={deadline}
                            onChange={(e) =>
                              this.setState({ deadline: e.target.value })
                            }
                            type="date"
                            className="form-control"
                            placeholder="deadline"
                          />
                        </div>
                      </Col>

                      {/* <Col sm="1" md="1" lg="1">
                        <div>
                          <label>Jurnal soni</label>
                          <input
                            min={0}
                            type="number"
                            onChange={(e) =>
                              this.setState({ magazineNumber: e.target.value })
                            }
                            className="form-control"
                            placeholder="0"
                          />
                        </div>
                      </Col> */}

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>
                            {lang === "ru"
                              ? ru.jurnal_sertifikat
                              : "Sertifikat raqami"}
                          </Label>
                          <input
                            value={certificateNumber}
                            placeholder="ex: № FS77-54438"
                            onChange={(e) =>
                              this.setState({
                                certificateNumber: e.target.value,
                              })
                            }
                            min={0}
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>ISBN</Label>
                          <input
                            value={isbn}
                            onChange={(e) =>
                              this.setState({ isbn: e.target.value })
                            }
                            min="0"
                            placeholder="ex: 2311-6099"
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm="3" md="3" lg="3">
                        <div>
                          <Label>ISSN</Label>
                          <input
                            value={issn}
                            onChange={(e) =>
                              this.setState({ issn: e.target.value })
                            }
                            min="0"
                            placeholder="ex: 2311-6099"
                            className="form-control"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="7" md="7" lg="7">
                        <FormGroup>
                          <label>
                            {lang === "ru"
                              ? ru.jurnal_description
                              : "Jurnal haqida ma'lumot"}
                          </label>
                          <Input
                            value={description}
                            style={{
                              overscrollBehaviorY: "none",
                              padding: "1rem",
                              height: "10rem",
                            }}
                            type="textarea"
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>

                      {/* 
                      <Col sm="2" md="2" lg="2">
                        <label>Holati</label>
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
                      </Col> */}
                      <Col sm="5" md="5" lg="5">
                        <div>
                          <label>
                            {lang === "ru"
                              ? ru.jurnal_printDays
                              : "Tekshirish vaqti"}
                          </label>
                          <Input
                            value={printedDate}
                            min="0"
                            onChange={(e) =>
                              this.setState({ printedDate: e.target.value })
                            }
                            type="number"
                          />
                        </div>
                        {/* <Col md="3" sm="3" lg="3"> */}
                        <div>
                          <label>
                            {lang === "ru" ? ru.jurnal_cover : "Muqova"}
                          </label>
                          <input
                            onChange={(e) =>
                              this.setState({ cover: e.target.files[0] })
                            }
                            type="file"
                            className="form-control p-0"
                          />
                        </div>
                        {/* </Col> */}
                      </Col>

                      {/* <Col sm="2" md="2" lg="2">
                        <label>Release Number Of This Year</label>
                        <Input
                          min="0"
                          onChange={(e) =>
                            this.setState({
                              releaseNumberOfThisYear: e.target.value,
                            })
                          }
                          type="number"
                        />
                      </Col> */}
                      {/* <Col sm="2" md="2" lg="2">
                        <label>All Releases Number</label>
                        <Input
                          onChange={(e) =>
                            this.setState({ allReleasesNumber: e.target.value })
                          }
                          type="number"
                        />
                      </Col> */}
                    </Row>

                    <Row>
                      <Col sm="12" md="12" lg="12">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            this.handleSubmit(e);
                          }}
                        >
                          {lang === "ru" ? ru.admin_add : "Tasdiqlash"}
                        </button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default React.memo(JurnalQoshish);
