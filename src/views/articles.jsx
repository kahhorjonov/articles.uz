import React, { Component } from "react";
import ArticleService from "../services/articleService";
import { toast } from "react-toastify";
import image from "../components/profile.png";

import "../styles/navbar.css";

class Articles extends Component {
  state = {
    activeArticleId: "",
    deadline: "",
    articles: [],
    people: [],
    role: 777,
    id: null,
    step: "null",
    activated: "",
    activeRow: null,
  };

  handleGetArticles = (step) => {
    const token = localStorage.getItem("token");
    // console.log(step);

    ArticleService.newMyArticles(token, step)
      .then((res) => {
        this.setState({ articles: res.object });
      })
      .catch((ex) => toast.error(ex.response.data.message));
  };

  handleActive = async (id) => {
    const role = this.state.role;
    this.setState({ id: id });
    try {
      const people = await ArticleService.getRedactorsAndReviewers(id, role);
      // console.log(people);
      this.setState({ people: people.object });
      // console.log(this.state);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.error("Redaktor va Reviewerlar yo'q");
      this.setState({ people: [] });
      //   this.setState({ activeArticleId: id });
    }
  };

  handleChange = (e) => {
    this.setState({ role: e.target.value });
    // console.log(this.state.role);
    this.handleActive(this.state.id, e.target.value);
  };

  handleClick = (step) => {
    // this.forceUpdate();
    // await this.setState({ step: step });
    this.setState({ people: [] });
    this.handleGetArticles(step);
  };

  handleSubmit = async ({ target }, userId) => {
    // let bool = null;

    // if (target.value === "on") {
    //   bool = true;
    // } else {
    //   bool = false;
    // }

    const articleId = this.state.activeArticleId;
    const deadline = this.state.deadline;

    await ArticleService.confirmForUsers(
      target.checked,
      articleId,
      userId,
      deadline
    )
      .then((res) => toast.success(res.data.message))
      .catch((ex) => console.log(ex));

    this.handleActive(this.state.activeArticleId);
    // console.log(res);
    // console.log("boolean:", target.value);
    // console.log("userId:", userId);
    // console.log("articleId:", this.state.activeArticleId);
  };

  render() {
    const articles = this.state.articles;
    const people = this.state.people;

    // console.log(articles);

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Barcha maqolalar</div>
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <div className="col-md-3 box2">
                      <ul className="nav-pills flex-column" role="tablist">
                        <li className="item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleClick("START");
                              this.setState({ activeRow: 1 });
                              //   this.setState({ step: "START" });
                              //   this.render(this.setState({ step: "START" }));
                            }}
                            className={
                              this.state.activeRow === 1
                                ? "nav-link navv active"
                                : "nav-link navv"
                            }
                            data-toggle="pill"
                          >
                            Yangi qabul qilinganlar
                          </a>
                        </li>
                        <li className="item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleClick("PREPARING_FOR_PUBLICATION");
                              this.setState({ activeRow: 2 });
                              //   this.setState({ step: "PREPARING_FOR_PUBLICATION" });
                              //   console.log("tahrirda");
                            }}
                            className={
                              this.state.activeRow === 2
                                ? "nav-link navv active"
                                : "nav-link navv"
                            }
                            data-toggle="pill"
                          >
                            Tahrirda
                          </a>
                        </li>
                        <li className="item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleClick("BEGIN_CHECK");
                              this.setState({ activeRow: 3 });
                              //   this.setState({ step: "BEGIN_CHECK" });
                              //   console.log("taqrizda");
                            }}
                            className={
                              this.state.activeRow === 3
                                ? "nav-link navv active"
                                : "nav-link navv"
                            }
                            data-toggle="pill"
                          >
                            Taqrizda
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
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary p-2 m-0"
                              type="submit"
                            >
                              Go
                            </button>
                          </div>
                        </div>
                      </div>

                      <ul
                      // role="tablist"
                      // className="tablis p-0 nav-pills flex-column"
                      >
                        {articles &&
                          articles.map((article) => (
                            <li
                              key={article.id}
                              className={
                                this.state.activeArticleId === article.id
                                  ? "nav-item activeNav"
                                  : "nav-item"
                              }
                              onClick={() => {
                                this.handleActive(article.id);
                                this.setState({ activeArticleId: article.id });
                                // console.log(article);
                              }}
                            >
                              <a>{article.titleArticle}</a>

                              <a>Batafsil...</a>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="col-md-6 box4">
                      <div className="div">
                        <div className="bg">
                          <div className="input-group">
                            <input
                              type="text"
                              placeholder="Search"
                              className="form-control border-0"
                              aria-label="Text input with dropdown button"
                            />

                            <div className="input-group-append">
                              <select
                                name="cars"
                                className="form-control h-100 border"
                                onChange={(e) =>
                                  this.setState({ deadline: e.target.value })
                                }
                              >
                                <option value={7}>Deadline</option>
                                <option value={1}>1 kun</option>
                                <option value={2}>2 kun</option>
                                <option value={3}>3 kun</option>
                                <option value={4}>4 kun</option>
                                <option value={5}>5 kun</option>
                                <option value={6}>6 kun</option>
                                <option value={7}>7 kun</option>
                              </select>

                              <select
                                className="form-select form-control h-100 border-0"
                                defaultValue={777}
                                onChange={(e) => {
                                  this.handleChange(e);
                                  this.setState({ role: e.target.value });
                                }}
                              >
                                <option value={777}>Auto</option>
                                <option value={3}>Reviewer</option>
                                <option value={2}>Reductor</option>
                              </select>
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
                                  <div className="images d-flex">
                                    <div>
                                      <img src={image} width="45" alt="" />
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
                                      <p className="m-0 text-muted">
                                        3 days ago
                                      </p>
                                    </div>
                                  </div>

                                  <span className="badge ">
                                    <label className="switch">
                                      <input
                                        checked={person.confirm}
                                        onChange={(e) =>
                                          this.handleSubmit(e, person.user.id)
                                        }
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
