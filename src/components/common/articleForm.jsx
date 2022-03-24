import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { addArticle, getPrice } from "services/articleService";
import { getChildCategories } from "services/getCategories";
import { getActiveMagazines } from "services/magazineService";
import { getUsersById } from "services/userService";
import { getPrices } from "services/priceService";
import { me } from "services/authService";

import { Card, CardBody, Input, Label, Row, Col } from "reactstrap";

import { toast } from "react-toastify";

import "styles/articleForm.css";
import "styles/multipleTags.scss";

class ArticleForm extends Form {
  state = {
    data: {
      titleArticle: "",
      description: "",
      categoryId: "",
      file: [],
    },

    publicOrPrivate: "False",
    tags: [],

    errors: {},

    sahifaSoni: "0",
    jurnaldaChopEtishSoni: "0",
    bosmaJurnalSoni: "0",
    sertifikatSoni: "0",
    doi: true,

    price: 0,

    parentCategoryId: "",
    parentCategories: [],
    childCategories: [],
    inputFields: [{ ID: "" }],
    authors: [],

    articlePrice: [],
  };

  schema = {
    titleArticle: Joi.string().required().label("Article Title"),
    categoryId: Joi.string().required().label("Category Id"),
    description: Joi.string().required().min(0).max(200).label("Description"),
    file: Joi.required().label("File"),
  };

  async componentDidMount() {
    await this.populateCategories();
    this.getArticlePrice();

    await me().then((res) => {
      this.addTags(res.data.code.toString());
      this.setState({ authors: [res.data.code.toString()] });
    });
  }

  getArticlePrice = async () => {
    try {
      await getPrices().then((res) => {
        this.setState({ articlePrice: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  async populateCategories() {
    try {
      await getActiveMagazines().then((res) => {
        this.setState({ parentCategories: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  }

  removeTags = (indexToRemove) => {
    this.setState({
      tags: [...this.state.tags.filter((_, index) => index !== indexToRemove)],
    });
  };

  addTags = (value) => {
    if (value !== "") {
      this.handleSearchUsers(value);
    }
  };

  handleSearchUsers = async (value) => {
    try {
      await getUsersById(value).then((res) => {
        if (res.status === 200) {
          const codes = new Set([...this.state.authors, value]);
          this.setState({ authors: [...codes] });
          const authorsNew = new Set([...this.state.tags, res.data.message]);
          this.setState({ tags: [...authorsNew] });
        } else if (res.status === 201) {
          toast.error("Foydalanuvchi topilmadi");
        }
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getChildCategories = async (id) => {
    try {
      await getChildCategories(id).then((res) =>
        this.setState({ childCategories: res.data })
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getPriceFromPages = async (sahifaSoni) => {
    const data = {
      sahifaSoni: sahifaSoni,
      jurnaldaChopEtishSoni: this.state.jurnaldaChopEtishSoni,
      bosmaJurnalSoni: this.state.bosmaJurnalSoni,
      sertifikatSoni: this.state.sertifikatSoni,
      doi: this.state.doi,
    };

    await getPrice(data).then((res) => {
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

    await getPrice(data).then((res) => {
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

    await getPrice(data).then((res) => {
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

    await getPrice(data).then((res) => {
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

    await getPrice(data).then((res) => {
      this.setState({ price: res.data.object });
    });
  };

  doSubmit = async () => {
    try {
      await addArticle(this.state).then((res) => {
        toast.success(res.data.message);
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const { articlePrice } = this.state;
    const { inputFields } = this.state;

    const {
      bittaBosmaJunalNarxi,
      bittaSertifikatNarxi,
      chopEtishNarxi,
      doi,
      sahifaNarxi,
    } = articlePrice;

    const price = this.state.price && this.state.price;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col sm="6" md="6" lg="6">
                    <span style={{ fontSize: "4rem" }}>Article Form</span>
                  </Col>
                  <Col sm="6" md="6" lg="6">
                    <label>Jurnalni tanlang</label>
                    <Input
                      sm="6"
                      md="6"
                      lg="6"
                      type="select"
                      style={{ height: "3rem" }}
                      className="form-control"
                      onChange={(e) => {
                        {
                          this.setState({
                            parentCategoryId: e.target.value,
                          });
                          this.getChildCategories(e.target.value);
                        }
                      }}
                    >
                      <option value="">Jurnalni tanlang</option>

                      {this.state.parentCategories &&
                        this.state.parentCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </Row>

                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col lg="8">{this.renderInput("description", "Izoh")}</Col>

                    <Col lg="4">
                      {this.renderInput("titleArticle", "Sarlavha")}
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4" lg="4">
                      {this.renderSelect(
                        "categoryId",
                        "Kategoriya",
                        this.state.childCategories
                      )}
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      <div>
                        <label>Ommaviylik</label>
                        <Input
                          defaultValue="false"
                          type="select"
                          style={{ height: "3rem" }}
                          className="form-control"
                          onChange={(e) =>
                            this.setState({ publicOrPrivate: e.target.value })
                          }
                        >
                          <option value="false">False</option>
                          <option value="true">True</option>
                        </Input>
                      </div>
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      {this.renderFileInput("file", "Fayl", "file")}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3" md="3" lg="3">
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
                    <Col sm="3" md="3" lg="3">
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
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Input>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="3" md="3" lg="3">
                      <div className="hisoblash mt-5">
                        <h6 className="pl-1">
                          Sahifa narxi
                          <span className="pl-3 text-dark pl-2">
                            {sahifaNarxi} so'm
                          </span>
                        </h6>
                        <h6 className="pl-1">
                          {this.state.sahifaSoni} X {sahifaNarxi} =
                          <span className="text-darck pl-2">
                            {sahifaNarxi * this.state.sahifaSoni} so'm
                          </span>
                        </h6>
                        <hr />

                        <h6 className="pl-1">
                          Bosma Jurnal Narxi:
                          <span className="pl-3 text-darck pl-2">
                            {bittaBosmaJunalNarxi} so'm
                          </span>
                          <p>
                            {this.state.bosmaJurnalSoni} x{" "}
                            {bittaBosmaJunalNarxi} ={" "}
                            {bittaBosmaJunalNarxi * this.state.bosmaJurnalSoni}{" "}
                            so'm
                          </p>
                        </h6>
                        <hr />
                        <h6 className="pl-1">
                          Sertifikat narxi:
                          <span className="pl-3 text-darck pl-2">
                            {bittaSertifikatNarxi} so'm
                          </span>
                          <p>
                            {this.state.sertifikatSoni} x {bittaSertifikatNarxi}{" "}
                            = {bittaSertifikatNarxi * this.state.sertifikatSoni}{" "}
                            so'm
                          </p>
                        </h6>
                        <hr />

                        <h6 className="pl-1">
                          Doi narxi:
                          <span className="pl-3 text-darck pl-2">
                            {doi} so'm
                          </span>
                          <p>{this.state.doi == true ? doi : "0"} so'm</p>
                        </h6>
                        <hr />

                        <h6 className="pl-1">
                          Chop etish narxi:
                          <span className="pl-3 text-darck pl-2">
                            {chopEtishNarxi} so'm
                          </span>
                          <p>{chopEtishNarxi} so'm</p>
                        </h6>
                        <hr />
                        <h6 className="pl-1">
                          Jami :{" "}
                          <span className="text-darck pl-2">{price} so'm</span>
                        </h6>
                      </div>
                    </Col>

                    <Col sm="9" md="9" lg="9">
                      <Label for="exampleEmail">Avtorlar</Label>
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
                            e.key === "ArrowUp" && e.target.value.length === 6
                              ? this.addTags(e.target.value)
                              : null
                          }
                          placeholder="Press Up Arrow to add tags"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="savee">{this.renderButton("Save")}</div>
                    </Col>
                  </Row>
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
