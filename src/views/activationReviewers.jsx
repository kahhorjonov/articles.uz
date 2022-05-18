import React, { Component } from "react";

import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import { toast } from "react-toastify";
import { downloadFile } from "services/mediaService";
import { getNewRegisteredUsers, acceptReviewers } from "services/userService";
import ru from "translations/ru";

import "styles/articleActivation.css";

class ReviewerActivation extends Component {
  state = {
    users: [],

    currentPage: 1,
    pageSize: 7,

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    this.getUsers();
  }

  getUsers = async () => {
    try {
      await getNewRegisteredUsers().then((res) => {
        this.setState({ users: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleDownload = async (fileId, fileName, type) => {
    if (fileId && fileName && type) {
      try {
        await downloadFile(fileId, {
          method: "GET",
          headers: {
            "Content-Type": type,
          },
        })
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

  handleChange = (id) => {
    try {
      acceptReviewers(id).then(() => {
        toast.success("Foydalanuvchi aktivlashtirildi");
        this.getUsers();
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage, pageSize, users: allUsers, lang } = this.state;

    const users = paginate(allUsers, currentPage, pageSize);

    return (
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>
                  {lang === "ru"
                    ? ru.activation_rev
                    : "Taqrizchilarni aktivlashtirish"}
                </h3>
              </div>
              <div className="card-body">
                {users.map((user) => (
                  <div key={user.id}>
                    <div className="row justify-content-between pt-3 align-content-center">
                      <div className="col-lg-3 col-md-6 col-sm-6 ">
                        <h5
                          style={{
                            display: "inline",
                            padding: "0",
                            margin: "0",
                            fontWeight: "bold",
                          }}
                        >
                          {user.firstName}
                        </h5>
                        <p className="text-muted">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6 ">
                        <h5 className="bg-success text-center w-75 ml-auto mr-auto text-white p-1">
                          {lang === "ru" ? ru.copyPassport : "Pasport Nusxasi"}
                        </h5>
                        <div className="text-center">
                          <a
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.handleDownload(
                                user.passport && user.passport.id,
                                user.passport && user.passport.originalName,
                                user.passport && user.passport.contentType
                              )
                            }
                          >
                            {lang === "ru" ? ru.download : "Yuklab olish"} ⬇️
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <h5 className="bg-success text-center w-75 ml-auto mr-auto text-white p-1">
                          {lang === "ru"
                            ? ru.reviewerRegister_9
                            : "Ilmiy Ishlari"}
                        </h5>
                        <div className="text-center">
                          <a
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.handleDownload(
                                user.scientificWork[0] &&
                                  user.scientificWork[0].id,
                                user.scientificWork[0] &&
                                  user.scientificWork[0].originalName,
                                user.scientificWork[0] &&
                                  user.scientificWork[0].contentType
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
                            onChange={(e) => {
                              e.preventDefault();
                              this.handleChange(user.id);
                            }}
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
                    itemsCount={this.state.users.length}
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

export default React.memo(ReviewerActivation);
