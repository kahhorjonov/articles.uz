import jwtDecode from "jwt-decode";
import http from "./httpService";
import api from "../utils/config.json";
import axios from "axios";

const { apiLocal } = api;

const tokenKey = "token";

const apiEndpoint = apiLocal + "/user/login";
const token = localStorage.getItem("token");

http.setJwt(getJwt());

export async function login(phoneNumber, password) {
  const { data: jwt } = await http.post(apiEndpoint, { phoneNumber, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function me() {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = axios.get(apiLocal + "/user/me", config);
    return data;
  } catch (ex) {
    return console.log("xato");
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function restorePassword(phone) {
  return http.post(apiLocal + `/user/createNewPassword/${phone}`);
}

export function changePassword(code, password) {
  return http.post(
    apiLocal + `/user/verifyCode`,
    {
      password: password,
      code: code,
    },

    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("resetToken")}`,
      },
    }
  );
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  me,
  restorePassword,
  changePassword,
};
