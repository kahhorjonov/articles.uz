import Dashboard from "views/Dashboard.js";
// import Icons from "views/Icons.js";
import UserPage from "views/User.js";

import EditMagazine from "./../views/editMagazine";
import Articles from "views/articles";
import ArticleActivation from "views/articleActivation";
import Users from "views/users";
import UserEdit from "views/userEdit";
import ArticleInfo from "views/articleInfo";
import JurnalQoshish from "components/UI/jurnalQoshish";
import Category from "components/UI/category";
import Logout from "components/logout.jsx";
import Jurnallar from "components/UI/jurnallar.jsx";
import MagazineInfoAdmin from "components/UI/magazineInfoAdmin";
import ChangePrices from "components/UI/changePrices";
import ReviewerActivation from "views/activationReviewers";
import ru from "translations/ru";

var adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/category",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.admin_kategoriyalar
        : "Kategoriyalar",
    icon: "nc-icon nc-bullet-list-67",
    component: Category,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/adminMagazines",
    name:
      localStorage.getItem("lang") === "ru" ? ru.nav_jurnallar : "Jurnallar",
    icon: "nc-icon nc-map-big",
    component: Jurnallar,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/editMagazine",
    name: "Jurnallarni Tahrirlash",
    icon: "nc-icon nc-ruler-pencil",
    component: EditMagazine,
    layout: "/admin",
    visible: false,
  },

  {
    path: "/createMagazine",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.jurnal_qoshish
        : "Jurnal Qo'shish",
    icon: "nc-icon nc-box",
    component: JurnalQoshish,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/activationArticles",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.jurnal_aktivlashtirish
        : "Maqolalarni aktivlashtirish",
    icon: "nc-icon nc-book-bookmark",
    component: ArticleActivation,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/articles",
    name: localStorage.getItem("lang") === "ru" ? ru.maqolalar : "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/users",
    name: localStorage.getItem("lang") === "ru" ? ru.users : "Foydalanuvchilar",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/activationReviewers",
    name:
      localStorage.getItem("lang") === "ru"
        ? ru.activation_rev
        : "Taqrizchilarni aktivlashtirish",
    icon: "nc-icon nc-circle-10",
    component: ReviewerActivation,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/userEdit",
    name: "Foydalanuvchi",
    icon: "nc-icon nc-single-02",
    component: UserEdit,
    layout: "/admin",
    visible: false,
  },

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-bell-55",
  //   component: Icons,
  //   layout: "/admin",
  //   visible: true,
  // },

  {
    path: "/user-page",
    name: localStorage.getItem("lang") === "ru" ? ru.sidebar_profile : "Profil",
    icon: "nc-icon nc-settings-gear-65",
    component: UserPage,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/articleInfo",
    name: "Article Info",
    icon: "nc-icon nc-single-copy-04",
    component: ArticleInfo,
    layout: "/admin",
    visible: false,
  },

  {
    path: "/changePrices",
    name: localStorage.getItem("lang") === "ru" ? ru.settings : "Sozlamalar",
    icon: "nc-icon nc-settings",
    component: ChangePrices,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/logout",
    name: localStorage.getItem("lang") === "ru" ? ru.sidebar_exit : "Chiqish",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "",
    visible: true,
  },

  {
    path: "/magazineInformation",
    name: "magazineInfo",
    icon: "nc-icon nc-button-power",
    component: MagazineInfoAdmin,
    layout: "/admin",
    visible: false,
  },
];

export default adminRoutes;
