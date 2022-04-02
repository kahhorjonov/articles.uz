import UserPage from "views/User.js";
import MyTasks from "views/MyTasks";
import Logout from "components/logout";
import MagazineInfo from "components/UI/magazineInfo";
import ReviewerArchive from "components/UI/reviewerArchive";
import UserMagazines from "components/UI/userMagazines";
import ru from "translations/ru";

var reviewerRoutes = [
  {
    path: "/reviewerMagazines",
    name:
      localStorage.getItem("lang") === "ru" ? ru.nav_jurnallar : "Jurnallar",
    icon: "nc-icon nc-map-big",
    component: UserMagazines,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/magazineInformation",
    name: "MagazineInfo",
    icon: "nc-icon nc-map-big",
    component: MagazineInfo,
    layout: "/reviewer",
    visible: false,
  },

  // {
  //   path: "/release/:id",
  //   name: "Magazine Releases",
  //   icon: "nc-icon nc-map-big",
  //   component: UserReleases,
  //   layout: "/reviewer",
  //   visible: false,
  // },

  {
    path: "/release/:id",
    name: "Magazine Releases",
    icon: "nc-icon nc-map-big",
    component: ReviewerArchive,
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

  // {
  //   path: "/articles",
  //   name: "Maqolalar",
  //   icon: "nc-icon nc-bookmark-2",
  //   component: Articles,
  //   layout: "/reviewer",
  //   visible: true,
  // },

  {
    path: "/myTasks",
    name:
      localStorage.getItem("lang") === "ru" ? ru.sidebar_tasks : "Vazifalarim",
    icon: "nc-icon nc-briefcase-24",
    component: MyTasks,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/user-page",
    name: localStorage.getItem("lang") === "ru" ? ru.sidebar_profile : "Profil",
    icon: "nc-icon nc-settings-gear-65",
    component: UserPage,
    layout: "/reviewer",
    visible: true,
  },

  {
    path: "/logout",
    name: localStorage.getItem("lang") === "ru" ? ru.sidebar_exit : "Chiqish",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "",
    visible: true,
  },
];

export default reviewerRoutes;
