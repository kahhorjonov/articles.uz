import axios from "axios";
import jwtDecode from "jwt-decode";
import api from "utils/config.json";
import httpService from "./httpService";

const { apiLocal } = api;

const token = localStorage.getItem("token");

export function addArticle(data) {
  const bodyFormData = new FormData();

  bodyFormData.append("categoryId", data.data.categoryId);
  bodyFormData.append("description", data.data.description);
  bodyFormData.append("authorsList", data.tags);
  bodyFormData.append("titleArticle", data.data.titleArticle);
  bodyFormData.append("publicOrPrivate", data.publicOrPrivate);
  bodyFormData.append("file", data.data.file);
  bodyFormData.append("sahifaSoni", data.sahifaSoni);
  bodyFormData.append("jurnaldaChopEtishSoni", data.jurnaldaChopEtishSoni);
  bodyFormData.append("bosmaJurnalSoni", data.bosmaJurnalSoni);
  bodyFormData.append("sertifikatSoni", data.sertifikatSoni);
  bodyFormData.append("doi", data.doi);
  bodyFormData.append("price", data.price);
  bodyFormData.append("journalsId", data.parentCategoryId);

  return axios({
    method: "post",
    url: apiLocal + "/article/addArticle",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function sendWork(articleId, status, file, description) {
  const userId = jwtDecode(token).sub;

  const bodyFormData = new FormData();

  bodyFormData.append("articleId", articleId);
  bodyFormData.append("status", status);
  bodyFormData.append("file", file ? file : null);
  bodyFormData.append("userId", userId);
  bodyFormData.append("description", description);

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return axios({
    method: "post",
    url: "http://192.168.100.27:8080/api/article/givenStatus",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getAllArticles() {
  let articles = [];

  return (
    axios
      .get(apiLocal + "/article/newMyArticle")
      // .get(apiSwagger + "/article/newMyArticle")
      .then((res) => {
        articles = res.data;
      })
      .catch((res) => {
        articles = [];
      })
  );
}

export function getNewAllArticles() {
  return axios.get(apiLocal + "/article/getNewAllArticle");
}

export function newMyArticles(step) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {
    status: step,
  };

  return axios.post(apiLocal + "/article/newMyArticle", bodyParametrs, config);
}

export function myNewArticles() {
  let articles = [];

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {
    key: "value",
  };

  return axios.post(apiLocal + "/article/myNewArticles", bodyParametrs, config);
}

export function reviewerActionForArticle(action, articleId) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {
    articleStatus: action,
    articleId: articleId,
  };

  return axios.post(
    apiLocal + "/article/reviewerAcceptTheArticle",
    bodyParametrs,
    config
  );
}

export function confirmArticle(token, bool, articleId) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  console.log(token, bool, articleId);

  const bodyParametrs = {
    confirm: bool,
    articleId: articleId,
  };

  return axios.post(apiLocal + "/articleStatus/confirm", bodyParametrs, config);
}

export function confirmForUsers(bool, articleId, userId, deadline) {
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {
    addAndRemove: bool,
    article: articleId,
    redactorsAndReviewer: userId,
    deadline: deadline,
  };

  return axios.post(
    apiLocal + "/article/addAndRemoveRedactor",
    // apiSwagger + "/article/addAndRemoveRedactor",
    bodyParametrs,
    config
  );
}

export function articleInfo(id) {
  return httpService.get(`${apiLocal} + /article/articleInfoForAdmin/${id}`);
}

export function getPrice(data) {
  return axios.post("http://192.168.100.27:8080/api/prices/getPrices", data);
}

export function getAllMyArticles(status) {
  return axios({
    method: "post",
    url: apiLocal + `/article/allMyArticles/${status}`,
    data: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function myDuties() {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {};

  return axios.post(
    "http://192.168.100.27:8080/api/article/myDuties",
    bodyParametrs,
    config
  );
}

export function getRedactorsAndReviewers(id, role) {
  return axios.post(apiLocal + "/article/getReviewerAndRedactorRandom", {
    // .post(apiSwagger + "/article/getReviewerAndRedactorRandom", {
    articleId: `${id}`,
    roleId: `${role}`,
  });
}

export function editArticleByAdmin(data) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {
    articleId: data.articleId,
    description: data.description,
    status: data.status,
  };

  return axios.post(
    apiLocal + "/article/articleStatusAdministrator",
    bodyParametrs,
    config
  );

  // const bodyFormData = new FormData();

  // bodyFormData.append("articleId", data.articleId);
  // bodyFormData.append("description", data.description);
  // bodyFormData.append("status", data.status);
  // bodyFormData.append("file", data.file);

  // return axios({
  //   method: "post",
  //   url: apiLocal + "/article/articleStatusAdministrator",
  //   data: bodyFormData,
  //   headers: {
  //     // "Content-Type": "multipart/form-data",
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
}

export default {
  editArticleByAdmin,
  getRedactorsAndReviewers,
  myDuties,
  articleInfo,
  confirmForUsers,
  confirmArticle,
  newMyArticles,
  reviewerActionForArticle,
  myNewArticles,
  getNewAllArticles,
  getAllArticles,
  sendWork,
  addArticle,
  getPrice,
  getAllMyArticles,
};
