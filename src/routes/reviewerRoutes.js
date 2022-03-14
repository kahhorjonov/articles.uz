import UserPage from "views/User.js";
import Articles from "views/articles";
import MyTasks from "views/MyTasks";
import Logout from "components/logout";
import Jurnallar from "components/UI/jurnallar";
import MagazineInfo from "components/UI/magazineInfo";
import ReviewerArchive from "components/UI/reviewerArchive";

var reviewerRoutes = [
  {
    path: "/reviewerMagazines",
    name: "Jurnallar",
    icon: "nc-icon nc-map-big",
    component: Jurnallar,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/magazineInformation",
    name: "Archive",
    icon: "nc-icon nc-map-big",
    component: MagazineInfo,
    layout: "/reviewer",
    visible: false,
  },

  {
    path: "/reviewerArchive",
    name: "Archive",
    icon: "nc-icon nc-map-big",
    component: ReviewerArchive,
    layout: "/reviewer",
    visible: false,
  },

  {
    path: "/articles",
    name: "Maqolalar",
    icon: "nc-icon nc-bookmark-2",
    component: Articles,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/myTasks",
    name: "Mening vazifalarim",
    icon: "nc-icon nc-briefcase-24",
    component: MyTasks,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-settings-gear-65",
    component: UserPage,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/logout",
    name: "Profildan chiqish",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "",
    visible: true,
  },
];

export default reviewerRoutes;
