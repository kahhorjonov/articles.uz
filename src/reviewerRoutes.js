// import Notifications from "views/Notifications.js";
import TableList from "./views/Tables.js";
import UserPage from "./views/User.js";
import Articles from "./views/articles";
import MyTasks from "./routes/MyTasks";

var reviewerRoutes = [
  {
    path: "/articles",
    name: "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/reviewer",
  },

  {
    path: "/myTasks",
    name: "Mening vazifalarim",
    icon: "nc-icon nc-briefcase-24",
    component: MyTasks,
    layout: "/reviewer",
  },
  {
    path: "/messages",
    name: "Xabarlar",
    icon: "nc-icon nc-chat-33",
    component: Articles,
    layout: "/reviewer",
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Articles,
    layout: "/reviewer",
  },

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/reviewer",
  },

  {
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: TableList,
    layout: "",
  },
];

export default reviewerRoutes;
