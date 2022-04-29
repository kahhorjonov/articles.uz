import React from "react";
import Section from "./section";
import Mainhome2 from "./mainhome2";
import Listhome from "./listhome";
import Foooter from "./foooter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveMagazines } from "services/magazineService";
import GetImages from "utils/getImages";
import { BeatLoader } from "react-spinners";
import ru from "translations/ru";

import "styles/homePage.css";

class Asosiy extends React.Component {
  state = {
    magazines: [],
    loading: true,
    data: "",

    lang: "",
  };

  componentDidMount = async () => {
    const lang = localStorage.getItem("lang");
    this.setState({ lang: lang });

    try {
      await getActiveMagazines().then((res) => {
        this.setState({ magazines: res.data });
        this.setState({ loading: false });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const magazines = this.state.magazines;

    return (
      <>
        <div className="mainPages">
          <div className="container">
            <div className="col-md-10 pl-0  maqola_nashir">
              <h1>
                {this.state.lang === "ru"
                  ? ru.main_h1
                  : "Maqolalar nashr qilish uchun Articles.uz ilmiy onlayn jurnallari"}
              </h1>
              <p>
                {this.state.lang === "ru"
                  ? ru.main_p
                  : "Quyida maqolalar qabul qilinayotgan jurnallar ro’yxati"}
              </p>
            </div>

            <div className="article_rows row mx-0 mx-lg-0 mx-md-0 pl-0">
              {this.state.loading ? (
                <BeatLoader size={40} loading={this.state.loading} />
              ) : (
                <>
                  {magazines &&
                    magazines.map((magazine) => (
                      <div key={magazine.id} className="col-md-4 card-articles">
                        <div className="border-0">
                          <Link to={`/main/magazineInfo/:${magazine.id}`}>
                            <div className="boxShadow">
                              <GetImages url={magazine.cover.id} />
                            </div>
                          </Link>

                          <div className="card-body p-0">
                            <h4 className="card_title">
                              <Link to={`/main/magazineInfo/:${magazine.id}`}>
                                {magazine.title}
                              </Link>
                            </h4>

                            <p className="card_text">
                              {this.state.lang === "ru"
                                ? ru.main_deadline
                                : "Maqolalar qabul qilish muddati"}
                              <br />
                              {new Date(magazine.deadline)
                                .toISOString()
                                .slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>

          {/* buttons */}

          {/* <div className="buut-ons justify-content-center d-flex">
            <a href="">
              <button
                type="button"
                className="btn btn-dark btn-sm btn-outline-dark "
              >
                Barchasini ko’rish
              </button>
            </a>
          </div> */}
        </div>

        <Section />

        <Mainhome2 />

        <Listhome />

        <Foooter />
      </>
    );
  }
}
export default Asosiy;
