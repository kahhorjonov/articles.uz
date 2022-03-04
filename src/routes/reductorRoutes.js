import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Articles from "views/articles";
import MyTasks from "views/MyTasks";
import Logout from "components/logout";

var reductorRoutes = [
  {
    path: "/articles",
    name: "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/reductor",
    visible: true,
  },

  {
    path: "/myTasks",
    name: "Mening vazifalarim",
    icon: "nc-icon nc-briefcase-24",
    component: MyTasks,
    layout: "/reductor",
    visible: true,
  },
  {
    path: "/messages",
    name: "Xabarlar",
    icon: "nc-icon nc-chat-33",
    component: Dashboard,
    layout: "/reductor",
    visible: true,
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Articles,
    layout: "/reductor",
    visible: true,
  },

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/reductor",
    visible: true,
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
    component: Logout,
    layout: "",
    visible: true,
  },
];

export default reductorRoutes;
