import http from "./httpService";
import api from "utils/config.json";

const { apiLocal } = api;

export function getAllActiveLanguages() {
  return http.get(apiLocal + "/language/allActives");
}

export default { getAllActiveLanguages };
