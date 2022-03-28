import jwtDecode from "jwt-decode";
import http from "./httpService";
import api from "../utils/config.json";
import axios from "axios";
import { toast } from "react-toastify";

const { apiLocal } = api;

const tokenKey = "token";

const apiEndpoint = apiLocal + "/user/login";
const token = localStorage.getItem("token");

http.setJwt(getJwt());

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export async function login(phoneNumber, password) {
  const { data: jwt } = await http.post(apiEndpoint, { phoneNumber, password });
  const parsedJwt = parseJwt(jwt);

  if (jwt) {
    if (parsedJwt.exp * 1000 < Date.now()) {
      return;
    } else {
      localStorage.setItem(tokenKey, jwt);
    }
  }
}

export function loginWithJwt(jwt) {
  const parsedJwt = parseJwt(localStorage.getItem("token"));

  if (parsedJwt && parsedJwt.exp * 1000 < Date.now()) {
    return toast.info("Profilga qaytadan kiring");
  } else {
    localStorage.setItem(tokenKey, jwt);
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const parsedJwt = parseJwt(localStorage.getItem("token"));
    if (parsedJwt && parsedJwt.exp * 1000 < Date.now()) {
      toast.info("Foydalanish vaqti tugadi");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location = "/";
      }, 2500);
    } else {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    }
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
    return toast.error(ex.response.data.message);
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
