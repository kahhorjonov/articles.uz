import UserPage from "views/User.js";
import ArticleForm from "components/common/articleForm";
import BarchaMaqolalarim from "components/UI/barchaMaqolalarim.jsx";
import MagazineInfo from "components/UI/magazineInfo";
import ReviewerArchive from "components/UI/reviewerArchive";
import ArticleEdit from "views/articleEdit";
import UserMagazines from "components/UI/userMagazines";
import ru from "translations/ru";

var UserRoutes = [
  {
    path: "/userMagazines",
    name:
      localStorage.getItem("lang") === "ru" ? ru.nav_jurnallar : "Jurnallar",
    icon: "nc-icon nc-paper",
    component: UserMagazines,
    layout: "/user",
    visible: true,
  },

  {
    path: "/magazineInformation/:id",
    name: "Magazine Info",
    icon: "nc-icon nc-map-big",
    component: MagazineInfo,
    layout: "/user",
    visible: false,
  },

  // {
  //   path: "/release/:id",
  //   name: "Magazine Releases",
  //   icon: "nc-icon nc-map-big",
  //   component: UserReleases,
  //   layout: "/user",
  //   visible: false,
  // },

  {
    path: "/release/:id",
    name: "Magazine Releases",
    icon: "nc-icon nc-map-big",
    component: ReviewerArchive,
    layout: "/user",
    visible: false,
  },

  {
    path: "/articleEdit/:id",
    name: "Edit Article",
    icon: "nc-icon nc-map-big",
    component: ArticleEdit,
    layout: "/user",
    visible: false,
  },

  {
    path: "/userArchive/:id",
    name: "Magazine's Archive",
    icon: "nc-icon nc-map-big",
    component: ReviewerArchive,
    layout: "/user",
    visible: false,
  },

  {
    path: "/uploadArticle",
    name: localStorage.getItem("lang") ? ru.nav_yuklash : "Maqola Yuklash",
    icon: "nc-icon nc-cloud-upload-94",
    component: ArticleForm,
    layout: "/user",
    visible: true,
  },

  {
    path: "/allArticles",
    name: localStorage.getItem("lang")
      ? ru.allMyArticles
      : "Barcha maqolalarim",
    icon: "nc-icon nc-briefcase-24",
    component: BarchaMaqolalarim,
    layout: "/user",
    visible: true,
  },

  {
    path: "/user-page",
    name: localStorage.getItem("lang") === "ru" ? ru.sidebar_profile : "Profil",
    icon: "nc-icon nc-settings-gear-65",
    component: UserPage,
    layout: "/user",
    visible: true,
  },

  {
    path: "/logout",
    name: localStorage.getItem("lang") === "ru" ? ru.sidebar_exit : "Chiqish",
    icon: "nc-icon nc-button-power",
    component: "",
    layout: "",
    visible: true,
  },
];

export default UserRoutes;
