import Dashboard from "./views/Dashboard.js";
// import Notifications from "views/Notifications.js";
import Icons from "./views/Icons.js";
import TableList from "./views/Tables.js";
import UserPage from "./views/User.js";
import Articles from "./views/articles";
import MyTasks from "./routes/MyTasks";

var reductorRoutes = [
  {
    path: "/articles",
    name: "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/reductor",
  },

  {
    path: "/myTasks",
    name: "Mening vazifalarim",
    icon: "nc-icon nc-briefcase-24",
    component: MyTasks,
    layout: "/reductor",
  },
  {
    path: "/messages",
    name: "Xabarlar",
    icon: "nc-icon nc-chat-33",
    component: Dashboard,
    layout: "/reductor",
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Articles,
    layout: "/reductor",
  },

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/reductor",
  },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/reductor",
  // },
  {
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: TableList,
    layout: "",
  },
];

export default reductorRoutes;
