import UserPage from "views/User.js";
import ArticleForm from "components/common/articleForm";
import BarchaMaqolalarim from "components/UI/barchaMaqolalarim.jsx";
import Jurnallar from "components/UI/jurnallar.jsx";
import MagazineInfo from "components/UI/magazineInfo";
import ReviewerArchive from "components/UI/reviewerArchive";
import UserReleases from "./../components/UI/userReleases";

var UserRoutes = [
  {
    path: "/userMagazines",
    name: "Jurnallar",
    icon: "nc-icon nc-paper",
    component: Jurnallar,
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

  {
    path: "/release/:id",
    name: "Magazine Releases",
    icon: "nc-icon nc-map-big",
    component: UserReleases,
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
    name: "Maqola Yuklash",
    icon: "nc-icon nc-cloud-upload-94",
    component: ArticleForm,
    layout: "/user",
    visible: true,
  },

  {
    path: "/allArticles",
    name: "Barcha maqolalarim",
    icon: "nc-icon nc-briefcase-24",
    component: BarchaMaqolalarim,
    layout: "/user",
    visible: true,
  },

  {
    path: "/user-page",
    name: "Mening Profilim",
    icon: "nc-icon nc-settings-gear-65",
    component: UserPage,
    layout: "/user",
    visible: true,
  },

  {
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: "",
    layout: "",
    visible: true,
  },
];

export default UserRoutes;
