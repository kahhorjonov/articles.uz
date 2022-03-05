import React, { Component } from "react";
import axios from "axios";
import img from "../../components/profile.png";
import { Link } from "react-router-dom";
import magazineService from "services/magazineService";
import "../../styles/homePage.css";
import { toast } from "react-toastify";

class Jurnallar extends Component {
  state = {
    magazineCategories: [],
    magazines: [],
  };


  

  getCategory = async () => {
    try {
      await axios
        .get("http://192.168.100.27:8080/api/category/allParentCategory")
        .then((respons) => {
          this.setState({ magazineCategories: respons.data });
        });
    } catch (erorr) {
      console.log(erorr);
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

  componentDidMount = async () => {
    await this.getCategory();

    (await this.state.magazineCategories) &&
      this.getMagazinesById(this.state.magazineCategories[0].id);
  };

  render() {
    const { magazineCategories, magazines } = this.state;

    return (
      <>
        <div className="content">
          <div className="row mx-0">
            {magazineCategories ? (
              magazineCategories.map((magazine) => (
                <ul key={magazine.id} className="nav">
                  <li className="nav-item">
                    <a
                      style={{
                        cursor: "pointer",
                        color: "black",
                        fontSize: "15px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.getMagazinesById(magazine.id);
                      }}
                      className="nav-link text-black "
                    >
                      {magazine.name}
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
                    magazines.map((magzin) => (
                      <div
                        key={magzin.journals.id}
                        className="col-md-4  card-articles"
                      >
                        <div className="border-0">
                          <img
                            className="card-img-top"
                            src={img}
                            alt="Card image"
                          />
                          <div className="card-body p-0">
                            <h4 className="card_title p-0">
                              <Link to={`/admin/magazineInfo/:${magzin.journals.id}`} style={{ cursor: "pointer" }}>
                                {magzin.journals.title}
                              </Link>
                            </h4>

                            <p className="card_text text-muted">
                              Amal qilish Mudati <br />
                              <span>{magzin && magzin.deadline}</span>
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
