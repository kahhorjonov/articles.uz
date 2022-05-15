import Asosiy from "components/UI/asosiy";
import JurnallarRoyxati from "components/UI/jurnallarRo'yhati";
import NashrShartlari from "components/UI/nashrShartlari";
import Aloqa from "./components/UI/aloqa";
import ru from "translations/ru";

var HomeRoutes = [
  {
    path: "/main",
    name: localStorage.getItem("lang") === "ru" ? ru.nav_asosiy : "Asosiy",
    icon: "nc-icon nc-bank",
    component: Asosiy,
    layout: "/",
    visible: true,
  },

  {
    path: "/listOfMagazines",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.nav_jurnallar
        : "Jurnallar Ro'yhati",
    icon: "nc-icon nc-bank",
    component: JurnallarRoyxati,
    layout: "/",
    visible: true,
  },

  {
    path: "/login",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.nav_yuklash
        : "Maqola yuborish",
    icon: "nc-icon nc-bank",
    component: JurnallarRoyxati,
    layout: "/",
    visible: true,
  },

  {
    path: "/termsOfPublication",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.nav_shartlar
        : "Nashr Shartlari",
    icon: "nc-icon nc-bank",
    component: NashrShartlari,
    layout: "/",
    visible: true,
  },

  {
    path: "/contact",
    name: localStorage.getItem("lang") === "ru" ? ru.nav_aloqa : "Aloqa",
    icon: "nc-icon nc-bank",
    component: Aloqa,
    layout: "/",
    visible: true,
  },
];

export default HomeRoutes;
