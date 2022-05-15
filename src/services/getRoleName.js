import jwtDecode from "jwt-decode";

export const getRoleNameFromJWT = () => {
  if (localStorage.getItem("token")) {
    const parsedToken = jwtDecode(localStorage.getItem("token"));
    return parsedToken.roles[0].roleName;
  } else {
    return "";
  }
};
