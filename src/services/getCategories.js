import http from "./httpService";
import api from "../utils/config.json";

const { apiSwagger, apiLocal } = api;

export function getCategories() {
  return http.get(apiLocal + "/category/all");
}

export function changeActivityOfCategory(id) {
  return http.get(apiLocal + `/category/changeActive/${id}`);
}

export function deleteCategories(id) {
  return http.get(apiLocal + `/category/delete/${id}`);
}

export function createOrEditCategories(data) {
  return http.post(apiLocal + `/category/saveOrEdit`, data);
}

export default {
  getCategories,
  changeActivityOfCategory,
  deleteCategories,
  createOrEditCategories,
};
