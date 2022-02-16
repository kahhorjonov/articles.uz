import React, { Component } from "react";
import ArticleService from "../services/articleService";

import "../styles/articleActivation.css";
import { toast } from "react-toastify";

class ArticleActivation extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    ArticleService.getNewAllArticles()
      .then((res) => {
        this.setState({ articles: res.object });
      })
      .catch((ex) => {
        toast.info("Server bilan aloqa yo'q");
      });
  };

  handleDownload = async (fileId, fileName, type) => {
    await fetch(
      `http://192.168.100.27:8080/api/attachment/download/${fileId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": type,
        },
      }
    )
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
      })
      .catch((ex) => {
        console.log(ex);
        // toast.error(ex.response.data.message);
      });
  };

  handleChange = (e, id) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // let articles = this.state.articles.filter((article) => id !== article.id);
    // console.log(articles);

    // this.setState({ articles });

    ArticleService.confirmArticle(token, e.target.checked, id)
      .then((res) => {
        // if (res.status === 200) {
        this.getArticles();
        toast.success("Maqola aktivlashtirildi");
        // }
      })
      .catch((ex) => {
        // console.log(ex);
        toast.error("Foydalanuvchiga biriktirishda xatolik yuz berdi");
      });
  };

  render() {
    const articles = this.state.articles;

    return (
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Artikllarni aktivlashtirish</div>
              <div className="card-body">
                {articles &&
                  articles.map((article) => (
                    <div key={article.id}>
                      <div className="row justify-content-between pt-3 align-content-center">
                        <div className="col-lg-3 col-md-6 col-sm-6 ">
                          <p>{article.titleArticle}</p>
                          <p className="text-muted">
                            {new Date(article.createdAt)
                              .toISOString()
                              .slice(0, 10)}
                          </p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 ">
                          <p className="text-muted">
                            {article.user && article.user.firstName}{" "}
                            {article.user && article.user.lastName}
                          </p>
                          <p className="text-muted">
                            {article.authors.map((author, idx) => {
                              if (article.authors.length - 1 !== idx) {
                                return `${author.fullName}`;
                              }
                              return `${author.fullName}`;
                            })}
                          </p>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6 ">
                          <h5 className="bg-success text-center w-75 ml-auto mr-auto text-white p-1">
                            {article.category.name}
                          </h5>
                          <div className="text-center">
                            <a
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                this.handleDownload(
                                  article.file.id,
                                  article.file.originalName,
                                  article.file.contentType
                                )
                              }
                            >
                              Download ⬇️
                            </a>
                            {/* <FontAwesomeIcon
                        icon={faFileAlt}
                        style={{ color: "#C0F6F7" }}
                      /> */}
                          </div>
                        </div>

                        <div className="col-lg-2 col-mmd6  col-sm-6 d-flex justify-content-lg-end ">
                          <label className="switch">
                            <input
                              onChange={(e) => this.handleChange(e, article.id)}
                              type="checkbox"
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleActivation;
