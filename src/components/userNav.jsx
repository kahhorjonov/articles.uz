// import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faImage,
//   faKey,
//   faBookmark,
//   faUpload,
//   faDoorOpen,
// } from "@fortawesome/free-solid-svg-icons";
// import img from "../routes/img.png";

// import "../styles/userPageStyles.css";

// class UserNav extends Component {
//   render() {
//     return (
//       // <div className="col-md-4">
//       <div className="user__card col-md-4">
//         <div className="user__card__name">
//           <h3 className="user__card__name--name">
//             {this.props.user
//               ? `${this.props.user.firstName} ${this.props.user.lastName}`
//               : ""}
//           </h3>
//           <div className="user__card__name--line" />
//           <FontAwesomeIcon className="no--margin" icon={faBookmark} />
//           <hr />
//         </div>
//         <div className="user__card__image">
//           <img className="user__card__image--img" src={img} alt="user image" />
//         </div>
//         <div className="user__card__actions">
//           <NavLink className="nav-item nav-link" to="/user/my-profile">
//             <FontAwesomeIcon icon={faUser} style={{ fontSize: "2rem" }} />
//             &nbsp; Mening Profilim
//           </NavLink>

//           <hr />

//           <NavLink className="nav-item nav-link" to="/user/articleForm">
//             <FontAwesomeIcon icon={faUpload} style={{ fontSize: "2rem" }} />{" "}
//             &nbsp; Maqola yuklash
//           </NavLink>

//           <hr />

//           <NavLink className="nav-item nav-link" to="/user/changeImage">
//             <FontAwesomeIcon icon={faImage} style={{ fontSize: "2rem" }} />
//             &nbsp; Rasmni o'zgartirish
//           </NavLink>

//           <hr />

//           <NavLink className="nav-item nav-link" to="/user/changePassword">
//             <FontAwesomeIcon icon={faKey} style={{ fontSize: "2rem" }} />
//             &nbsp; Parolni o'zgartirish
//           </NavLink>

//           <hr />

//           <NavLink className="nav-item nav-link" to="/logout">
//             <FontAwesomeIcon icon={faDoorOpen} style={{ fontSize: "2rem" }} />
//             &nbsp; Profildan chiqish
//           </NavLink>
//         </div>
//       </div>
//       // </div>
//     );
//   }
// }

// export default UserNav;
