import http from "./httpService";
import api from "../utils/config.json";

const { apiSwagger, apiLocal } = api;

export function getCategories() {
  return http.get(apiLocal + "/category/all");
  // return http.get(apiSwagger + "/category/all");
}

export function getCategoriesForMagazine() {
  return http.get(apiLocal + "/journals/getCategoryJournals");
  // return http.get(apiSwagger + "/category/all");
}
