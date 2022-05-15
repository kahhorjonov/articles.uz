import http from "./httpService";
import api from "utils/config.json";
import axios from "axios";
import { getCheckedToken } from "./authService";

const { apiSwagger, apiLocal } = api;

const apiEndpoint = apiLocal + "/user/register";

const token = getCheckedToken();

export function register(phone, password) {
  return http.post(apiEndpoint, {
    phoneNumber: phone,
    password: password,
    // firebaseToken: firebaseToken,
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
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    userId: userId,
    active: activity,
  };

  return axios.post(apiLocal + "/user/acceptedUser", body, config);
}

export async function profileEdit(data) {
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
    languages: data.codes,
    // categoryIdList: data.codes2,
  };

  return axios.post(apiLocal + "/user/edit", body, config);
}

export async function profileEditFromAdmin(data) {
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
    languages: data.codes,
    categoryIdList: data.codes2,
  };

  return axios.post(apiLocal + "/user/editUserFromAdmin", body, config);
}

export async function registerReviewer(data, languages, categories) {
  const bodyFormData = new FormData();

  bodyFormData.append("firstName", data.firstName);
  bodyFormData.append("lastName", data.lastName);
  bodyFormData.append("fathersName", data.fatherName);
  bodyFormData.append("email", data.email);
  bodyFormData.append("phoneNumber", `+998${data.phoneNumber}`);
  bodyFormData.append("password", data.password);
  bodyFormData.append("categoryIdList", categories);
  bodyFormData.append("workPlace", data.workPlace);
  bodyFormData.append("workExperience", data.workExperience);
  bodyFormData.append("academicDegree", data.academicDegree);
  bodyFormData.append("languages", languages);
  bodyFormData.append("passport", data.passport);
  bodyFormData.append("file", data.scientificWork);

  return await axios({
    method: "post",
    url: apiLocal + "/user/registerReviewer",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getUsersById(id) {
  return http.get(apiLocal + `/user/getAuthorByCode/${id}`);
}

export function getNewRegisteredUsers() {
  return http.get(apiLocal + "/user/allNewReviewers");
}

export function acceptReviewers(id) {
  return http.post(apiLocal + `/user/activeEdite/${id}`);
}

export function getUsersInfo() {
  return http.get(apiLocal + "/user/dashboard");
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
  getNewRegisteredUsers,
  acceptReviewers,
  getUsersInfo,
};
