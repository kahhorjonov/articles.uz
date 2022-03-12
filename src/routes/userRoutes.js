import UserPage from "views/User.js";
// import Icons from "views/Icons.js";
import ArticleForm from "components/common/articleForm";
import Chopetilganinfo from "components/UI/chopetilganInfo.jsx";
import Radetish from "components/UI/radetish.jsx";
import BarchaMaqolalarim from "components/UI/barchaMaqolalarim.jsx";
import Jurnallar from "components/UI/jurnallar.jsx";

var UserRoutes = [
  {
    path: "/jurnallar",
    name: "Jurnallar",
    icon: "nc-icon nc-cloud-upload-94",
    component: Jurnallar,
    layout: "/user",
    visible: true,
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

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-bell-55",
  //   component: Icons,
  //   layout: "/user",
  //   visible: true,
  // },

  //   {
  //     path: "/articles",W
  //     name: "Mening Profilim",
  //     icon: "nc-icon nc-bookmark-2",
  //     component: UserPage,
  //     layout: "/user",
  //   },

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
