import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../../components/profile.png";
import axios from "axios";
import { toast } from "react-toastify";

import "styles/magazineInfo.css";

class MagazineInfo extends Component {
  state = {
    userId: "",
    magazineInfo: [],

    cover: "",
  };

  componentDidMount() {
    try {
      // const userId = this.props.history.location.pathname.slice(21);
      const userId = this.props.location.pathname.split(":")[1]
        ? this.props.location.pathname.split(":")[1]
        : this.props.location.pathname.split(":")[0];

      console.log(userId);

      this.setState({
        userId,
      });
      this.getMagazineInfo(userId);
    } catch (error) {
      toast.error("Bunday jurnal mavjud emas");
    }
  }

  getMagazineInfo = async (id) => {
    await axios
      .get(`http://192.168.100.27:8080/api/journals/getById/${id}`)
      .then((res) => {
        // console.log(res.data.object.journals);
        this.setState({ magazineInfo: res.data.object.journals });
        this.setState({ cover: res.data.object.journals.cover });
        this.getImage(res.data.object.journals.cover.id);
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

    return this.setState({ cover: URL.createObjectURL(imageBlob) });
  };

  render() {
    const { title, category } = this.state.magazineInfo;

    return (
      <>
        <div className="content">
          <div className="card">
            <div className="card-body">
              <div className="container magazineInfo">
                <h1>“{title}” ilmiy jurnali</h1>
                <p style={{ fontSize: "16px" }} className="art_ilmiy">
                  ARTICLES.UZ ilmiy jurnallari / {category && category.name}
                </p>

                <div className="row mr-0 ml-0">
                  <div className="col-lg-4">
                    <img src={this.state.cover && this.state.cover} alt="" />

                    <h3>
                      {this.state.magazineInfo &&
                        new Date(
                          this.state.magazineInfo.createdAt
                        ).getFullYear()}{" "}
                      yildan buyon chiqadi <br />
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
                      Ommaviy axborot vositalarini ro'yxatga olish to'g'risida:
                      <br />
                      <span style={{ fontSize: "16px" }} className="text-muted">
                        № {this.state.magazineInfo.certificateNumber}
                      </span>
                    </h3>

                    <p style={{ fontSize: "16px" }}>
                      Jurnal aloqa, axborot texnologiyalari va ommaviy
                      kommunikatsiyalar sohasida nazorat bo'yicha Federal
                      xizmati (Roskomnadzor), ro'yxatga olish raqami el
                      №FS77-64808 02.02.2016 Bu haqda "RIA Novosti" axborot
                      agentligi xabar berdi.» Bosh muharrir-Konorev Marat
                      Ruslanovich.
                    </p>
                  </div>
                  <div className="col-lg-8">
                    <p style={{ fontSize: "16px" }}>
                      <strong className="pr-3">Ko'rib chiqish:</strong>
                      <span>
                        {this.state.magazineInfo &&
                          this.state.magazineInfo.description}
                      </span>
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <strong>Jurnalning chiqarilish</strong>i maqolalar qabul
                      qilingandan so'ng{" "}
                      {this.state.magazineInfo &&
                        this.state.magazineInfo.printedDate}{" "}
                      kun ichida saytda e'lon qilinadi.
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      <strong>Maqolaning chiqish ma'lumotlari</strong> - nashr
                      uchun to'lov kunida jurnal saytida.
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <strong>Jurnalni pochta orqali jo'natish</strong>
                      Rossiya maqolalar qabul qilingandan so'ng 20 kun.
                    </p>
                    <p>
                      <strong>Ilmiy bazalar</strong>- 15 kundan so'ng, barcha
                      maqolalar quyidagilarga yuboriladi:
                    </p>

                    <p style={{ fontSize: "16px" }}>
                      <strong>- eLIBRARY.RU:</strong>
                      ilmiy elektron kutubxona eLIBRARY.RU bir oyda bir
                      milliondan ortiq noyob foydalanuvchilarga tashrif
                      buyuradi.
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <strong>- Ulrichning Periodicals Directory:</strong>
                      dunyoning eng yirik ma'lumotlar bazasi bo'lgan va barcha
                      ilmiy muassasalar tomonidan ma'lumot va axborot ishlarida
                      foydalaniladigan davriy nashrlarning xalqaro katalogi.
                    </p>
                    <p>
                      <strong>- GoogleScholar.</strong>
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      Jurnalda maqola chop etish uchun ariza berish bir necha
                      daqiqada bo'lishi mumkin.
                    </p>
                    <p style={{ fontSize: "16px" }}>
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
                    </p>
                  </div>
                </div>
              </div>

              <div className="gernMaqola">
                <div className="container">
                  <div className="col-lg-12">
                    <p style={{ fontSize: "16px" }}>
                      Jurnalning yangi soni 11.09.2020 da saytda e’lon qilinadi
                    </p>
                    <h3>
                      “{title}” ilmiy jurnaliga maqolalar 01.09.2020 gacha qabul
                      qilinadi.
                    </h3>
                    <button className="btn btn-dark">Maqola Yuborish</button>
                  </div>
                </div>
              </div>

              {/* Archive for admin page */}

              <div
                style={{ margin: "15rem auto" }}
                className="container arxive "
              >
                <h1>Jurnal arxivi</h1>

                <ul style={{ margin: "3rem auto" }} className="nav nav-pills">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#home"
                    >
                      2020
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#menu1">
                      2019
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#menu2">
                      2018
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane container active" id="home">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane container fade" id="menu1">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane container fade" id="menu2">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ fontSize: "2rem", margin: "1rem auto" }}
                          className="text-dark"
                          to="/admin/editMagazine"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
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

export default MagazineInfo;
