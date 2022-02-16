import Dashboard from "./views/Dashboard.js";
// import Notifications from "views/Notifications.js";
import Icons from "./views/Icons.js";
// import Typography from "views/Typography.js";
import TableList from "./views/Tables.js";
// import Maps from "views/Map.js";
import UserPage from "./views/User.js";
import Articles from "./views/articles";
import ArticleActivation from "./routes/articleActivation";
import MyTasks from "./routes/MyTasks";
import Users from "./routes/users";
import UserEdit from "./views/userEdit";
import ArticleInfo from "./views/articleInfo";

var adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/activationArticles",
    name: "Maqolalarni aktivlashtirish",
    icon: "nc-icon nc-book-bookmark",
    component: ArticleActivation,
    layout: "/admin",
  },

  {
    path: "/articles",
    name: "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/admin",
  },

  {
    path: "/myTasks",
    name: "Mening vazifalarim",
    icon: "nc-icon nc-briefcase-24",
    component: MyTasks,
    layout: "/admin",
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
  },

  {
    path: "/userEdit",
    name: "Foydalanuvchi",
    icon: "nc-icon nc-single-02",
    component: UserEdit,
    layout: "/admin",
  },

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },

  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notification,
  //   layout: "/admin",
  // },

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },

  {
    path: "/articleInfo",
    name: "Article Info",
    icon: "nc-icon nc-single-copy-04",
    component: ArticleInfo,
    layout: "/admin",
  },

  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },

  {
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: TableList,
    layout: "",
  },
];

export default adminRoutes;
