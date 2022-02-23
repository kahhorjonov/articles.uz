// import React from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";

// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Container,
//   InputGroup,
//   InputGroupText,
//   Input,
// } from "reactstrap";

// import HomeRoutes from "homeRoutes";

// function Header(props) {
//   return (
//     <>
//       <div className="container home_pages p-0">
//         <div className="col-md-12 rel"></div>
//         <nav className="navbar navbar-expand-md mb-0">
//           <NavLink className="navbar-brand brands" to="/">
//             <h1 className="text-dark mb-0">ARTICLES.UZ</h1>
//           </NavLink>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#collapsibleNavbar"
//           >
//             <i className="nc-icon nc-bullet-list-67" />
//           </button>

//           <div className="collapse navbar-collapse" id="collapsibleNavbar">
//             <ul className="navbar-nav">
//               {HomeRoutes.map((route, key) => {
//                 return (
//                   <li key={key} className="nav-item itemss ">
//                     <NavLink className="nav-link links" to={route.path}>
//                       {route.name}
//                     </NavLink>
//                   </li>
//                 );
//               })}

//               <li className="nav-item">
//                 <Link
//                   to="/login"
//                   // onClick={() => {
//                   //   window.location = "/login";
//                   // }}
//                 >
//                   <button className="btn border btn-light buttons">
//                     Tizimga kirish
//                   </button>
//                 </Link>
//               </li>

//               <li className="nav-item ">
//                 <div className="d-flex pos">
//                   <div>
//                     <span className="text-muted pl-2">
//                       ost.info10@gmail.com
//                     </span>
//                   </div>
//                   <div className="ml-4">
//                     <span className="text-muted pl-2">(71) 224-20-30</span>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <hr className="hrr" />
//       </div>
//     </>
//   );
// }

// export default Header;
