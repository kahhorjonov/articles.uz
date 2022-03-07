import React, { Component } from "react";
import magazineService from "services/magazineService";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/homePage.css";

class Jurnallar extends Component {
  state = {
    magazineCategories: [],
    magazines: [],

    cover: [],
  };

  componentDidMount = async () => {
    await this.getCategory();

    this.state.magazineCategories &&
      (await this.getMagazinesById(this.state.magazineCategories[0].id));

    this.state.magazines.length &&
      this.state.magazines.map(async (magazine) => {
        await this.getImage(magazine.journals.cover.id);
      });
  };

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (
        await axios.get(
          `http://192.168.100.27:8080/api/attachment/download/${id}`,
          { responseType: "blob" }
        )
      ).data;
    } catch (err) {
      return null;
    }

    return this.setState({
      cover: [...this.state.cover, URL.createObjectURL(imageBlob)],
    });
  };

  getCategory = async () => {
    try {
      await axios
        .get("http://192.168.100.27:8080/api/category/allParentCategory")
        .then((respons) => {
          this.setState({ magazineCategories: respons.data });
        });
    } catch (ex) {
      console.log(ex);
    }
  };

  getMagazinesById = async (id) => {
    try {
      await magazineService.getMagazinesById(id).then((res) => {
        this.setState({ magazines: res.data });
      });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const { magazineCategories, magazines } = this.state;

    return (
      <>
        <div className="content">
          <div className="row mx-0">
            {magazineCategories.length ? (
              magazineCategories.map((category) => (
                <ul key={category.id} className="nav">
                  <li className="nav-item">
                    <a
                      style={{
                        cursor: "pointer",
                        color: "black",
                        fontSize: "15px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.getMagazinesById(category.id);
                      }}
                      className="nav-link text-black "
                    >
                      {category.name}
                    </a>
                  </li>
                </ul>
              ))
            ) : (
              <h1>Jurnallar Yo'q</h1>
            )}
          </div>

          <div className="row ">
            <div className="mainPages w-100">
              <div className="container p-0">
                <div className="col-md-10 pl-0  maqola_nashir"></div>

                <div className="article_rows row mx-0 mx-xl-0 mb-3 pl-0">
                  {magazines &&
                    magazines.map((magazine, idx) => (
                      <div
                        key={magazine.journals.id}
                        className="col-md-4  card-articles"
                      >
                        <div className="border-0">
                          <div
                            style={{ overflow: "hidden", height: "45rem" }}
                            className="testDiv"
                          >
                            <img
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                width: "100%",
                              }}
                              src={this.state.cover[idx]}
                              alt="Card image"
                            />
                          </div>
                          <div className="card-body p-0">
                            <h4 className="card_title p-0">
                              <Link
                                to={`/admin/magazineInfo/:${magazine.journals.id}`}
                                style={{ cursor: "pointer" }}
                              >
                                {magazine.journals.title}
                              </Link>
                            </h4>

                            <p className="card_text text-muted">
                              Amal qilish Mudati <br />
                              <span>{magazine && magazine.deadline}</span>
                              gacha
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* buttons */}
              <div className="buut-ons justify-content-center d-flex">
                <a href="">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm btn-outline-dark "
                  >
                    Barchasini ko’rish
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Jurnallar;
