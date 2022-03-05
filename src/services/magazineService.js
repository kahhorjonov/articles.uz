import http from "./httpService";
import api from "../utils/config.json";
import axios from "axios";

const token = localStorage.getItem("token");

const { apiLocal } = api;

export function createMagazine(data) {
  const bodyFormData = new FormData();

  bodyFormData.append("id", data.id);
  bodyFormData.append("title", data.title);
  //   bodyFormData.append("releaseNumberOfThisYear", data.releaseNumberOfThisYear);
  //   bodyFormData.append("allReleasesNumber", data.allReleasesNumber);
  bodyFormData.append("deadline", data.deadline);
  bodyFormData.append("parentId", data.parentCategoryId);
  bodyFormData.append("description", data.description);
  bodyFormData.append("printedDate", data.printedDate);
  bodyFormData.append("cover", data.cover);
  bodyFormData.append("certificateNumber", data.certificateNumber);
  bodyFormData.append("issn", data.issn);
  bodyFormData.append("isbn", data.isbn);
  bodyFormData.append("printedDate", data.printedDate);
  bodyFormData.append("categoryId", data.categoryId);
  bodyFormData.append("file", data.file);
  bodyFormData.append("status", data.status);

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return axios({
    method: "post",
    url: apiLocal + "/journals/addJournals",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getById(id) {
  return http.get(apiLocal + `/journals/getById/${id}`);
}

export function getMagazinesById(id) {
  return http.get(
    `http://192.168.100.27:8080/api/journals/getCategoryJournals/${id}`
  );
}

export default { createMagazine, getById, getMagazinesById };
