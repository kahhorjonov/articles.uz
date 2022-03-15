import api from "../utils/config.json";
import http from "./httpService";

const { apiLocal } = api;

const token = localStorage.getItem("token");

export function downloadMedia(id, object) {
  return http.get(apiLocal + `/attachment/download/${id}`, object);
}

export function downloadFile(id, object) {
  return fetch(apiLocal + `/attachment/download/${id}`, object);
}

export default { downloadMedia, downloadFile };
