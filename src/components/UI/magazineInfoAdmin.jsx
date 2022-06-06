import React, { Component } from "react";
import GetImages from "utils/getImages";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "services/authService";
import { downloadMedia } from "services/mediaService";
import ru from "translations/ru";

import {
  getById,
  getYearById,
  getMagazinesByYear,
} from "services/magazineService";

import "styles/magazineInfo.css";

class MagazineInfoAdmin extends Component {
  state = {
    magazineId: "",
    magazineInfo: [],

    years: [],
    magazines: [],
    cover: "",
    user: "",

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    try {
      const user = getCurrentUser() && getCurrentUser().roles[0].id;
      this.setState({ user });

      const magazineId = this.props.location.pathname.split(":")[1]
        ? this.props.location.pathname.split(":")[1]
        : this.props.location.pathname.split(":")[0];

      this.setState({
        magazineId,
      });

      this.getMagazineInfo(magazineId);
      this.getYearsById(magazineId);
    } catch (ex) {
      toast.error("Bunday jurnal mavjud emas");
    }
  }

  getMagazineInfo = async (id) => {
    try {
      await getById(id).then((res) => {
        this.setState({ magazineInfo: res.data.object.journals });
        this.setState({ cover: res.data.object.journals.cover.id });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getYearsById = async (id) => {
    try {
      await getYearById(id).then((res) => {
        this.setState({ years: res.data });
        if (res.data[0]) {
          this.getMagazinesByYear(res.data[0], this.state.magazineId);
        }
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getMagazinesByYear = async (year, id) => {
    try {
      this.setState({ magazines: [] });

      await getMagazinesByYear(year, id).then((res) => {
        this.setState({ magazines: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  // getImage = async (id) => {
  //   let imageBlob;
  //   const obj = { responseType: "blob" };

  //   try {
  //     imageBlob = (await downloadMedia(id, obj)).data;
  //   } catch (err) {
  //     return toast.error("Fayl topilmadi");
  //   }

  //   return this.setState({ cover: URL.createObjectURL(imageBlob) });
  // };

  render() {
    const { title, category, deadline } = this.state.magazineInfo;
    const { years, magazines, magazineId, lang, cover } = this.state;

    return (
      <>
        <div className="content">
          <div className="card">
            <div className="card-body">
              <div className="container magazineInfo">
                <h1>
                  “{title}” {lang === "ru" ? ru.ilmiy_jurnal : "ilmiy jurnali"}
                </h1>

                <p style={{ fontSize: "16px" }} className="art_ilmiy">
                  ARTICLES.UZ{" "}
                  {lang === "ru" ? ru.ilmiy_jurnallar : " Ilmiy jurnallar"} /{" "}
                  {category && category.name}
                </p>

                <div className="row mr-0 ml-0">
                  <div className="col-lg-4">
                    <Link
                      to={
                        this.state.user === 1
                          ? `/admin/editMagazine/:${magazineId}`
                          : `/reductor/editMagazine/:${magazineId}`
                      }
                    >
                      <GetImages url={cover && cover} />
                    </Link>

                    <h3>
                      {this.state.lang === "ru" ? (
                        <span>
                          Выходит с{" "}
                          {new Date(
                            this.state.magazineInfo.createdAt
                          ).getFullYear()}
                        </span>
                      ) : (
                        <span>
                          {new Date(
                            this.state.magazineInfo.createdAt
                          ).getFullYear()}{" "}
                          dan buyon chiqadi
                        </span>
                      )}
                      <br />
                      ISBN:{" "}
                      <span style={{ fontSize: "16px" }} className="text-muted">
                        {this.state.magazineInfo &&
                          this.state.magazineInfo.isbn}
                      </span>{" "}
                      <br />
                      ISSN:{" "}
                      <span style={{ fontSize: "16px" }} className="text-muted">
                        {this.state.magazineInfo &&
                          this.state.magazineInfo.issn}
                      </span>{" "}
                      <br />
                      {lang === "ru"
                        ? ru.jurnal8
                        : "Ommaviy axborot vositalarini ro'yxatga olish to'g'risida:"}
                      <br />
                      <span style={{ fontSize: "16px" }} className="text-muted">
                        № {this.state.magazineInfo.certificateNumber}
                      </span>
                    </h3>

                    {/* <p style={{ fontSize: "16px" }}>
                      {lang === "ru"
                        ? ru.jurnal9
                        : "Jurnal aloqa, axborot texnologiyalari va ommaviy kommunikatsiyalar sohasida nazorat bo'yicha Federal xizmati (Roskomnadzor), ro'yxatga olish raqami el №FS77-64808 02.02.2016 Bu haqda `RIA Novosti` axborot agentligi xabar berdi.» Bosh muharrir-Konorev Marat Ruslanovich."}
                    </p> */}
                  </div>
                  <div className="col-lg-8">
                    <p style={{ fontSize: "16px" }}>
                      <strong className="pr-3">
                        {lang === "ru" ? ru.jurnal : "Jurnal : "}{" "}
                      </strong>
                      <span>
                        {this.state.magazineInfo &&
                          this.state.magazineInfo.description}
                      </span>
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <strong>
                        {lang === "ru" ? ru.jurnal1 : "Jurnalning chiqarilishi"}
                      </strong>{" "}
                      {lang === "ru"
                        ? ru.jurnal2
                        : "maqolalar qabul qilingandan so'ng"}{" "}
                      <strong>
                        {this.state.magazineInfo &&
                          this.state.magazineInfo.printedDate}{" "}
                      </strong>
                      {lang === "ru"
                        ? ru.jurnal_kun
                        : "kun ichida saytda e'lon qilinadi."}
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      {lang === "ru" ? (
                        ru.jurnal3
                      ) : (
                        <span>
                          <strong>
                            Maqolaning chiqish haqidagi ma'lumotlari
                          </strong>{" "}
                          sms tarzida yetkaziladi.
                        </span>
                      )}
                    </p>

                    {/* <p style={{ fontSize: "16px" }}>
                      <strong>Jurnalni pochta orqali jo'natish</strong>
                      Rossiya maqolalar qabul qilingandan so'ng 20 kun.
                    </p> */}

                    <p style={{ fontSize: "16px" }}>
                      {lang === "ru" ? (
                        ru.jurnal4
                      ) : (
                        <span>
                          <strong>Ilmiy bazalar </strong> 15 kundan so'ng,
                          barcha maqolalar quyidagilarga yuboriladi:
                        </span>
                      )}
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      {lang === "ru" ? (
                        ru.jurnal5
                      ) : (
                        <span>
                          <strong> - eLIBRARY.RU: </strong>
                          ilmiy elektron kutubxona bir oyda bir milliondan ortiq
                          noyob foydalanuvchilarga tashrif buyuradi.
                        </span>
                      )}
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      {lang === "ru" ? (
                        ru.jurnal6
                      ) : (
                        <span>
                          <strong> - Ulrich's Periodicals Directory :</strong>{" "}
                          международный каталог периодических изданий, который
                          является крупнейшей в мире базой данных и используется
                          всеми академическими учреждениями для информации и
                          информационной работы.
                        </span>
                      )}
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      <strong>- GoogleScholar.</strong>
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      {lang === "ru"
                        ? ru.jurnal7
                        : "Jurnalda maqola chop etish uchun ariza berish bir necha daqiqada amalga oshiriladi"}
                    </p>

                    {/* <p style={{ fontSize: "16px" }}>
                      Kimyo, biologiya va tibbiyot bilan chambarchas bog'liq
                      bo'lgan boshqa fanlarning rivojlanishi tufayli fan
                      rivojlanishning yuqori darajasiga chiqdi. Tibbiy ilmiy
                      jurnallar endi elektron shaklda chop etiladi. Internet,
                      yangi axborotni ilmiy jamoatchilikka etkazish usuli
                      sifatida, tibbiyot olimlariga qisqa vaqt ichida o'z
                      tadqiqotlarini hamkasblari va barcha manfaatdor tomonlar
                      bilan baham ko'rishga yordam beradi.
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      Tibbiyot jurnalida ilmiy ishni nashr etish uchun
                      soddalashtirilgan ariza berish ko'plab muammolarni hal
                      qiladi. Mualliflar tadqiqot mavzusiga muvofiq ilmiy davriy
                      nashrni tanlaydilar. Maqola nashrga qabul qilingandan
                      so'ng ular rasmiy hujjatni oladilar — maqolani ilmiy
                      jurnal tomonidan chop etishga qabul qilinganligini
                      tasdiqlovchi sertifikat. Bizning nashrlarimiz Rossiya
                      Federatsiyasidagi noshirlik faoliyati bo'yicha davlat
                      standartlari talablariga muvofiq rasmiylashtiriladi.
                      Nashrlarning, shu jumladan, tibbiyot sohasida elektron
                      nashr etish tizimi o'zini to'liq oqlaydi, bu uning har
                      tomonlama rivojlanishini isbotlaydi.
                    </p> */}
                  </div>
                </div>
              </div>

              {/* <div className="gernMaqola">
                <div className="container">
                  <div className="col-lg-12">
                    <p style={{ fontSize: "16px" }}>
                      {lang === "ru"
                        ? ru.jurnal_chop
                        : "Jurnalning yangi soni saytda e’lon qilinadi:"}{" "}
                      {deadline && new Date(deadline).toLocaleDateString()}
                    </p>

                    <h3>
                      “{title}”{" "}
                      {lang === "ru"
                        ? ru.main_deadline
                        : "ilmiy jurnaliga maqolalar qabul qilish oxirgi sanasi"}{" "}
                      {deadline && new Date(deadline).toLocaleDateString()}{" "}
                    </h3>
                  </div>
                </div>
              </div> */}

              {/* Archive for admin page */}

              <div className="col-lg-12 ui3 px-0">
                <div className="container arxive">
                  <ul className="nav nav-pills">
                    {years &&
                      years.map((year, idx) => (
                        <li key={idx} className="nav-item">
                          <Link
                            className="nav-link active"
                            data-toggle="pill"
                            to=""
                            onClick={(e) => {
                              e.preventDefault();

                              this.getMagazinesByYear(
                                year,
                                this.state.magazineId
                              );
                            }}
                          >
                            {year}
                          </Link>
                        </li>
                      ))}
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane container active">
                      <h2 style={{ paddingTop: "5rem" }}>
                        {lang === "ru" ? ru.jurnal_arxiv : "Jurnal arxivi"}
                      </h2>
                      <div style={{ minHeight: "50rem" }} className="row">
                        {magazines &&
                          magazines.map((magazine) => (
                            <div key={magazine.id} className="col-lg-3">
                              <Link
                                to={
                                  this.state.user === 1
                                    ? `/admin/editMagazine/:${magazine.id}`
                                    : `/reductor/editMagazine/:${magazine.id}`
                                }
                              >
                                <div className="boxShadow">
                                  <GetImages url={magazine.cover.id} />
                                </div>
                              </Link>

                              <Link
                                style={{
                                  fontSize: "2rem",
                                  margin: "1rem auto",
                                }}
                                className="text-dark"
                                to={
                                  this.state.user === 1
                                    ? `/admin/editMagazine/:${magazine.id}`
                                    : `/reductor/editMagazine/:${magazine.id}`
                                }
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
      </>
    );
  }
}

export default React.memo(MagazineInfoAdmin);
