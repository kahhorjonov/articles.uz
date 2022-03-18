import React, { Component } from "react";
import GetImages from "utils/getImages";
import { downloadMedia, downloadFile } from "services/mediaService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "services/authService";

import {
  getById,
  getYearById,
  getMagazinesByYear,
  getArticlesFromMagazine,
} from "services/magazineService";

import "styles/jurnalarxive.css";

class UserReleases extends Component {
  state = {
    magazineId: "",
    magazineInfo: [],

    years: [],
    magazines: [],
    cover: "",

    articles: [],

    user: "",
  };

  componentDidMount() {
    try {
      const user = getCurrentUser() && getCurrentUser().roles[0];
      this.setState({ user: user.id });

      const magazineId = this.props.location.pathname.split(":")[1]
        ? this.props.location.pathname.split(":")[1]
        : this.props.location.pathname.split(":")[0];

      this.splitMagazineId();

      this.getYearsById(magazineId);

      this.getArticlesFromMagazineById(magazineId);
    } catch (error) {
      toast.error("Bunday jurnal mavjud emas");
    }
  }

  splitMagazineId = () => {
    const magazineId = this.props.location.pathname.split(":")[1]
      ? this.props.location.pathname.split(":")[1]
      : this.props.location.pathname.split(":")[0];

    this.setState({
      magazineId,
    });

    this.getMagazineInfo(magazineId);
  };

  getArticlesFromMagazineById = async (id) => {
    try {
      await getArticlesFromMagazine(id).then((res) => {
        this.setState({ articles: res.data.articleInfoForJournal });
      });
    } catch (error) {
      toast.error(error);
    }
  };

  getMagazineInfo = async (id) => {
    try {
      await getById(id).then((res) => {
        this.setState({ magazineInfo: res.data.object.journals });
        this.setState({ cover: res.data.object.journals.cover });
        this.getImage(res.data.object.journals.cover.id);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  getYearsById = async (id) => {
    try {
      await getYearById(id).then((res) => {
        this.setState({ years: res.data });
        this.getMagazinesByYear(res.data[0], this.state.magazineId);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  getMagazinesByYear = async (year, id) => {
    try {
      this.setState({ magazines: [] });

      await getMagazinesByYear(year, id).then((res) =>
        this.setState({ magazines: res.data })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (await downloadMedia(id, { responseType: "blob" })).data;
    } catch (err) {
      return null;
    }

    return this.setState({ cover: URL.createObjectURL(imageBlob) });
  };

  handleDownload = async (id, originalName, contentType) => {
    if (id && originalName && contentType) {
      try {
        await downloadFile(id, {
          method: "GET",
          headers: {
            "Content-Type": contentType,
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", originalName);

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

  render() {
    const { magazineInfo, cover, years, magazines, articles } = this.state;

    const { allReleasesNumber, releaseNumberOfThisYear, file } = magazineInfo;

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3>Arxiv</h3>
                </div>
                <div className="card-body">
                  <div className="container jurnalArxive">
                    <div>
                      <a
                        style={{ color: "black", cursor: "pointer" }}
                        onClick={() => {
                          this.props.history.goBack();
                        }}
                      >
                        <b> ⬅️</b> ORTGA
                      </a>
                    </div>
                    <br />
                    <h1>
                      № {releaseNumberOfThisYear} ({allReleasesNumber}) son
                    </h1>

                    <div className="row px-0 mx-0 ui">
                      <div className="col-lg-4 pl-0">
                        <img src={cover} width="360px" alt="" />

                        <p
                          style={{ fontSize: "16px" }}
                          className="text-muted tex"
                        >
                          <b className="text-dark">Jurnal soni:</b> №{" "}
                          {releaseNumberOfThisYear} ({allReleasesNumber})
                        </p>
                        <p>
                          <span
                            style={{ fontSize: "16px" }}
                            className="text-muted"
                          >
                            <b className="text-dark">Nashr etilgan sana:</b>{" "}
                            13.09.2020
                          </span>
                        </p>
                        <button
                          type="submit"
                          className="btn btn-dark"
                          onClick={(e) => {
                            e.preventDefault();
                            this.handleDownload(
                              file.id && file.id,
                              file.id && file.originalName,
                              file.id && file.contentType
                            );
                          }}
                        >
                          Yuklab olish
                        </button>
                      </div>
                      <div className="col-lg-8 ui2">
                        <ul className="list-group list-group-flush">
                          <li style={{ listStyle: "none", fontSize: "16px" }}>
                            JURNAL TARKIBI
                          </li>

                          {articles &&
                            articles.map((article, idx) => (
                              <Link
                                key={article.articleId}
                                to=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.handleDownload(
                                    article.fileId,
                                    article.originalName,
                                    article.contentType
                                  );
                                }}
                              >
                                <li className="list-group-item">
                                  <span>{idx + 1}. </span>{" "}
                                  {article.titleArticle}
                                </li>
                              </Link>
                            ))}
                        </ul>
                      </div>

                      <div className="col-lg-12 ui3 px-0">
                        <div className="arxive px-0">
                          <h2>Jurnal arxivi</h2>

                          <ul className="nav nav-pills">
                            {years &&
                              years.map((year, idx) => (
                                <li key={idx} className="nav-item">
                                  <a
                                    className="nav-link active"
                                    data-toggle="pill"
                                    onClick={(e) => {
                                      e.preventDefault();

                                      this.getMagazinesByYear(
                                        year,
                                        this.state.magazineId
                                      );
                                    }}
                                  >
                                    {year}
                                  </a>
                                </li>
                              ))}
                          </ul>

                          <div className="tab-content">
                            <div className="tab-pane container active">
                              <div
                                style={{ minHeight: "50rem" }}
                                className="row"
                              >
                                {magazines &&
                                  magazines.map((magazine) => (
                                    <div key={magazine.id} className="col-lg-3">
                                      <GetImages url={magazine.cover.id} />

                                      <Link
                                        style={{
                                          fontSize: "2rem",
                                          margin: "1rem auto",
                                        }}
                                        className="text-dark"
                                        to={
                                          this.state.user === 4
                                            ? `/user/release/:${magazine.id}`
                                            : this.state.user === 3
                                            ? `/reviewer/release/:${magazine.id}`
                                            : "/"
                                        }
                                        onClick={() => {
                                          this.splitMagazineId();
                                        }}
                                      >
                                        № {magazine.releaseNumberOfThisYear} (
                                        {magazine.allReleaseNumber}){" "}
                                        <span className="text-muted">
                                          / {magazine.year}
                                        </span>
                                      </Link>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
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

export default UserReleases;