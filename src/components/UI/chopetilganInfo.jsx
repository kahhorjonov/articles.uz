import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../profile.png";
import Foooter from "./foooter";

import "styles/chopetilganinfo.css";

class Chopetilganinfo extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="covid19">
                    <div className="container">
                      <Link onClick={this.props.history.goBack}>
                        <span style={{ fontSize: "2rem", lineHeight: "auto" }}>
                          &#8617;{" "}
                        </span>{" "}
                        ORTGA / Chop etilgan maqolalarim
                      </Link>
                      <h1>
                        Covid-19 vaksinasini yaratishda tavsiya <br />
                        etiladigan kimyoviy birikmalar ro’yxati
                      </h1>
                      <p style={{ padding: "2rem 7rem", color: "#aaa" }}>
                        Muallif: <span>Mardonov Abdulaziz</span>
                      </p>
                    </div>
                    <div className="container">
                      <img src={img} width="100%" height="100%" alt="img" />
                    </div>
                    <div className="row mx-0">
                      <div className="container ">
                        {/* <div> */}
                        <p style={{ color: "#aaa", marginBottom: "3rem" }}>
                          Jurnal professional shifokorlar va farmakologlar,
                          ilmiy xodimlar va universitet o'qituvchilariga
                          qaratilgan. Jurnalda muammoli va ilmiy-amaliy
                          maqolalar chop etiladi. Talabalarning ishlari faqat
                          ilmiy rahbarning hammuavorlarida ko'rib chiqilishi
                          uchun qabul qilinadi. Ko'rib chiqish - nashr qilish
                          uchun ariza topshirilgan kundan boshlab o'n kun
                          ichida. Xalqaro tahririyat kengashi tibbiyot va
                          farmakologiya fanlari doktori va fan nomzodlarini o'z
                          ichiga oladi. Maqolaning chiqish ma'lumotlari - nashr
                          uchun to'lov kunida jurnal saytida. Jurnalning
                          chiqarilishi maqolalar qabul qilingandan so'ng 10 kun
                          ichida saytda e'lon qilinadi. Jurnalni pochta orqali
                          jo'natish Rossiya maqolalar qabul qilingandan so'ng 20
                          kun. Ilmiy bazalar - 15 kundan so'ng, barcha maqolalar
                          quyidagilarga yuboriladi: - eLIBRARY.RU: ilmiy
                          elektron kutubxona eLIBRARY.RU bir oyda bir milliondan
                          ortiq noyob foydalanuvchilarga tashrif buyuradi. -
                          Ulrichning Periodicals Directory: dunyoning eng yirik
                          ma'lumotlar bazasi bo'lgan va barcha ilmiy muassasalar
                          tomonidan ma'lumot va axborot ishlarida
                          foydalaniladigan davriy nashrlarning xalqaro katalogi.
                          - GoogleScholar. Jurnalda maqola chop etish uchun
                          ariza berish bir necha daqiqada bo'lishi mumkin.
                          Kimyo, biologiya va tibbiyot bilan chambarchas bog'liq
                          bo'lgan boshqa fanlarning rivojlanishi tufayli fan
                          rivojlanishning yuqori darajasiga chiqdi. Tibbiy ilmiy
                          jurnallar endi elektron shaklda chop etiladi.
                          Internet, yangi axborotni ilmiy jamoatchilikka
                          etkazish usuli sifatida, tibbiyot olimlariga qisqa
                          vaqt ichida o'z tadqiqotlarini hamkasblari va barcha
                          manfaatdor tomonlar bilan baham ko'rishga yordam
                          beradi. Tibbiyot jurnalida ilmiy ishni nashr etish
                          uchun soddalashtirilgan ariza berish ko'plab
                          muammolarni hal qiladi. Mualliflar tadqiqot mavzusiga
                          muvofiq ilmiy davriy nashrni tanlaydilar. Maqola
                          nashrga qabul qilingandan so'ng ular rasmiy hujjatni
                          oladilar — maqolani ilmiy jurnal tomonidan chop
                          etishga qabul qilinganligini tasdiqlovchi sertifikat.
                          Bizning nashrlarimiz Rossiya Federatsiyasidagi
                          noshirlik faoliyati bo'yicha davlat standartlari
                          talablariga muvofiq rasmiylashtiriladi. Nashrlarning,
                          shu jumladan, tibbiyot sohasida elektron nashr etish
                          tizimi o'zini to'liq oqlaydi, bu uning har tomonlama
                          rivojlanishini isbotlaydi.
                        </p>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Foooter /> */}
      </>
    );
  }
}

export default Chopetilganinfo;
