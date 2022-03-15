import api from "../utils/config.json";
import http from "./httpService";

const { apiLocal } = api;

const token = localStorage.getItem("token");

export function getPrices() {
  return http.get(apiLocal + "/prices/getPrice");
}

export function changePrices(data) {
  return http.post(apiLocal + "/prices/editPrice", data);
}

export default { getPrices, changePrices };
