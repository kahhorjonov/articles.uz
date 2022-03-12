import http from "./httpService";
import api from "../utils/config.json";
import axios from "axios";

const { apiSwagger, apiLocal } = api;
// http://192.168.100.27:8080/api/user/edit/{id}

const apiEndpoint = apiLocal + "/user/register";
// const apiEndpoint = apiSwagger + "/user/register";

export function register(user, firebaseToken) {
  return http.post(apiEndpoint, {
    phoneNumber: user.phoneNumber,
    password: user.password,
    firebaseToken: firebaseToken,
    // name: user.name,
  });
}

export function getUserForEdit(userId) {
  return http.get(apiLocal + `/user/getById/${userId}`);
}

export function getStatisticsOfArticles(userId) {
  return http.get(apiLocal + `/user/statisticsArticlesForUsers/${userId}`);
}

export function searchUser(data) {
  return http.post(apiLocal + `/user/search`, {
    search: data.search,
    roles_id: data.roles_id,
    page: 0,
    size: "10",
    enabled: data.enabled,
    categoryId: data.categoryId,
  });
}

export function createUser(data) {
  return http.post(apiLocal + `/user/addEmployee`, data);
}

export function deleteUser(userId) {
  return http.delete(apiLocal + `/user/delete/${userId}`);
}

export function changeUserActivity(userId, activity) {
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    userId: userId,
    active: activity,
  };

  console.log(activity);

  return axios.post(apiLocal + "/user/acceptedUser", body, config);
}

export async function profileEdit(data) {
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    firstName: data.firstName,
    lastName: data.lastName,
    fatherName: data.fatherName,
    phoneNumber: data.phoneNumber,
    password: data.password,
    academicDegree: data.academicDegree,
    workPlace: data.workPlace,
    scientificWork: data.scientificWork,
    workExperience: data.workExperience,
    email: data.email,
    languages: data.languages,
  };

  return axios.post(apiLocal + "/user/edit", body, config);
}

export async function profileEditFromAdmin(data) {
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    userId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    fatherName: data.fatherName,
    phoneNumber: data.phoneNumber,
    password: data.password,
    academicDegree: data.academicDegree,
    workPlace: data.workPlace,
    // scientificWork: data.scientificWork,
    workExperience: data.workExperience,
    email: data.email,
    languages: data.languages,
  };

  console.log(body);

  return axios.post(apiLocal + "/user/editUserFromAdmin", body, config);
}

export async function registerReviewer(data) {
  // let files = [];

  // for (let i = 0; i < data.scientificWork.length; i++) {
  //   files.push(data.scientificWork[i]);
  // }

  console.log(data);

  const bodyFormData = new FormData();

  bodyFormData.append("firstName", data.firstName);
  bodyFormData.append("lastName", data.lastName);
  bodyFormData.append("fathersName", data.fatherName);
  bodyFormData.append("email", data.email);
  bodyFormData.append("phoneNumber", data.phoneNumber);
  bodyFormData.append("password", data.password);
  bodyFormData.append("categoryIdList", data.categoryIdList);
  bodyFormData.append("workPlace", data.workPlace);
  bodyFormData.append("workExperience", data.workExperience);
  bodyFormData.append("academicDegree", data.academicDegree);
  bodyFormData.append("languages", data.languages);
  bodyFormData.append("passport", data.passport);
  bodyFormData.append("file", data.scientificWork);

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return await axios({
    method: "post",
    url: apiLocal + "/user/registerReviewer",
    // url: apiSwagger + "/user/registerReviewer",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getUsersById(id) {
  return http.get(`http://192.168.100.27:8080/api/user/getAuthorByCode/${id}`);
}

export default {
  registerReviewer,
  profileEdit,
  register,
  searchUser,
  changeUserActivity,
  deleteUser,
  getUserForEdit,
  getStatisticsOfArticles,
  profileEditFromAdmin,
  createUser,
  getUsersById,
};
