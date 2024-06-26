import React, { Component } from "react";
import ArticleService from "../services/articleService";
import { toast } from "react-toastify";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import ru from "translations/ru";

import "styles/articleActivation.css";

class ArticleActivation extends Component {
  state = {
    articles: [],
    currentPage: 1,
    pageSize: 7,

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    this.getArticles();
  }

  getArticles = () => {
    try {
      ArticleService.getNewAllArticles().then((res) => {
        this.setState({ articles: res.data.object });
      });
    } catch (error) {
      toast.error(error);
    }
  };

  handleDownload = async (fileId, fileName, type) => {
    if (fileId && fileName && type) {
      try {
        await fetch(
          `http://159.65.221.248:8081/api/attachment/download/${fileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": type,
            },
          }
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          });
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("file topilmadi");
    }
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage, pageSize, articles: allArticles, lang } = this.state;

    const articles = paginate(allArticles, currentPage, pageSize);

    return (
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>
                  {lang === "ru"
                    ? ru.jurnal_aktivlashtirish
                    : "Maqolalarni aktivlashtirish"}
                </h3>
              </div>
              <div className="card-body">
                {articles.map((article) => (
                  <div key={article.id}>
                    <div className="row justify-content-between pt-3 align-content-center">
                      <div className="col-lg-3 col-md-6 col-sm-6 ">
                        <p>{article.titleArticle}</p>
                        <p className="text-muted">
                          {new Date(article.createdAt).toLocaleDateString()}
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
                                article.file && article.file.id,
                                article.file && article.file.originalName,
                                article.file && article.file.contentType
                              )
                            }
                          >
                            {lang === "ru" ? ru.download : "Yuklab olish"} ⬇️
                          </a>
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
                <div className="d-flex justify-content-end mr-4">
                  <Pagination
                    itemsCount={this.state.articles.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default React.memo(ArticleActivation);
