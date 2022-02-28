import UserPage from "./views/User.js";
import ArticleForm from "./components/common/articleForm";
import Chopetilgan from "components/UI/chopetilgan.jsx";
import Chopetilganinfo from "components/UI/chopetilganInfo.jsx";

var UserRoutes = [
  {
    path: "/myPrintedArticles",
    name: "Mening Profilim",
    icon: "nc-icon nc-single-02",
    component: Chopetilgan,
    layout: "/user",
    visible: true,
  },

  {
    path: "/user-page",
    name: "Mening Profilim",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user",
    visible: true,
  },

  //   {
  //     path: "/articles",W
  //     name: "Mening Profilim",
  //     icon: "nc-icon nc-bookmark-2",
  //     component: UserPage,
  //     layout: "/user",
  //   },

  {
    path: "/uploadArticle",
    name: "Maqola Yuklash",
    icon: "nc-icon nc-briefcase-24",
    component: ArticleForm,
    layout: "/user",
    visible: true,
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
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
