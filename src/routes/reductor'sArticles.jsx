import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ArticleService from "../services/articleService";
import image from "../components/profile.png";
import Base from "./TimeLine/base";

import "../styles/navbar.css";

class ReductorsArticles extends Component {
  state = {
    activeArticleId: "",
    articles: [],
    people: [],
    role: 777,
    id: null,
    step: "null",
    activated: "",
  };

  handleGetArticles = (step) => {
    const token = localStorage.getItem("token");
    console.log(step);

    ArticleService.newMyArticles(token, step).then((res) => {
      this.setState({ articles: res.object });
    });
  };

  handleActive = async (id, e) => {
    const role = this.state.role;
    this.setState({ id: id });
    try {
      const people = await ArticleService.getRedactorsAndReviewers(id, role);
      //   console.log(people);
      this.setState({ people: people.object });
      // console.log(this.state);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.error("Redaktor va Reviewerlar yo'q");
      this.setState({ people: [] });
      //   this.setState({ activeArticleId: id });
    }
  };

  handleChange = async (e) => {
    // this.forceUpdate();
    await this.setState({ role: e.target.value });
    // console.log(this.state.role);
    await this.handleActive(this.state.id, e.target.value);
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

    const res = await ArticleService.confirmForUsers(
      target.checked,
      articleId,
      userId
    );

    this.handleActive(this.state.activeArticleId);
    // console.log(res);
    // console.log("boolean:", target.value);
    // console.log("userId:", userId);
    // console.log("articleId:", this.state.activeArticleId);
  };

  render() {
    const articles = this.state.articles;
    const people = this.state.people;

    return (
      <div className="d-flex justify-content-end">
        <div className="col-md-2 box2">
          <ul className="nav nav-pills flex-column" role="tablist">
            <li className="nav-item">
              <a className="nav-link text-muted disabled" href="#home">
                <h2>Maqolalar</h2>
              </a>
            </li>

            <li className="nav-item item">
              <a
                onClick={(e) => {
                  this.handleClick("START");
                  //   this.setState({ step: "START" });
                  //   this.render(this.setState({ step: "START" }));
                }}
                className="nav-link navv"
                data-toggle="pill"
              >
                Yangi qabul qilinganlar
              </a>
            </li>
            <li className="nav-item item">
              <a
                onClick={(e) => {
                  this.handleClick("PREPARING_FOR_PUBLICATION");
                  //   this.setState({ step: "PREPARING_FOR_PUBLICATION" });
                  //   console.log("tahrirda");
                }}
                to=""
                className="nav-link navv"
                data-toggle="pill"
              >
                Tahrirda
              </a>
            </li>
            <li className="nav-item item">
              <a
                to=""
                onClick={() => {
                  this.handleClick("BEGIN_CHECK");
                  //   this.setState({ step: "BEGIN_CHECK" });
                  //   console.log("taqrizda");
                }}
                className="nav-link navv"
                data-toggle="pill"
              >
                Taqrizda
              </a>
            </li>
            <li className="nav-item item">
              <a
                to=""
                onClick={() => {
                  this.handleClick("BEGIN_CHECK");
                  //   this.setState({ step: "BEGIN_CHECK" });
                  //   console.log("taqrizda");
                }}
                className="nav-link navv"
                data-toggle="pill"
              >
                Chop etishda
              </a>
            </li>
            <li className="nav-item item">
              <a
                to=""
                onClick={() => {
                  this.handleClick("BEGIN_CHECK");
                  //   this.setState({ step: "BEGIN_CHECK" });
                  //   console.log("taqrizda");
                }}
                className="nav-link navv"
                data-toggle="pill"
              >
                Chop etilganlar
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-2 box3 p-0">
          <div className="input-group  mb-3 mt-3">
            <div className="d-flex input h-100">
              <input
                type="text"
                className="form-control "
                placeholder="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Go
                </button>
              </div>
            </div>
          </div>
          <ul role="tablist" className="tablis p-0 nav-pills flex-column">
            {articles &&
              articles.map((article) => (
                <li
                  key={article.id}
                  onClick={() => {
                    this.handleActive(article.id, 3);
                    this.setState({ activeArticleId: article.id });
                    console.log(article);
                  }}
                  className="nav-item li"
                >
                  <a className="nav-link ArticName" data-toggle="pill">
                    {article.lastName}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <Base />
      </div>
    );
  }
}

export default ReductorsArticles;
