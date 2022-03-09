// import React from "react";
// import Foooter from "./foooter";
// import img from "../../profile.png";

// import "styles/home2.css";

// const Home2 = () => {
//   return (
//     <>
//       <div className="jurnalRoyxat">
//         <div className="container">
//           <h1>“Tibbiyot va farmakologiya” ilmiy jurnali</h1>
//           <p>ARTICLES.UZ ilmiy jurnallari / Tibbiyot</p>

//           <div className="row mr-0 ml-0">
//             <div className="col-lg-4">
//               <img src={img} alt="" />

//               <h3>
//                 2013 yildan buyon chiqadi <br />
//                 ISSN:<span className="text-muted">2311-2333</span> <br />
//                 Ommaviy axborot vositalarini ro'yxatga olish to'g'risida: <br />
//                 <span className="text-muted">№ FS77-54438 17.06.2013 dan</span>
//               </h3>

//               <p>
//                 Jurnal aloqa, axborot texnologiyalari va ommaviy
//                 kommunikatsiyalar sohasida nazorat bo'yicha Federal xizmati
//                 (Roskomnadzor), ro'yxatga olish raqami el №FS77-64808 02.02.2016
//                 Bu haqda "RIA Novosti" axborot agentligi xabar berdi.» Bosh
//                 muharrir-Konorev Marat Ruslanovich.
//               </p>
//             </div>
//             <div className="col-lg-8">
//               <p className="pt-0">
//                 Jurnal professional shifokorlar va farmakologlar, ilmiy xodimlar
//                 va universitet o'qituvchilariga qaratilgan. Jurnalda muammoli va
//                 ilmiy-amaliy maqolalar chop etiladi. Talabalarning ishlari faqat
//                 ilmiy rahbarning hammuavorlarida ko'rib chiqilishi uchun qabul
//                 qilinadi.
//               </p>

//               <p>
//                 <strong>Ko'rib chiqish</strong> - nashr qilish uchun ariza
//                 topshirilgan kundan boshlab o'n kun ichida. Xalqaro tahririyat
//                 kengashi tibbiyot va farmakologiya fanlari doktori va fan
//                 nomzodlarini o'z ichiga oladi.
//               </p>
//               <p>
//                 <strong>Maqolaning chiqish ma'lumotlari</strong> - nashr uchun
//                 to'lov kunida jurnal saytida.
//               </p>

//               <p>
//                 {" "}
//                 <strong>Jurnalning chiqarilish</strong>i maqolalar qabul
//                 qilingandan so'ng 10 kun ichida saytda e'lon qilinadi.
//               </p>
//               <p>
//                 <strong>Jurnalni pochta orqali jo'natish</strong>
//                 Rossiya maqolalar qabul qilingandan so'ng 20 kun.
//               </p>
//               <p>
//                 <strong>Ilmiy bazalar</strong>- 15 kundan so'ng, barcha
//                 maqolalar quyidagilarga yuboriladi:
//               </p>

//               <p>
//                 <strong>- eLIBRARY.RU:</strong>
//                 ilmiy elektron kutubxona eLIBRARY.RU bir oyda bir milliondan
//                 ortiq noyob foydalanuvchilarga tashrif buyuradi.
//               </p>
//               <p>
//                 <strong>- Ulrichning Periodicals Directory:</strong>
//                 dunyoning eng yirik ma'lumotlar bazasi bo'lgan va barcha ilmiy
//                 muassasalar tomonidan ma'lumot va axborot ishlarida
//                 foydalaniladigan davriy nashrlarning xalqaro katalogi.
//               </p>
//               <p>
//                 <strong>- GoogleScholar.</strong>
//               </p>
//               <p>
//                 Jurnalda maqola chop etish uchun ariza berish bir necha daqiqada
//                 bo'lishi mumkin.
//               </p>
//               <p>
//                 Kimyo, biologiya va tibbiyot bilan chambarchas bog'liq bo'lgan
//                 boshqa fanlarning rivojlanishi tufayli fan rivojlanishning
//                 yuqori darajasiga chiqdi. Tibbiy ilmiy jurnallar endi elektron
//                 shaklda chop etiladi. Internet, yangi axborotni ilmiy
//                 jamoatchilikka etkazish usuli sifatida, tibbiyot olimlariga
//                 qisqa vaqt ichida o'z tadqiqotlarini hamkasblari va barcha
//                 manfaatdor tomonlar bilan baham ko'rishga yordam beradi.
//               </p>
//               <p>
//                 Tibbiyot jurnalida ilmiy ishni nashr etish uchun
//                 soddalashtirilgan ariza berish ko'plab muammolarni hal qiladi.
//                 Mualliflar tadqiqot mavzusiga muvofiq ilmiy davriy nashrni
//                 tanlaydilar. Maqola nashrga qabul qilingandan so'ng ular rasmiy
//                 hujjatni oladilar — maqolani ilmiy jurnal tomonidan chop etishga
//                 qabul qilinganligini tasdiqlovchi sertifikat. Bizning
//                 nashrlarimiz Rossiya Federatsiyasidagi noshirlik faoliyati
//                 bo'yicha davlat standartlari talablariga muvofiq
//                 rasmiylashtiriladi. Nashrlarning, shu jumladan, tibbiyot
//                 sohasida elektron nashr etish tizimi o'zini to'liq oqlaydi, bu
//                 uning har tomonlama rivojlanishini isbotlaydi.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* genmaqola */}
//       <div className="gernMaqola">
//         <div className="container">
//           <div className="col-lg-12">
//             <p>Jurnalning yangi soni 11.09.2020 da saytda e’lon qilinadi</p>
//             <h3>
//               “Tibbiyot va farmakologiya” ilmiy jurnaliga maqolalar 01.09.2020
//               gacha qabul qilinadi.
//             </h3>
//             <button className="btn btn-dark">Maqola Yuborish</button>
//           </div>
//         </div>
//       </div>

//       <div className="jurnalArxiv">
//         <div className="container">
//           <div className="col-md-12">
//             <div>
//               <ul className="nav nav-pills" role="tablist">
//                 <li className="nav-item p-0">
//                   <a
//                     className="nav-link active navLincks"
//                     data-toggle="pill"
//                     href="#home"
//                   >
//                     JURNAL ARXIVI
//                   </a>
//                 </li>
//                 <li className="nav-item p-0">
//                   <a
//                     className="nav-link navLincks"
//                     data-toggle="pill"
//                     href="#menu1"
//                   >
//                     Nazorat muddati
//                   </a>
//                 </li>
//                 <li className="nav-item p-0">
//                   <a
//                     className="nav-link navLincks"
//                     data-toggle="pill"
//                     href="#menu2"
//                   >
//                     JURNAL BO’LIMLARI
//                   </a>
//                 </li>
//                 <li className="nav-item p-0">
//                   <a
//                     className="nav-link navLincks"
//                     data-toggle="pill"
//                     href="#menu3"
//                   >
//                     Ko'rib chiqish tartibi
//                   </a>
//                 </li>
//                 <li className="nav-item p-0">
//                   <a
//                     className="nav-link navLincks"
//                     data-toggle="pill"
//                     href="#menu4"
//                   >
//                     Nashr shartlari
//                   </a>
//                 </li>
//               </ul>

//               <div className="tab-content numberss">
//                 <div id="home" className="container p-0 tab-pane active jurnal">
//                   <h3>Jurnal arxivi</h3>

//                   <div className="ichmaich">
//                     <ul className="nav nav-pills">
//                       <li className="nav-item">
//                         <a
//                           className="nav-link active"
//                           data-toggle="pill"
//                           href="#num1"
//                         >
//                           2022
//                         </a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link" data-toggle="pill" href="#num2">
//                           2021
//                         </a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link" data-toggle="pill" href="#num3">
//                           2020
//                         </a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link" data-toggle="pill" href="#num4">
//                           2019
//                         </a>
//                       </li>
//                     </ul>

//                     <div className="tab-content">
//                       <div className="tab-pane p-0 container active" id="num1">
//                         <div className="row mr-0 ml-0 p-0">
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="tab-pane container fade" id="num2">
//                         <div className="row mr-0 ml-0 p-0">
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="tab-pane container fade" id="num3">
//                         <div className="row mr-0 ml-0 p-0">
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>

//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="tab-pane container fade" id="num4">
//                         <div className="row mr-0 ml-0 p-0">
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>

//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                           <div className="col-lg-3">
//                             <img src={img} alt="" />
//                             <h5>
//                               №9(71) <span className="text-muted">/2020</span>{" "}
//                             </h5>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* nazoratMudat */}
//                 <div
//                   id="menu1"
//                   className="container p-0 tab-pane fade nazoratMudat"
//                 >
//                   <h3>Nazorat muddati</h3>
//                   <div className="row w-100 ml-0 mr-0">
//                     <div className="col-lg-4 pl-0">
//                       <img
//                         src={img}
//                         style={({ width: "360px" }, { height: "460px" })}
//                         alt=""
//                       />
//                     </div>
//                     <div className="col-lg-8 pr-0 pl-5">
//                       <ul className="list-group list-group-flush">
//                         <hr />
//                         <li className="list-group-item d-flex justify-content-between align-items-center">
//                           Jurnalning yangi soni raqami
//                           <span>12</span>
//                         </li>
//                         <li className="list-group-item d-flex justify-content-between align-items-center">
//                           Nashrga maqolalar qabul qilish
//                           <span>50</span>
//                         </li>
//                         <li className="list-group-item d-flex justify-content-between align-items-center">
//                           Saytda chop etish
//                           <span>99</span>
//                         </li>
//                         <li className="list-group-item d-flex justify-content-between align-items-center">
//                           Bosma jurnal va maqolalarni yuborish
//                           <span>99</span>
//                         </li>
//                         <li className="list-group-item d-flex justify-content-between align-items-center">
//                           Maqolani ko'rib chiqish
//                           <span>99</span>
//                         </li>
//                         <li className="list-group-item d-flex justify-content-between align-items-center">
//                           Отправка статей в базы цитируемости*
//                           <span>99</span>
//                         </li>

//                         <li className="list-group-item">
//                           <p className="text-muted">
//                             * Примерный срок появления статей в базах
//                             цитируемости – 2-3 недели.
//                           </p>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 {/* jurnalBolim */}
//                 <div
//                   id="menu2"
//                   className="container p-0 tab-pane fade jurnalBolim"
//                 >
//                   <h3>Jurnal bo’limlari</h3>
//                   <h6>Klinik tibbiyot</h6>
//                   <p>
//                     01. Akusherlik va ginekologiya <br />
//                     02. Endokrinologiya. <br />
//                     03. Quloq, tomoq va burun kasalliklari. <br />
//                     04. Ichki kasalliklar. <br />
//                     05. Kardiologiya. <br />
//                     06. Psixiatriya. <br />
//                     07. Ko'z kasalliklari. <br />
//                     08. Pediatriya. <br />
//                     09. Yuqumli kasalliklar. <br />
//                     10. Teri va jinsiy yo'l bilan o'tadigan kasalliklar. <br />
//                     11. Asab kasalliklari. <br />
//                     12. Onkologiya. <br />
//                     13. Radiatsiya tashxis, radiatsiya davolash. <br />
//                     14. Stomatologiya. <br />
//                     15. Travmatologiya va ortopediya. <br />
//                     16. Ftiziatriya. <br />
//                     17. Jarrohlik. <br />
//                     18. Neyroxirurgiya. <br />
//                     19. Bolalar xirurgiyasi. <br />
//                     20. Anesteziologiya va reanimatologiya. <br />
//                     21. Gematologiya va qon quyish. <br />
//                     22. Romatologiya. <br />
//                     23. Urologiya. <br />
//                     24. Transplantologiya va sun'iy organlar. <br />
//                     25. Pulmonologiya. <br />
//                     26. Yurak-qon tomir jarrohligi. <br />
//                     27. Narkologiya. <br />
//                     28. Gastroenterologiya. <br />
//                     29. Nefrologiya. <br />
//                     30. Gerontologiya va geratika. <br />
//                   </p>

//                   <h6 className="pt-5">Profilaktik tibbiyot</h6>
//                   <p>
//                     31. Gigiena. <br />
//                     32. Epidemiologiya. <br />
//                     33. Sog'liqni saqlash va sog'liqni saqlash. <br />
//                     34. Mehnat tibbiyoti. <br />
//                     35. Tibbiyot sotsiologiyasi. <br />
//                     36. Tibbiy-ijtimoiy ekspertiza va tibbiy-ijtimoiy
//                     reabilitatsiya. <br />
//                   </p>
//                 </div>

//                 <div
//                   id="menu3"
//                   className="container p-0 tab-pane fade koribChiqish"
//                 >
//                   <h3>Ko’rib chiqish tartibi</h3>
//                   <p>
//                     Barcha maqolalar plagiat uchun tekshiriladi( originallik
//                     kamida 80% bo'lishi kerak), tahririyat kengashi a'zolari
//                     yoki tashqi sharhlovchilar, tegishli mutaxassislik bo'yicha
//                     nomzodlar yoki fan doktorlari tomonidan ko'rib chiqiladi,
//                     tuzatuvchi adabiy muharrir tomonidan tahrir qilinadi. Barcha
//                     tahrirlar maqola muallifi bilan kelishilgan. <br />
//                     1. Maqola qabul qilingach, tahririyat hay'ati kotibi
//                     maqolaning jurnal profiliga, ro'yxatga olish talablariga
//                     muvofiqligini belgilaydi va maqolani tahririyat kengashi
//                     a'zolaridan biriga yoki tashqi sharhlovchi — mutaxassisga,
//                     maqola mavzusiga eng yaqin ilmiy ixtisoslikka ega bo'lgan
//                     doktor yoki fan nomzodiga sharhlashga yuboradi.
//                     <br />
//                     2. Maqolani ko'rib chiqish muddati-10 kun.
//                     <br />
//                     3. Tahririyat kengashi a'zosi yoki tashqi sharhlovchining
//                     sharhida quyidagi savollar keltirilgan:
//                     <br />
//                     a) maqolaning mazmuni sarlavha ostida e'lon qilingan mavzuga
//                     mos keladimi;
//                     <br />
//                     b) maqola tibbiyot va farmakologiya sohasidagi zamonaviy
//                     yutuqlarga qanchalik mos keladi;
//                     <br />
//                     c) maqola materialining til, uslub, materialning joylashuvi,
//                     jadvallar, diagrammalar, chizmalar va formulalar nuqtai
//                     nazaridan o'quvchilarga mavjudligi;
//                     <br />
//                     d) maqola materiallarining yangiligi hisobga olingan holda
//                     maqola chop etilishi maqsadga muvofiqmi;
//                     <br />
//                     e) maqolaning muallifiga qanday kamchiliklar, tuzatishlar va
//                     qo'shimchalar kiritilishi kerak;
//                     <br />
//                     f) sharhlovchi tomonidan belgilangan kamchiliklarni
//                     tuzatishni hisobga olgan holda tavsiya etiladi yoki
//                     "Universum: tibbiyot va farmakologiya"jurnalida chop
//                     etiladigan maqola tavsiya etilmaydi.
//                     <br />
//                     4. Tahririyat kengashi a'zolari tomonidan amalga oshirilgan
//                     barcha sharhlar nashriyot tomonidan tasdiqlanadi , tashqi
//                     sharhlovchilar tomonidan ko'rib chiqiladi-sharhlovchi
//                     ishlaydigan muassasada belgilangan tartibda tasdiqlanadi.
//                     <br />
//                     5. Barcha sharhlar 5 yil davomida nashriyotda saqlanadi.
//                     Tadqiqotlarning nusxalari tegishli so'rovni qabul qilishda
//                     Rossiya federatsiyasi ta'lim va fan vazirligiga yuborilishi
//                     mumkin.
//                     <br />
//                     6. Agar sharhda maqolani tuzatish va takomillashtirish
//                     bo'yicha tavsiyalar mavjud bo'lsa, "Universum: tibbiyot va
//                     farmakologiya" jurnalining tahririyat kengashi kotibi
//                     muallifga sharhlovchining so'zlarini maqolaning yangi
//                     versiyasini tayyorlashda yoki ularni (qisman yoki to'liq)
//                     rad etishda ularni hisobga olish taklifi bilan yuboradi.
//                     Muallif tomonidan ishlab chiqilgan (qayta ishlangan) maqola
//                     qayta ko'rib chiqishga yuboriladi.
//                     <br />
//                     7. Sharhlovchi tomonidan nashrga tavsiya etilmagan maqola
//                     qayta ko'rib chiqishga qabul qilinmaydi. Salbiy xulosa matni
//                     muallifga elektron pochta orqali yuboriladi.
//                     <br />
//                     8. "Universum: tibbiyot va farmakologiya" jurnalining
//                     tahririyat kengashi tomonidan maqolani nashr etishga ruxsat
//                     berish to'g'risidagi qaror qabul qilingandan so'ng muallif
//                     nashriyot xarajatlarini qoplaydigan nashr uchun haq
//                     to'laydi. Muallif elektron pochta orqali to'lovni qabul
//                     qilish, shuningdek, nashr etish muddati haqida ma'lumot
//                     beradi.
//                     <br />
//                   </p>
//                 </div>

//                 <div id="menu4" className="container tab-pane fade nashirShart">
//                   <h3>Nashr shartlari</h3>
//                   <p>
//                     1. Ushbu maqola ilgari nashr qilinmagan va boshqa jurnalda
//                     ko'rib chiqish va chop etish uchun taqdim etilmagan. <br />
//                     2. Nashrga kamida 5 bet matnli maqolalar qabul qilinadi.{" "}
//                     <br />
//                     3. Matn, formulalar va jadvallarni yozish uchun Windows
//                     uchun Microsoft Word muharriri ishlatilishi kerak. Matn
//                     yozishdan oldin quyidagi matn muharriri parametrlarini
//                     sozlang: sahifa formati:A4( 210x297 mm), 2 sm gacha bo'lgan
//                     joylar; Times New Roman shrifti, o'lchami 14; satr oralig'i
//                     – 1,5; kenglik bo'yicha hizalama; 1 sm xatboshi; varaqning
//                     yo'nalishi – kitob. Maqolada ishlatiladigan tasvirlar format
//                     bo'lishi kerak: jpg, gif, bmp, MS Wordda yaratilgan
//                     tasvirlar qabul qilinmaydi. Barcha chizmalar va jadvallar
//                     raqamlangan bo'lishi kerak va nomlar yoki chizilgan imzolar
//                     bilan jihozlangan bo'lishi kerak va matn mazmunida
//                     (hujjatning oxirida emas) talab qilinadigan matnda
//                     joylashgan bo'lishi kerak. <br />
//                     4. Sarlavha rus tilida: (kichik, qalin harflar bilan,
//                     satrning markazida hizalanish) maqolaning nomi; keyingi
//                     satrda (shrift qalin kursiv, o'ng tomondagi hizalama) –
//                     maqolaning muallifi to'liq nomi; keyingi satrda (kursiv
//                     shrift, o'ng tomondagi hizalama) – ilmiy daraja, ilmiy
//                     unvon, lavozim, universitet nomi, mamlakat, shahar; keyingi
//                     qatorda (kursiv shrifti, o'ng tomondagi hizalama) –
//                     kontaktlar uchun elektron pochta. Agar bir nechta maqola
//                     muallifi bo'lsa, unda har bir muallif uchun ma'lumot
//                     takrorlanadi. <br />
//                     5. Ingliz tilida sarlavha, ism va lavozimni ro'yxatdan
//                     o'tkazish: 4-banddan olingan ma'lumotlar. ingliz tilida
//                     takrorlanadi. <br />
//                     6. 1 liniyasi orqali-annotatsiya rus va ingliz tillarida.{" "}
//                     <br />
//                     7. Kalit so'zlar (rus va ingliz tillarida berilgan)
//                     bir-biridan vergul bilan ajralib turadi. <br />
//                     8. 1 liniyasi orqali-maqola matni. <br />
//                     9. 1 satr orqali - "adabiyotlar ro'yxati"yozuvi. Shundan
//                     so'ng, GOST r 7.0.5 – 2008 ga muvofiq ishlab chiqilgan
//                     raqamlash bilan alifbo tartibida adabiyotlar ro'yxati
//                     berilgan. Adabiyot ro'yxatidan tegishli manbaga matndagi
//                     ishoratlar kvadrat qavs ichida amalga oshiriladi, masalan:
//                     [1, p. 277]. Avtomatik sahifa havolalaridan foydalanishga
//                     yo'l qo'yilmaydi. <br />
//                   </p>

//                   <div className="row mr-0 ml-0">
//                     <div className="col-lg-3 pl-0">
//                       <h3>Narxlar</h3>
//                     </div>
//                     <div className="col-lg-9 pr-0">
//                       <ul class="list-group list-group-flush">
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Maqola nashr qilish
//                           <span>150 000 so’m</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Bosma jurnal (nusxasi uchun)
//                           <span>120 000 so’m</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Chop etilgan bosma (nusxasi uchun)
//                           <span>135 000 so’m</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Maqolani nashrga qabul qilish to'g'risidagi elektron
//                           ma'lumotnoma
//                           <span>BEPUL</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Bosma jurnalni yetkazib berish xizmati (Toshkent
//                           shahar)
//                           <span>30 000 so’m</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Bosma jurnalni yetkazib berish xizmati (O’zbekiston
//                           Respublikasi)
//                           <span>80 000 so’m</span>
//                         </li>
//                         <li class="list-group-item disable">
//                           Qo'shimcha xizmatlar narxi:
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Matnni tuzatish
//                           <span>6 000 so’m / 1 sahifasi</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Matnni tahrir qilish
//                           <span>12 000 so’m / 1 sahifasi</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Adabiyotlar ro'yxatini tahrirlash
//                           <span>12 000 so’m / 1 sahifasi</span>
//                         </li>
//                         <li class="list-group-item d-flex justify-content-between align-items-center">
//                           Maqolaning nomi, muallifning ismi, regaliy, ish joyi,
//                           annotatsiya <br />
//                           <span>60 so’m / (+ probel).</span>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Foooter />
//     </>
//   );
// };

// export default Home2;
