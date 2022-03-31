import React, { Component } from "react";
import { toast } from "react-toastify";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import articleService from "services/articleService";

import noUser from "assets/img/no-user-image.gif";
import GetImages from "utils/getImages";
import ru from "translations/ru";

import { BsSearch } from "react-icons/bs";

import "styles/navbar.css";

class Articles extends Component {
  state = {
    activeArticleId: "",
    deadline: "7",
    articles: [],
    people: [],
    role: "777",
    id: null,
    activated: "",

    categories: [],

    currentPage: 1,
    pageSize: 9,

    currentPage2: 1,
    pageSize2: 5,

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });
  }

  handleGetArticles = async (step) => {
    try {
      await articleService.newMyArticles(step).then((res) => {
        this.setState({ articles: res.data.object });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleActive = async (id) => {
    this.setState({ id: id });
    try {
      await articleService
        .getRedactorsAndReviewers(id, this.state.role)
        .then((res) => this.setState({ people: res.data.object }));
    } catch (ex) {
      toast.info("Redaktor va Reviewerlar yo'q");
      this.setState({ people: [] });
    }
  };

  handleChange = () => {
    this.handleActive(this.state.id, this.state.role);
  };

  handleClick = (step) => {
    this.setState({ people: [] });
    this.handleGetArticles(step);
  };

  handleSubmit = async (bool, userId) => {
    try {
      const articleId = this.state.activeArticleId;
      const deadline = this.state.deadline;

      await articleService
        .confirmForUsers(bool, articleId, userId, deadline)
        .then((res) => {
          toast.success(res.data.message);
          this.handleActive(this.state.activeArticleId);
        });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePageChange2 = (page) => {
    this.setState({ currentPage2: page });
  };

  render() {
    const {
      currentPage,
      pageSize,
      articles: allArticles,
      currentPage2,
      pageSize2,
      people: allPeople,
      lang,
    } = this.state;

    const articles = paginate(allArticles, currentPage, pageSize);
    const people = paginate(allPeople, currentPage2, pageSize2);

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3>{lang === "ru" ? ru.maqolalar : "Barcha maqolalar"}</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <div className="col-md-3 p-0 box2">
                      <ul className="nav nav-pills flex-column" role="tablist">
                        <li className="nav-item item">
                          <a
                            onClick={() => {
                              this.handleClick("START");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru"
                              ? ru.maqolalar_yangi
                              : "Yangi qabul qilinganlar"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("BEGIN_CHECK");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru" ? ru.maqolalar_taqrizda : "Taqrizda"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("PREPARING_FOR_PUBLICATION");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru" ? ru.maqolalar_tahrirda : "Tahrirda"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("PREPARED_FOR_PUBLICATION");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru"
                              ? ru.maqolalar_nashr_jarayonida
                              : "Chop etishda"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("RECYCLE");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru"
                              ? ru.maqolalar_qayta_ishlash
                              : "Qayta ishlashga berilganlar"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("ACTIVEFALSE");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru"
                              ? ru.maqolalar_no_faol
                              : " No Faollar"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("REJECTED");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru"
                              ? ru.maqolalar_rad_etilgan
                              : "Rad etilganlar"}
                          </a>
                        </li>

                        <li className="nav-item item">
                          <a
                            onClick={(e) => {
                              this.handleClick("PUBLISHED");
                            }}
                            className="nav-link navv"
                            data-toggle="pill"
                          >
                            {lang === "ru" ? ru.published : " Chop etilganlar"}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-3 box3 p-0">
                      <div className="input-group mb-3 mt-3">
                        <div className="d-flex input">
                          <input
                            type="text"
                            className="form-control heightImportant"
                            placeholder={lang === "ru" ? ru.search : "Search"}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary px-3 p-2 m-0"
                              type="submit"
                            >
                              <BsSearch />
                            </button>
                          </div>
                        </div>
                      </div>

                      <ul>
                        {articles &&
                          articles.map((article) => (
                            <li
                              key={article.id}
                              className={
                                this.state.activeArticleId === article.id
                                  ? "nav-item activeNav "
                                  : "nav-item d-flex justify-content-between"
                              }
                              onClick={() => {
                                this.handleActive(article.id);
                                this.setState({ activeArticleId: article.id });
                              }}
                            >
                              <a style={{ padding: "0.5rem" }}>
                                {article.titleArticle}
                              </a>

                              <Link
                                className={
                                  this.state.activeArticleId === article.id
                                    ? "nav-item activeNav"
                                    : "nav-item"
                                }
                                to={`/admin/articleInfo/:${article.id}`}
                              >
                                {lang === "ru" ? ru.batafsil : "Batafsil..."}
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <Pagination
                          itemsCount={
                            this.state.articles && this.state.articles.length
                          }
                          pageSize={pageSize}
                          currentPage={currentPage}
                          onPageChange={this.handlePageChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6 box4">
                      <div className="div">
                        <div className="bg">
                          <div className="input-group">
                            <Input
                              style={{ padding: "0.375rem 0.75rem" }}
                              placeholder={lang === "ru" ? ru.search : "Search"}
                              className="border"
                            />

                            <div className="input-group-append">
                              <Input
                                style={{ padding: "0.375rem 0.75rem" }}
                                type="select"
                                defaultValue="7"
                                name="cars"
                                className="form-control h-100 border"
                                onChange={(e) =>
                                  this.setState({ deadline: e.target.value })
                                }
                              >
                                <option value="7">Deadline</option>
                                <option value="1">
                                  1 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                                <option value="2">
                                  2 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                                <option value="3">
                                  3 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                                <option value="4">
                                  4 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                                <option value="5">
                                  5 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                                <option value="6">
                                  6 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                                <option value="7">
                                  7 {lang === "ru" ? ru.kun : "Kun"}
                                </option>
                              </Input>

                              <Input
                                type="select"
                                style={{ padding: "0.375rem 0.75rem" }}
                                className="form-control h-100 border-0"
                                defaultValue={777}
                                onChange={(e) => {
                                  this.handleChange(e.target.value);
                                  this.setState({ role: e.target.value });
                                }}
                              >
                                <option value={777}>Auto</option>
                                <option value={3}>
                                  {lang === "ru" ? ru.admin_rev : "Taqrizchi"}
                                </option>
                                <option value={2}>
                                  {lang === "ru" ? ru.admin_red : "Tahrirchi"}
                                </option>
                              </Input>

                              <div className="dropdown-menu">
                                <a className="dropdown-item">Redactor</a>
                                <a className="dropdown-item">Reviewer</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg2">
                          <ul className="list-group">
                            {people &&
                              people.map((person) => (
                                <li
                                  key={person.user.id}
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                  <div className="images d-flex align-items-center justify-content-center">
                                    <div
                                      style={{
                                        width: "4.5rem",
                                        height: "4.5rem",
                                      }}
                                    >
                                      {person.user.photos[0] ? (
                                        <GetImages
                                          url={
                                            person.user.photos[0] &&
                                            person.user.photos[0].id
                                          }
                                        />
                                      ) : (
                                        <img src={noUser} />
                                      )}
                                    </div>
                                    <div className="flex-column ">
                                      <p className="m-0 ">
                                        {person.user.firstName}
                                        {"  "}
                                        {person.user.lastName}
                                      </p>
                                      <p className="m-0 text-muted">
                                        {person.user.roles[0].roleName
                                          .slice(5)
                                          .toLowerCase()}
                                      </p>
                                    </div>
                                  </div>

                                  <span className="badge ">
                                    <label className="switch">
                                      <input
                                        checked={person.confirm}
                                        onChange={(e) => {
                                          this.handleSubmit(
                                            e.target.checked,
                                            person.user.id
                                          );
                                        }}
                                        type="checkbox"
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <Pagination
                          itemsCount={this.state.people.length}
                          pageSize={pageSize2}
                          currentPage={currentPage2}
                          onPageChange={this.handlePageChange2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Articles;
