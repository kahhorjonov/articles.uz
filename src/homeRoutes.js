import Asosiy from "components/UI/asosiy";
import JurnallarRoyxati from "components/UI/jurnallarRo'yhati";
import NashrShartlari from "components/UI/nashrShartlari";
import LoginForm from "./components/loginForm";
import Aloqa from "./components/UI/aloqa";

var HomeRoutes = [
  {
    path: "/main",
    name: "Asosiy",
    icon: "nc-icon nc-bank",
    component: Asosiy,
    layout: "/",
  },

  {
    path: "/listOfMagazines",
    name: "Jurnallar Ro'yhati",
    icon: "nc-icon nc-bank",
    component: JurnallarRoyxati,
    layout: "/",
  },

  {
    path: "/login",
    name: "Maqola yuborish",
    icon: "nc-icon nc-bank",
    component: JurnallarRoyxati,
    layout: "/",
  },

  {
    path: "/termsOfPublication",
    name: "Nashr Shartlari",
    icon: "nc-icon nc-bank",
    component: NashrShartlari,
    layout: "/",
  },

  {
    path: "/contact",
    name: "Aloqa",
    icon: "nc-icon nc-bank",
    component: Aloqa,
    layout: "/",
  },
];

export default HomeRoutes;