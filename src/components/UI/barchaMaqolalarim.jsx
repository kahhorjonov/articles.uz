import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllMyArticles } from "services/articleService";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import { toast } from "react-toastify";
import { Col, Input, Row, Label, Form, Table, CardBody } from "reactstrap";
import ru from "translations/ru";

import "styles/chopetilgan.css";

class BarchaMaqolalarim extends Component {
  state = {
    status: "all",
    articles: [],

    currentPage: 1,
    pageSize: 8,

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    this.getAllMyArticles(this.state.status);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getAllMyArticles = async (status) => {
    try {
      await getAllMyArticles(status).then((res) =>
        this.setState({ articles: res.data })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  handleDownload = async (id, originalName, contentType) => {
    if (id && originalName && contentType) {
      try {
        await fetch(
          `http://159.65.221.248:8081/api/attachment/download/${id}`,
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
    const { articles: allArticles, currentPage, pageSize, lang } = this.state;

    const articles = paginate(allArticles, currentPage, pageSize);

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3>
                    {lang === "ru" ? ru.allMyArticles : "Barcha maqolalarim"}
                  </h3>
                </div>
                <div className="card-body">
                  <Form>
                    <Col lg="5" className="w-100 pl-0 d-flex">
                      <Label>
                        <b style={{ fontSize: "17px" }}>
                          {lang === "ru" ? ru.select : "Tanlang"}:
                        </b>{" "}
                      </Label>
                      <Input
                        style={{ height: "unset" }}
                        defaultValue="all"
                        className="ml-4 form-control"
                        name="select"
                        type="select"
                        onChange={(e) => this.getAllMyArticles(e.target.value)}
                      >
                        <option value="all">
                          {lang === "ru"
                            ? ru.allMyArticles
                            : "Barcha maqolalarim"}
                        </option>

                        <option value="REJECTED">
                          {lang === "ru"
                            ? ru.maqolalar_rad_etilgan
                            : "Rad etilgan maqollarim"}
                        </option>

                        <option value="RECYCLE">
                          {lang === "ru"
                            ? ru.maqolalar_qayta_ishlash
                            : "Qayta ishlashdagi maqollarim"}
                        </option>

                        <option value="BEGIN_CHECK">
                          {lang === "ru"
                            ? ru.maqolalar_taqrizda
                            : "Tekshirish jarayonidagi maqolalarim"}
                        </option>

                        <option value="PUBLISHED">
                          {lang === "ru"
                            ? ru.user_published
                            : "Chop etilgan maqolalarim"}
                        </option>
                      </Input>
                    </Col>
                  </Form>

                  <Row>
                    <CardBody>
                      <Table>
                        <thead>
                          <tr className="col-md-12">
                            <th className="col-md-2">
                              {lang === "ru" ? ru.jurnal_title : "Sarlavha"}
                            </th>
                            <th className="col-lg-2">
                              {lang === "ru" ? ru.jurnal_status : "Sarlavha"}
                            </th>
                            <th className="col-lg-2">
                              {lang === "ru" ? ru.magazine : "Jurnal"}
                            </th>
                            <th className="col-lg-1">
                              {lang === "ru"
                                ? ru.originalFile
                                : "Muallif fayli"}
                            </th>
                            <th className="col-lg-1">
                              {lang === "ru"
                                ? ru.red_file
                                : "Tahrirlangan fayl"}
                            </th>
                            <th className="col-lg-1">
                              {lang === "ru"
                                ? ru.jurnal_sertifikat
                                : "Sertifikat"}
                            </th>
                            <th className="col-lg-2">
                              {lang === "ru" ? ru.authors : "Авторы"}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {articles &&
                            articles.map((article) => (
                              <tr key={article.id}>
                                <td>
                                  <Link to={`/user/articleEdit/:${article.id}`}>
                                    {article.titleArticle}
                                  </Link>
                                </td>
                                <td>{article.articleStatusName}</td>
                                <td>{article.journals[0].title}</td>
                                <td>
                                  <a
                                    href=""
                                    onClick={(e) => {
                                      e.preventDefault();

                                      this.handleDownload(
                                        article.file.id,
                                        article.file.originalName,
                                        article.file.contentType
                                      );
                                    }}
                                  >
                                    {article.file && article.file.originalName}
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href=""
                                    onClick={(e) => {
                                      e.preventDefault();

                                      this.handleDownload(
                                        article.file.id,
                                        article.file.originalName,
                                        article.file.contentType
                                      );
                                    }}
                                  >
                                    {article.publishedArticle &&
                                      article.publishedArticle.originalName}
                                  </a>
                                </td>
                                <td>№_FS7765461</td>
                                <td>
                                  {article.authors &&
                                    article.authors.map((author, idx2) => {
                                      if (article.authors.length - 1 !== idx2) {
                                        return `${author.fullname}, `;
                                      }
                                      return `${author.fullname}`;
                                    })}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Row>
                </div>
                <div className="card-footer">
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BarchaMaqolalarim;
