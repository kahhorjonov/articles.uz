import React, { Component } from "react";
import img from '../../components/profile.png';
import "../../styles/magazineInfo.css";
import axios from 'axios';
class MagazineInfo extends Component {
  state = {
      magazineInfo: []
  };


  getMagazineInfo = async () => {
      await axios.get(``)
  }



  render() {
    return (
      <>
    
        <div className="content">
          <div className="container magazineInfo">
            <h1>“Tibbiyot va farmakologiya” ilmiy jurnali</h1>
            <p className="art_ilmiy">ARTICLES.UZ ilmiy jurnallari / Tibbiyot</p>

            <div className="row mr-0 ml-0">
              <div className="col-lg-4">
                <img src={img} alt="" />

                <h3>
                  2013 yildan buyon chiqadi <br />
                  ISSN:<span className="text-muted">2311-2333</span> <br />
                  Ommaviy axborot vositalarini ro'yxatga olish to'g'risida:{" "}
                  <br />
                  <span className="text-muted">
                    № FS77-54438 17.06.2013 dan
                  </span>
                </h3>

                <p>
                  Jurnal aloqa, axborot texnologiyalari va ommaviy
                  kommunikatsiyalar sohasida nazorat bo'yicha Federal xizmati
                  (Roskomnadzor), ro'yxatga olish raqami el №FS77-64808
                  02.02.2016 Bu haqda "RIA Novosti" axborot agentligi xabar
                  berdi.» Bosh muharrir-Konorev Marat Ruslanovich.
                </p>
              </div>
              <div className="col-lg-8">
                <p>
                  <strong>Ko'rib chiqish</strong> - nashr qilish uchun ariza
                  topshirilgan kundan boshlab o'n kun ichida. Xalqaro tahririyat
                  kengashi tibbiyot va farmakologiya fanlari doktori va fan
                  nomzodlarini o'z ichiga oladi.
                </p>
                <p>
                  <strong>Maqolaning chiqish ma'lumotlari</strong> - nashr uchun
                  to'lov kunida jurnal saytida.
                </p>

                <p>
                  {" "}
                  <strong>Jurnalning chiqarilish</strong>i maqolalar qabul
                  qilingandan so'ng 10 kun ichida saytda e'lon qilinadi.
                </p>
                <p>
                  <strong>Jurnalni pochta orqali jo'natish</strong>
                  Rossiya maqolalar qabul qilingandan so'ng 20 kun.
                </p>
                <p>
                  <strong>Ilmiy bazalar</strong>- 15 kundan so'ng, barcha
                  maqolalar quyidagilarga yuboriladi:
                </p>

                <p>
                  <strong>- eLIBRARY.RU:</strong>
                  ilmiy elektron kutubxona eLIBRARY.RU bir oyda bir milliondan
                  ortiq noyob foydalanuvchilarga tashrif buyuradi.
                </p>
                <p>
                  <strong>- Ulrichning Periodicals Directory:</strong>
                  dunyoning eng yirik ma'lumotlar bazasi bo'lgan va barcha ilmiy
                  muassasalar tomonidan ma'lumot va axborot ishlarida
                  foydalaniladigan davriy nashrlarning xalqaro katalogi.
                </p>
                <p>
                  <strong>- GoogleScholar.</strong>
                </p>
                <p>
                  Jurnalda maqola chop etish uchun ariza berish bir necha
                  daqiqada bo'lishi mumkin.
                </p>
                <p>
                  Kimyo, biologiya va tibbiyot bilan chambarchas bog'liq bo'lgan
                  boshqa fanlarning rivojlanishi tufayli fan rivojlanishning
                  yuqori darajasiga chiqdi. Tibbiy ilmiy jurnallar endi elektron
                  shaklda chop etiladi. Internet, yangi axborotni ilmiy
                  jamoatchilikka etkazish usuli sifatida, tibbiyot olimlariga
                  qisqa vaqt ichida o'z tadqiqotlarini hamkasblari va barcha
                  manfaatdor tomonlar bilan baham ko'rishga yordam beradi.
                </p>
                <p>
                  Tibbiyot jurnalida ilmiy ishni nashr etish uchun
                  soddalashtirilgan ariza berish ko'plab muammolarni hal qiladi.
                  Mualliflar tadqiqot mavzusiga muvofiq ilmiy davriy nashrni
                  tanlaydilar. Maqola nashrga qabul qilingandan so'ng ular
                  rasmiy hujjatni oladilar — maqolani ilmiy jurnal tomonidan
                  chop etishga qabul qilinganligini tasdiqlovchi sertifikat.
                  Bizning nashrlarimiz Rossiya Federatsiyasidagi noshirlik
                  faoliyati bo'yicha davlat standartlari talablariga muvofiq
                  rasmiylashtiriladi. Nashrlarning, shu jumladan, tibbiyot
                  sohasida elektron nashr etish tizimi o'zini to'liq oqlaydi, bu
                  uning har tomonlama rivojlanishini isbotlaydi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MagazineInfo;
