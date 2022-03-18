import React from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import people from "assets/img/homePage/working people.png";
import library from "assets/img/homePage/library.png";
import CounterUp from "./counterUp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getUsersInfo } from "services/userService";
import { toast } from "react-toastify";

import "react-lazy-load-image-component/src/effects/blur.css";
import "styles/homePage.css";
import "aos/dist/aos.css";

class Mainhome2 extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    AOS.init();
    this.getUsersInformation();
  }

  getUsersInformation = async () => {
    try {
      await getUsersInfo()
        .then((res) => {
          this.setState({ data: res.data });
        })
        .catch((ex) => {
          toast.error(ex.response.data.message);
        });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const {
      numberOfRedactors,
      numberOfReviewers,
      numberOfUsers,
      numberAllArticles,
    } = this.state.data;
    const ilmiyXodimlar =
      numberOfRedactors &&
      numberOfReviewers &&
      numberOfRedactors + numberOfReviewers;

    // const { data, country } = this.state;

    return (
      <>
        <div className="container p-0">
          <div className="img-bg">
            <div className="col-md-12">
              <LazyLoadImage
                src={people}
                effect="blur"
                delayTime="2000"
                width="100%"
              />
            </div>

            <div className="d-flex row mr-0 ml-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div
                className="col-md-6"
                data-aos="fade-right"
                data-aos-duration="5000"
              >
                <h1>
                  Bizning asosiy maqsadimiz ilmiy <br /> hodimlarning ish
                  unumdorligi oshirish
                </h1>
              </div>

              <div
                className="col-md-6"
                data-aos="fade-left"
                data-aos-duration="2000"
              >
                <p className="text-left">
                  Maqolalar chop etish uchun ilmiy jurnallar tadqiqot
                  faoliyatida samarali yordamchilardir. Ilmiy va texnologik
                  taraqqiyot materiallarni nashrga etkazish usullarini
                  soddalashtirdi. Endi ishni nashr qilish uchun siz nashriyotga
                  borishingiz, uzoq vaqt kutishingiz shart emas. Shunchaki nashr
                  qildirmoqchi bo’lgan maqolangizni bizga yuborsangiz bo’ldi!
                </p>
                <div className="buttonsDark">
                  <Link to="/login">
                    <button type="button" className="btn btn-dark">
                      Maqola yuborish
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bgGren2">
          <div className="container p-0">
            <div className="row mr-0 ml-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-6">
                <div className="art_uz">
                  <h1>Articles.uz</h1>
                  <p>
                    Ushbu onlayn jurnal o’z faoliyati davomida ilmiy
                    tadqiqotchilarning, pedagog o’qituvchilarning ko’plab ilmiy
                    maqolalaridan tashkil topgan elektron bazani shakllantirib
                    kelmoqda va plagiat maqolalarning oldi olinmoqda.
                  </p>
                  <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 num pt-5">
                    <div className="col-md-4">
                      <h5 className="mb-0">
                        {numberAllArticles ? numberAllArticles : 0}
                      </h5>

                      <p>Barcha maqolalar</p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mb-0">{numberOfUsers && numberOfUsers}</h5>
                      <p>Mualliflar</p>
                    </div>

                    <div className="col-md-4">
                      <h5 className="mb-0">
                        {ilmiyXodimlar ? ilmiyXodimlar : 0}
                      </h5>
                      <p>Ilmiy hodimlar</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="art_uz2">
                  <LazyLoadImage src={library} effect="blur" delayTime="2000" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bizning mualif eng qulay... */}
      </>
    );
  }
}
export default Mainhome2;
