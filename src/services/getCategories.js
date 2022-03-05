import http from "./httpService";
import api from "../utils/config.json";

const { apiSwagger, apiLocal } = api;

export function getCategories() {
  return http.get(apiLocal + "/category/all");
}

export function getCategoriesForMagazine() {
  return http.get(apiLocal + "/journals/getCategoryJournals");
  // return http.get(apiSwagger + "/category/all");
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

export function getParentCategories() {
  return http.get(apiLocal + `/category/allParentCategory`);
}

export function getParentMagazines() {
  return http.get(apiLocal + `/journals/getParentJournals`);
}

export function getChildCategories(id) {
  return http.get(apiLocal + `/category/allChildrenCategory/${id}`);
}

export default {
  getCategories,
  getCategoriesForMagazine,
  changeActivityOfCategory,
  deleteCategories,
  createOrEditCategories,
  getParentCategories,
  getParentMagazines,
  getChildCategories,
};
