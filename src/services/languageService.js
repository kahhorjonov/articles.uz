import http from "./httpService";
import api from "utils/config.json";

const { apiLocal } = api;

export function getAllActiveLanguages() {
  return http.get(apiLocal + "/language/allActives");
}

export function changeLanguage(id, name) {
  return http.put(apiLocal + `/language/edit/${id}/${name}`);
}

export function getAllLanguages() {
  return http.get(apiLocal + "/language/all");
}

export function deleteLanguage(id) {
  return http.delete(apiLocal + `/language/delete/${id}`);
}

export function changeActivity(id, bool) {
  return http.post(apiLocal + `/language/changeActive/${id}/${bool}`);
}

export function createLanguage(name) {
  return http.post(apiLocal + `/language/add/${name}`);
}

export default {
  getAllActiveLanguages,
  getAllLanguages,
  changeLanguage,
  deleteLanguage,
  changeActivity,
  createLanguage,
};
