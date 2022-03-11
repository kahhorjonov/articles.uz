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
  // bodyFormData.append("cover", data.cover);
  bodyFormData.append("cover", data.cover);
  bodyFormData.append("certificateNumber", data.certificateNumber);
  bodyFormData.append("issn", data.issn);
  bodyFormData.append("isbn", data.isbn);
  bodyFormData.append("printedDate", data.printedDate);
  bodyFormData.append("categoryId", data.categoryId);
  // bodyFormData.append("file", data.file);
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
  return http.get(apiLocal + `/journals/getCategoryJournals/${id}`);
}

export function getParentMagazines() {
  return http.get(apiLocal + "/journals/getActiveJournals");
}

export function getActiveMagazines() {
  return http.get(apiLocal + "/journals/getActiveJournals");
}

export function getParentCategories() {
  return http.get(apiLocal + "/category/allParentCategory");
}

export function getYearById(id) {
  return http.get(apiLocal + `/journals/getYear/${id}`);
}

export function getMagazinesByYear(year, id) {
  return http.get(apiLocal + `/journals/getYearJournals/${year}/${id}`);
}

export function getArticlesFromMagazine(id) {
  return http.get(apiLocal + `/journals/getJournalInfo/${id}`);
}

export function editMagazines(id, data) {
  // console.log(data);

  const object = {
    category: data.category,
    certificateNumber: data.certificateNumber,
    title: data.title,
    deadline: data.deadline,
    printedDay: data.printDay,
    file: data.file,
    isbn: data.isbn,
    issn: data.issn,
    cover: data.cover,
    status: data.status,
    description: data.description,
  };

  return http.post(apiLocal + `/api/journals/edit/${id}`, object);
}

export default {
  createMagazine,
  getById,
  getMagazinesById,
  getParentMagazines,
  editMagazines,
  getActiveMagazines,
  getYearById,
  getMagazinesByYear,
  getArticlesFromMagazine,
};
