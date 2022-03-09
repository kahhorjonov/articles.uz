import React from "react";
import Section from "./section";
import Mainhome2 from "./mainhome2";
import Listhome from "./listhome";
import Foooter from "./foooter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveMagazines } from "services/magazineService";

import img from "../profile.png";

import "../../styles/homePage.css";
import GetImages from "utils/getImages";

class Asosiy extends React.Component {
  state = {
    magazines: [],
  };

  componentDidMount = async () => {
    try {
      await getActiveMagazines().then((res) =>
        this.setState({ magazines: res.data })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const magazines = this.state.magazines;
    console.log(magazines[0]);

    return (
      <>
        <div className="mainPages">
          <div className="container">
            <div className="col-md-10 pl-0  maqola_nashir">
              <h1>
                Maqolalar nashr qilish uchun <br />
                Articles.uz ilmiy onlayn jurnallari
              </h1>
              <p>Quyida maqolalar qabul qilinayotgan jurnallar ro’yxati</p>
            </div>

            <div className="article_rows row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 pl-0">
              {magazines.length &&
                magazines.map((magazine) => (
                  <div key={magazine.id} className="col-md-4 card-articles">
                    <div className="border-0">
                      <GetImages url={magazine.cover.id} />

                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to={`/main/magazineInfo/:${magazine.id}`}>
                            {magazine.title}
                          </Link>
                        </h4>

                        <p className="card_text">
                          Maqolalar qabul qilish muddati <br />
                          {new Date(magazine.deadline)
                            .toISOString()
                            .slice(0, 10)}{" "}
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

        <Section />

        <Mainhome2 />

        <Listhome />

        <Foooter />
      </>
    );
  }
}
export default Asosiy;
