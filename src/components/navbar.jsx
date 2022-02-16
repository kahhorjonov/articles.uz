// import React from "react";
// import { NavLink, Redirect } from "react-router-dom";
// import "../styles/navbar.css";
// import image from "./profile.png";
// import { getRoleNameFromJWT } from "../services/getRoleName";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faGlobeAmericas,
//   faLaptop,
//   faLockOpen,
//   faPencilAlt,
//   faShareAlt,
//   faTasks,
//   faEnvelope,
//   faDoorOpen,
// } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   return (
//     <>
//       {getRoleNameFromJWT() === "ROLE_ADMINISTRATOR" ? (
//         <div className="container-fluid d-flex p-0">
//           <div className="col-md-2 box1 ">
//             <nav className="navigation ">
//               <div className="navigation__navbar">
//                 <img
//                   className="navigation__navbar--image"
//                   src={image}
//                   alt="Profile Image"
//                 />
//                 <p className="navbar__user--name">John Smith</p>
//               </div>
//               <div className="navbar__routes">
//                 <NavLink
//                   className="nav-item text-white  nav-link"
//                   to="/admin/dynamicPages"
//                 >
//                   <FontAwesomeIcon
//                     icon={faGlobeAmericas}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Dinamik Sahifalar
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white  nav-link"
//                   to="/admin/media"
//                 >
//                   <FontAwesomeIcon
//                     icon={faLaptop}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Media
//                 </NavLink>
//                 <NavLink
//                   className="nav-item text-white d-flex align-content-center nav-link"
//                   to="/admin/articleActivation"
//                 >
//                   <FontAwesomeIcon
//                     className="qulf"
//                     icon={faLockOpen}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   <p>
//                     Maqolalarni aktivlashtirish
//                     {/* <span class="badge badge1 badge-danger">9</span> */}
//                   </p>
//                 </NavLink>
//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/admin/articles"
//                 >
//                   <FontAwesomeIcon
//                     icon={faPencilAlt}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Maqolalar
//                 </NavLink>
//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/admin/divisions"
//                 >
//                   <FontAwesomeIcon
//                     icon={faShareAlt}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Taqsimlanishlar
//                 </NavLink>
//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/admin/myTasks"
//                 >
//                   <FontAwesomeIcon
//                     icon={faTasks}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Mening vazifalarim
//                 </NavLink>
//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/admin/messages"
//                 >
//                   <FontAwesomeIcon
//                     icon={faEnvelope}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Xabarlar
//                 </NavLink>
//                 <NavLink
//                   className="nav-item text-white d-flex  nav-link"
//                   to="/admin/users"
//                 >
//                   <FontAwesomeIcon
//                     icon={faUser}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   <p>Foydalanuvchilar </p>
//                   {/* <span class="badge ml-3 badge2 ml-3 badge-danger">19</span> */}
//                 </NavLink>

//                 <NavLink className="nav-item text-white nav-link" to="/logout">
//                   <FontAwesomeIcon
//                     icon={faDoorOpen}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Profildan chiqish
//                 </NavLink>
//               </div>
//             </nav>
//           </div>
//         </div>
//       ) : getRoleNameFromJWT() === "ROLE_REDACTOR" ? (
//         <div className="container-fluid  d-flex p-0">
//           <div className="col-md-2 box1 ">
//             <nav className="navigation ">
//               <div className="navigation__navbar">
//                 <img
//                   className="navigation__navbar--image"
//                   src={image}
//                   alt="Profile Image"
//                 />
//                 <p className="navbar__user--name">John Smith</p>
//               </div>
//               <div className="navbar__routes">
//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reductor/articles"
//                 >
//                   <FontAwesomeIcon
//                     icon={faPencilAlt}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Maqolalar
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reductor/myTasks"
//                 >
//                   <FontAwesomeIcon
//                     icon={faTasks}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Mening vazifalarim
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reductor/messages"
//                 >
//                   <FontAwesomeIcon
//                     icon={faEnvelope}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Xabarlar
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reductor/users"
//                 >
//                   <FontAwesomeIcon
//                     icon={faUser}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Foydalanuvchilar
//                 </NavLink>

//                 <NavLink className="nav-item text-white nav-link" to="/logout">
//                   <FontAwesomeIcon
//                     icon={faDoorOpen}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Profildan chiqish
//                 </NavLink>
//               </div>
//             </nav>
//           </div>
//         </div>
//       ) : getRoleNameFromJWT() === "ROLE_REVIEWER" ? (
//         <div className="container-fluid  d-flex p-0">
//           <div className="col-md-2 box1 ">
//             <nav className="navigation ">
//               <div className="navigation__navbar">
//                 <img
//                   className="navigation__navbar--image"
//                   src={image}
//                   alt="Profile Image"
//                 />
//                 <p className="navbar__user--name">John Smith</p>
//               </div>
//               <div className="navbar__routes">
//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reviewer/articles"
//                 >
//                   <FontAwesomeIcon
//                     icon={faPencilAlt}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Maqolalar
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reviewer/myTasks"
//                 >
//                   <FontAwesomeIcon
//                     icon={faTasks}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Mening vazifalarim
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reviewer"
//                 >
//                   <FontAwesomeIcon
//                     icon={faEnvelope}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Xabarlar
//                 </NavLink>

//                 <NavLink
//                   className="nav-item text-white nav-link"
//                   to="/reviewer"
//                 >
//                   <FontAwesomeIcon
//                     icon={faUser}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Foydalanuvchilar
//                 </NavLink>

//                 <NavLink className="nav-item text-white nav-link" to="/logout">
//                   <FontAwesomeIcon
//                     icon={faDoorOpen}
//                     style={({ fontSize: "3rem" }, { marginRight: "1rem" })}
//                   />
//                   Profildan chiqish
//                 </NavLink>
//               </div>
//             </nav>
//           </div>
//         </div>
//       ) : (
//         <>
//           <Redirect to="/" />
//         </>
//       )}
//     </>
//   );
// };

// export default Navbar;
