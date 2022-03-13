import UserPage from "views/User.js";
import Articles from "views/articles";
import MyTasks from "views/MyTasks";
import Logout from "components/logout";
import Jurnallar from "components/UI/jurnallar";
import MagazineInfoAdmin from "components/UI/magazineInfoAdmin";
import EditMagazine from "views/editMagazine";

var reductorRoutes = [
  {
    path: "/magazines",
    name: "Jurnallar",
    icon: "nc-icon nc-map-big",
    component: Jurnallar,
    layout: "/reductor",
    visible: true,
  },

  {
    path: "/editMagazine",
    name: "Edit Magazine",
    icon: "nc-icon nc-ruler-pencil",
    component: EditMagazine,
    layout: "/reductor",
    visible: false,
  },

  {
    path: "/magazineInformation",
    name: "magazineInfo",
    icon: "nc-icon nc-button-power",
    component: MagazineInfoAdmin,
    layout: "/reductor",
    visible: false,
  },

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

  // {
  //   path: "/messages",
  //   name: "Xabarlar",
  //   icon: "nc-icon nc-chat-33",
  //   component: Dashboard,
  //   layout: "/reductor",
  //   visible: true,
  // },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Articles,
  //   layout: "/reductor",
  //   visible: true,
  // },

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-settings-gear-65",
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
