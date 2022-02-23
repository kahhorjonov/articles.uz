import UserPage from "./views/User.js";
import ArticleForm from "./components/common/articleForm";


var UserRoutes = [
  {
    path: "/user-page",
    name: "Mening Profilim",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user",
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
  },

 

  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: UserPage,
    layout: "/user",
  },

  {
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: "",
    layout: "",
  },
];

export default UserRoutes;
