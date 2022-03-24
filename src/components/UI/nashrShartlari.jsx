import React, { Component } from "react";
import Foooter from "./foooter";
import { getPrices } from "services/priceService";
import { getScientificDirections } from "services/getCategories";
import { toast } from "react-toastify";

import "styles/nashirShartlar.css";

class NashrShartlari extends Component {
  state = {
    articlPrice: [],
    directions: [],
  };

  componentDidMount() {
    this.getArticlPrice();
    this.getScientificDirections();
  }

  getScientificDirections = async () => {
    try {
      await getScientificDirections().then((res) =>
        this.setState({ directions: res.data })
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getArticlPrice = async () => {
    try {
      await getPrices().then((res) => {
        this.setState({ articlPrice: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const { articlPrice, directions } = this.state;

    const {
      bittaBosmaJunalNarxi,
      bittaSertifikatNarxi,
      chopEtishNarxi,
      doi,
      sahifaNarxi,
    } = articlPrice;

    return (
      <>
        <div className="nashir">
          <div className="container p-0">
            <h1>Nashr shartlari</h1>
            <div className="row ml-0 mr-0 w1">
              <div className="col-lg-4 pl-0">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item pl-0">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#home"
                    >
                      Ko'rib chiqish tartibi
                    </a>
                  </li>
                  <li className="nav-item pl-0">
                    <a className="nav-link" data-toggle="pill" href="#menu1">
                      Nashr narxlari
                    </a>
                  </li>

                  {/* <li className="nav-item pl-0">
                    <a className="nav-link" data-toggle="pill" href="#menu2">
                      Nazorat muddati
                    </a>
                  </li> */}

                  <li className="nav-item pl-0">
                    <a className="nav-link" data-toggle="pill" href="#menu3">
                      Maqola uchun talablar
                    </a>
                  </li>

                  <li className="nav-item pl-0">
                    <a className="nav-link" data-toggle="pill" href="#menu4">
                      Ilmiy yo'nalishlar
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-8 p-0">
                <div className="tab-content">
                  <div className="tab-pane container active" id="home">
                    <h1>Ko'rib chiqish tartibi</h1>

                    <div className="maqolas">
                      Barcha maqolalar plagiat uchun tekshiriladi( originallik
                      kamida 80% bo'lishi kerak), tegishli mutaxassislik
                      bo'yicha tahririyat kengashi a'zolari yoki tashqi
                      sharhlovchilar, nomzodlar yoki fan doktorlari tomonidan
                      ko'rib chiqiladi. <hr className="border-0" /> Maqola qabul
                      qilingach, tahririyat hay'ati kotibi maqolaning jurnal
                      profiliga, ro'yxatga olish talablariga muvofiqligini
                      belgilaydi va maqolani tahririyat kengashi a'zolaridan
                      biriga yoki tashqi sharhlovchi — mutaxassisga, maqola
                      mavzusiga eng yaqin ilmiy ixtisoslikka ega bo'lgan doktor
                      yoki fan nomzodiga sharhlashga yuboradi.{" "}
                      <hr className="border-0" /> Maqolani ko'rib chiqish
                      muddati-10 kun. <hr className="border-0" /> Tahririyat
                      kengashi a'zosi yoki tashqi sharhlovchining sharhida
                      quyidagi savollar keltirilgan: <hr className="border-0" />
                      maqolaning mazmuni sarlavha ostida e'lon qilingan mavzuga
                      mos keladimi; <hr className="border-0" /> maqola tegishli
                      sohadagi ilm-fanning zamonaviy yutuqlariga qanchalik mos
                      keladi; maqola materialining o'quvchilarga til, uslub,
                      materialning joylashuvi, jadvallar, diagrammalar,
                      chizmalar va formulalar ko'rinishi nuqtai nazaridan
                      mavjudligi; <hr className="border-0" /> maqola nashr
                      etilishi maqola materiallarining yangiligi bilan mos
                      keladimi; maqolaning muallifiga qanday kamchiliklar,
                      tuzatishlar va qo'shimchalar kiritilishi kerak;
                      sharhlovchi tomonidan belgilangan kamchiliklarni
                      tuzatishni hisobga olgan holda tavsiya etiladi yoki
                      Universum jurnallarida chop etish uchun tavsiya etilmaydi.
                      <hr className="border-0" />
                      Tahririyat kengashi a'zolari tomonidan amalga oshirilgan
                      barcha sharhlar nashriyot tomonidan tasdiqlanadi; tashqi
                      sharhlovchilar tomonidan bajarilgan sharhlar sharhlovchi
                      ishlaydigan muassasada belgilangan tartibda tasdiqlanadi.{" "}
                      <hr className="border-0" />
                      Agar maqolani tuzatish va takomillashtirish bo'yicha
                      tavsiyalar mavjud bo'lsa, Universum jurnallarining
                      tahririyat kengashi kotibi muallifga sharhlovchining
                      fikrlarini maqolaning yangi versiyasini tayyorlashda yoki
                      ularni (qisman yoki to'liq) rad etishda ularni hisobga
                      olish taklifi bilan yuboradi. Muallif tomonidan ishlab
                      chiqilgan (qayta ishlangan) maqola qayta ko'rib chiqishga
                      yuboriladi. <hr className="border-0" /> Sharhlovchi
                      tomonidan nashrga tavsiya etilmagan maqola qayta ko'rib
                      chiqishga qabul qilinmaydi. Salbiy xulosa matni muallifga
                      elektron pochta orqali yuboriladi.{" "}
                      <hr className="border-0" /> Universum jurnallarining
                      tahririyat kengashlari tomonidan maqolani nashr etishga
                      ruxsat berish to'g'risida qaror qabul qilingandan so'ng,
                      muallif nashriyot xarajatlarini qoplaydigan nashrni
                      to'lash uchun hisob-kitob qiladi. Muallif elektron pochta
                      orqali to'lovni qabul qilish, shuningdek, nashr etish
                      muddati haqida ma'lumot beradi.
                    </div>
                  </div>

                  <div
                    className="tab-pane container nashirNarxi fade"
                    id="menu1"
                  >
                    <div className="nashirNarxi">
                      <h4 className="mt-0">Nashr narxlari</h4>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Maqola nashr qilish
                          <span> {chopEtishNarxi} so’m</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Bosma jurnal (nusxasi uchun)
                          <span>{bittaBosmaJunalNarxi} so’m</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Chop etilgan bosma (nusxasi uchun)
                          <span> so’m</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Maqolani nashrga qabul qilish to'g'risidagi sms
                          xabarnoma
                          <span>BEPUL</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Bosma jurnalni yetkazib berish xizmati (Toshkent
                          shahar)
                          <span>30 000 so’m</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Bosma jurnalni yetkazib berish xizmati (O’zbekiston
                          Respublikasi)
                          <span>80 000 so’m</span>
                        </li>
                        <li className="list-group-item disable">
                          Qo'shimcha xizmatlar narxi:
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Matnni tuzatish
                          <span>{sahifaNarxi} so’m / 1 sahifasi</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Matnni tahrir qilish
                          <span>12 000 so’m / 1 sahifasi</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Adabiyotlar ro'yxatini tahrirlash
                          <span>12 000 so’m / 1 sahifasi</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Maqolaning nomi, muallifning ismi, regaliy, ish joyi,
                          annotatsiya <br /> va kalit so'zlarni tarjima qilish
                          <br />
                          <span>60 so’m / (+ probel).</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="tab-pane container maqollarUchun fade"
                    id="menu3"
                  >
                    <div className="maqolalar">
                      <h4 className="mt-0">Maqola uchun talablar</h4>
                      <div className="maqolas">
                        1. Ushbu maqola ilgari nashr qilinmagan va boshqa
                        jurnalda ko'rib chiqish va chop etish uchun taqdim
                        etilmagan. <hr className="border-0" />
                        2. Nashrga kamida 5 bet matnli maqolalar qabul qilinadi.
                        <hr className="border-0" />
                        3. Matn, formulalar va jadvallarni yozish uchun Windows
                        uchun Microsoft Word muharriri ishlatilishi kerak. Matn
                        yozishdan oldin quyidagi matn muharriri parametrlarini
                        sozlang: sahifa formati:A4( 210x297 mm), 2 sm gacha
                        bo'lgan joylar; Times New Roman shrifti, o'lchami 14;
                        satr oralig'i – 1,5; kenglik bo'yicha hizalama; 1 sm
                        xatboshi; varaqning yo'nalishi – kitob. Maqolada
                        ishlatiladigan tasvirlar format bo'lishi kerak: jpg,
                        gif, bmp, MS Wordda yaratilgan tasvirlar qabul
                        qilinmaydi. Barcha chizmalar va jadvallar raqamlangan
                        bo'lishi kerak va nomlar yoki chizilgan imzolar bilan
                        jihozlangan bo'lishi kerak va matn mazmunida (hujjatning
                        oxirida emas) talab qilinadigan matnda joylashgan
                        bo'lishi kerak.
                        <hr className="border-0" />
                        4. Sarlavha rus tilida: (kichik, qalin harflar bilan,
                        satrning markazida hizalanish) maqolaning nomi; keyingi
                        satrda (shrift qalin kursiv, o'ng tomondagi hizalama) –
                        maqolaning muallifi to'liq nomi; keyingi satrda (kursiv
                        shrift, o'ng tomondagi hizalama) – ilmiy daraja, ilmiy
                        unvon, lavozim, universitet nomi, mamlakat, shahar;
                        keyingi qatorda (kursiv shrifti, o'ng tomondagi
                        hizalama) – kontaktlar uchun elektron pochta. Agar bir
                        nechta maqola muallifi bo'lsa, unda har bir muallif
                        uchun ma'lumot takrorlanadi.
                        <hr className="border-0" />
                        5. Ingliz tilida sarlavha, ism va lavozimni ro'yxatdan
                        o'tkazish: 4-banddan olingan ma'lumotlar. ingliz tilida
                        takrorlanadi.
                        <hr className="border-0" />
                        6. 1 liniyasi orqali-annotatsiya rus va ingliz
                        tillarida.
                        <hr className="border-0" />
                        7. Kalit so'zlar (rus va ingliz tillarida berilgan)
                        bir-biridan vergul bilan ajralib turadi.
                        <hr className="border-0" />
                        8. 1 liniyasi orqali-maqola matni.
                        <hr className="border-0" />
                        9. 1 satr orqali - "adabiyotlar ro'yxati"yozuvi. Shundan
                        so'ng, GOST r 7.0.5 – 2008 ga muvofiq ishlab chiqilgan
                        raqamlash bilan alifbo tartibida adabiyotlar ro'yxati
                        berilgan. Adabiyot ro'yxatidan tegishli manbaga matndagi
                        ishoratlar kvadrat qavs ichida amalga oshiriladi,
                        masalan: [1, p. 277]. Avtomatik sahifa havolalaridan
                        foydalanishga yo'l qo'yilmaydi.
                        <hr className="border-0" />
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane container ilmiyYonalish fade"
                    id="menu4"
                  >
                    <div className="colapss" id="accordion">
                      <h4 className="mt-0">Ilmiy yo’nalishlar</h4>

                      <ul className="list-group list-group-flush">
                        <hr />

                        {directions &&
                          directions.map((direction, idx) => (
                            <div key={idx}>
                              <a
                                className="lik"
                                data-toggle="collapse"
                                href={`#collapse${idx}`}
                              >
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  {direction.title}
                                  <i className="nc-icon nc-minimal-right" />
                                </li>

                                <div
                                  id={`collapse${idx}`}
                                  className="collapse"
                                  data-parent="#accordion"
                                >
                                  {direction.description}
                                </div>
                              </a>
                              <hr />
                            </div>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Foooter />
      </>
    );
  }
}

export default NashrShartlari;
