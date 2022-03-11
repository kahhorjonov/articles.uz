import Dashboard from "views/Dashboard.js";
// import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
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
import MagazineInfo from "./../components/UI/magazineInfo";
import Jurnallar from "components/UI/jurnallar.jsx";
import Setting from './../components/UI/setting';

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
    name: "Category",
    icon: "nc-icon nc-bullet-list-67",
    component: Category,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/adminMagazines",
    name: "Jurnallar",
    icon: "nc-icon nc-map-big",
    component: Jurnallar,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/editMagazine",
    name: "Edit Magazine",
    icon: "nc-icon nc-ruler-pencil",
    component: EditMagazine,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/createMagazine",
    name: "Create Magazine",
    icon: "nc-icon nc-box",
    component: JurnalQoshish,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/activationArticles",
    name: "Maqolalarni aktivlashtirish",
    icon: "nc-icon nc-book-bookmark",
    component: ArticleActivation,
    layout: "/admin",
    visible: true,
  },

  {
    path: "/articles",
    name: "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/admin",
    visible: true,
  },

  // {
  //   path: "/messages",
  //   name: "Xabarlar",
  //   icon: "nc-icon nc-chat-33",
  //   component: Dashboard,
  //   layout: "/admin",
  // },

  {
    path: "/users",
    name: "Foydalanuvchilar",
    icon: "nc-icon nc-single-02",
    component: Users,
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
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notification,
  //   layout: "/admin",
  // },

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
    name: "User Profile",
    icon: "nc-icon nc-single-02",
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
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "",
    visible: true,
  },

  {
    path: "/setting",
    name: "Setting",
    icon: "nc-icon nc-settings-gear-65",
    component: Setting,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/magazineInfo",
    name: "magazineInfo",
    icon: "nc-icon nc-button-power",
    component: MagazineInfo,
    layout: "/admin",
    visible: false,
  },
];

export default adminRoutes;
