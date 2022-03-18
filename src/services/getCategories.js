import http from "./httpService";
import api from "utils/config.json";

const { apiLocal } = api;

export function getCategories() {
  return http.get(apiLocal + "/category/all");
}

export function getCategoriesForMagazine() {
  return http.get(apiLocal + "/journals/getCategoryJournals");
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

export function getPublishedParentCategories() {
  return http.get(apiLocal + `/category/parentCategories`);
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
  getPublishedParentCategories,
};
