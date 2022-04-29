import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { addArticle, getPrice } from "services/articleService";
import { getChildCategories } from "services/getCategories";
import { getActiveMagazines } from "services/magazineService";
import { getUsersById } from "services/userService";
import { getPrices } from "services/priceService";
import { getAllActiveLanguages } from "services/languageService";
import { me } from "services/authService";
import ru from "translations/ru";

import { Card, CardBody, Input, Label, Row, Col, FormGroup } from "reactstrap";

import { toast } from "react-toastify";

import "styles/articleForm.css";
import "styles/multipleTags.css";

class ArticleForm extends Form {
  state = {
    data: {
      titleArticle: "",
      categoryId: "",
      file: [],
    },
    description: "",

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

    lang: "",
    langs: [],
    language: "",
  };

  schema = {
    titleArticle: Joi.string().required().label("Article Title"),
    categoryId: Joi.string().required().label("Category Id"),
    // description: Joi.string().required().min(0).max(200).label("Description"),
    file: Joi.required().label("File"),
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    await this.populateCategories();
    this.getArticlePrice();

    await this.populateLanguages();

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

  async populateLanguages() {
    try {
      await getAllActiveLanguages().then((res) => {
        this.setState({ langs: res.data });
        this.setState({ language: res.data[0].id });
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
    const { articlePrice, inputFields, lang, langs } = this.state;

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
                    <span style={{ fontSize: "4rem" }}>
                      {lang === "ru" ? ru.nav_yuklash : "Ariza berish"}
                    </span>
                  </Col>
                  <Col sm="6" md="6" lg="6">
                    {/* <label>Jurnalni tanlang</label> */}
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
                      <option value="">
                        {lang === "ru" ? ru.mag_option : "Jurnalni tanlang"}
                      </option>

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
                    <Col md="6" lg="6" sm="6">
                      {this.renderInput(
                        "titleArticle",
                        lang === "ru" ? ru.jurnal_title : "Sarlavha"
                      )}
                    </Col>

                    <Col md="6" lg="6" sm="6">
                      {this.renderSelect(
                        "categoryId",
                        lang === "ru" ? ru.kategoriya : "Kategoriya",
                        this.state.childCategories
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="3" md="3" lg="3">
                      <div>
                        <label>
                          {lang === "ru" ? ru.jurnal_public : "Ommaviyligi"}
                        </label>

                        <Input
                          defaultValue="false"
                          type="select"
                          style={{ height: "3rem" }}
                          className="form-control"
                          onChange={(e) =>
                            this.setState({ publicOrPrivate: e.target.value })
                          }
                        >
                          <option value="false">
                            {lang === "ru" ? "Нет" : "Yo'q"}
                          </option>
                          <option value="true">
                            {lang === "ru" ? "Да" : "Ha"}
                          </option>
                        </Input>
                      </div>
                    </Col>

                    <Col sm="3" md="3" lg="3">
                      <div>
                        <label>{lang === "ru" ? ru.tillar : "Tili"}</label>

                        <Input
                          defaultValue={langs.length && langs[0].id}
                          type="select"
                          style={{ height: "3rem" }}
                          className="form-control"
                          onChange={(e) =>
                            this.setState({ language: e.target.value })
                          }
                        >
                          {langs &&
                            langs.map((lang) => (
                              <option key={lang.id} value={lang.id}>
                                {lang.name}
                              </option>
                            ))}
                        </Input>
                      </div>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                      {this.renderFileInput(
                        "file",
                        lang === "ru" ? ru.file : "Fayl",
                        "file"
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="3" md="3" lg="3">
                      <div>
                        <label>
                          {lang === "ru" ? ru.sahifa_soni : "Sahifa soni"}
                        </label>
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
                      <Label>
                        {lang === "ru" ? ru.jurnal_soni : "Bosma jurnal soni"}
                      </Label>
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
                      <Label>
                        {lang === "ru" ? ru.sertificat_soni : "Sertifikat soni"}
                      </Label>
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
                          {lang === "ru" ? ru.pagePrice : "Saxifa narxi"}
                          <span className="pl-3 text-dark pl-2">
                            {sahifaNarxi} {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                        </h6>
                        <h6 className="pl-1">
                          {this.state.sahifaSoni} X {sahifaNarxi} =
                          <span className="text-darck pl-2">
                            {sahifaNarxi * this.state.sahifaSoni}{" "}
                            {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                        </h6>
                        <hr />

                        <h6 className="pl-1">
                          {lang === "ru"
                            ? ru.printPrice2
                            : "Bosma Jurnal Narxi"}
                          :
                          <span className="pl-3 text-darck pl-2">
                            {bittaBosmaJunalNarxi}{" "}
                            {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                          <p>
                            {this.state.bosmaJurnalSoni} x{" "}
                            {bittaBosmaJunalNarxi} ={" "}
                            {bittaBosmaJunalNarxi * this.state.bosmaJurnalSoni}{" "}
                            {lang === "ru" ? ru.sum : "so'm"}
                          </p>
                        </h6>
                        <hr />
                        <h6 className="pl-1">
                          {lang === "ru"
                            ? ru.sertificatePrice
                            : "Sertfikat narxi"}
                          :
                          <span className="pl-3 text-darck pl-2">
                            {bittaSertifikatNarxi}{" "}
                            {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                          <p>
                            {this.state.sertifikatSoni} x {bittaSertifikatNarxi}{" "}
                            = {bittaSertifikatNarxi * this.state.sertifikatSoni}{" "}
                            {lang === "ru" ? ru.sum : "so'm"}
                          </p>
                        </h6>
                        <hr />

                        <h6 className="pl-1">
                          {lang === "ru" ? ru.doiPrice : "Doi narxi"}:
                          <span className="pl-3 text-darck pl-2">
                            {doi} {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                          <p>
                            {this.state.doi == true ? doi : "0"}{" "}
                            {lang === "ru" ? ru.sum : "so'm"}
                          </p>
                        </h6>
                        <hr />

                        <h6 className="pl-1">
                          {lang === "ru" ? ru.printPrice : "Chop etish narxi"}:
                          <span className="pl-3 text-darck pl-2">
                            {chopEtishNarxi} {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                          <p>
                            {chopEtishNarxi} {lang === "ru" ? ru.sum : "so'm"}
                          </p>
                        </h6>
                        <hr />
                        <h6 className="pl-1">
                          {lang === "ru" ? ru.all : "Jami"} :{" "}
                          <span className="text-darck pl-2">
                            {price} {lang === "ru" ? ru.sum : "so'm"}
                          </span>
                        </h6>
                      </div>
                    </Col>

                    <Col sm="9" md="9" lg="9">
                      {/* {this.renderInput("description", "Izoh")} */}

                      <FormGroup>
                        <label>
                          {lang === "ru"
                            ? ru.description
                            : "Izoh ( jurnal haqidagi barcha ma'lumotlar )"}
                        </label>
                        <Input
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

                      <Label for="exampleEmail">
                        {lang === "ru" ? ru.authors : "Mualliflar"}
                      </Label>

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
                          placeholder={
                            lang === "ru"
                              ? ru.hint
                              : "Muallif qo'shish uchun yuqori strelkani bosing"
                          }
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
                      <div className="savee">
                        {this.renderButton(
                          lang === "ru" ? ru.restore_3 : "Tasdiqlash"
                        )}
                      </div>
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
