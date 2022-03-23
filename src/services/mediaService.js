import axios from "axios";
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

export function profilePhoto(photo) {
  const bodyFormData = new FormData();

  bodyFormData.append("file", photo);

  return axios({
    method: "post",
    url: apiLocal + "/user/addPhoto",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function counter(id) {
  return http.post(apiLocal + `/article/viewsCountingTheArticle/${id}`);
}

export default {
  downloadMedia,
  downloadFile,
  profilePhoto,
  counter,
};
