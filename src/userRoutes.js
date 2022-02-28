import UserPage from "./views/User.js";
import Icons from "views/Icons.js";
import ArticleForm from "./components/common/articleForm";
import Chopetilgan from "components/UI/chopetilgan.jsx";
import Chopetilganinfo from "components/UI/chopetilganInfo.jsx";
import Tekshirish from "components/UI/tekshirish.jsx";
import Chopetish from "components/UI/chopetish.jsx";
import Radetish from "components/UI/radetish.jsx";

var UserRoutes = [
  {
    path: "/myPrintedArticles",
    name: "Chop etilgan maqolalarim",
    icon: "nc-icon nc-book-bookmark",
    component: Chopetilgan,
    layout: "/user",
    visible: true,
  },

  {
    path: "/myArticlesUnderReview",
    name: "Tekshirish jarayonidagi maqolalarim",
    icon: "nc-icon nc-zoom-split",
    component: Tekshirish,
    layout: "/user",
    visible: true,
  },

  {
    path: "/allowedToPrint",
    name: "Chop etishga ruxsat berilgan maqolalarim",
    icon: "nc-icon nc-single-copy-04",
    component: Chopetish,
    layout: "/user",
    visible: true,
  },

  {
    path: "/rejectedArticles",
    name: "Rad etilgan maqolalarim",
    icon: "nc-icon nc-settings",
    component: Radetish,
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
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-bell-55",
    component: Icons,
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

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: UserPage,
  //   layout: "/user",
  //   visible: true,
  // },

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
