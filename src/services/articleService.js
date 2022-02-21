import axios from "axios";
import jwtDecode from "jwt-decode";
import api from "../utils/config.json";
import httpService from "./httpService";

const { apiSwagger, apiLocal } = api;

const token = localStorage.getItem("token");

export function addArticle(data) {
  const bodyFormData = new FormData();

  const token = jwtDecode(localStorage.getItem("token"));

  bodyFormData.append("author", data.author);
  bodyFormData.append("categoryId", data.categoryId);
  bodyFormData.append("description", data.description);
  bodyFormData.append("firstName", data.firstName);
  bodyFormData.append("lastName", data.lastName);
  bodyFormData.append("tags", data.tags);
  bodyFormData.append("titleArticle", data.titleArticle);
  bodyFormData.append("publicOrPrivate", false);
  bodyFormData.append("userId", token.sub);
  bodyFormData.append("file", data.file);

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  try {
    const result = axios({
      method: "post",
      url: apiLocal + "/article/addArticle",
      // url: apiSwagger + "/article/addArticle",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("result", result);
    // if (result) reset();
  } catch (err) {
    alert(err.message);
  }
}

export function sendWork(articleId, status, file) {
  const userId = jwtDecode(localStorage.getItem("token")).sub;

  console.log(userId);

  const bodyFormData = new FormData();

  bodyFormData.append("articleId", articleId);
  bodyFormData.append("status", status);
  bodyFormData.append("file", file ? file : null);
  bodyFormData.append("userId", userId);

  for (var pair of bodyFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  try {
    const result = axios({
      method: "post",
      url: "http://192.168.100.27:8080/api/article/givenStatus",
      // url: apiSwagger + "/article/addArticle",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  } catch (err) {
    alert(err.message);
  }
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
  let articles = [];

  return (
    axios
      .get(apiLocal + "/article/getNewAllArticle")
      // .get(apiSwagger + "/article/getNewAllArticle")
      .then((res) => {
        articles = res.data;
      })
      .catch((res) => {
        articles = [];
      })
  );
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

export function myNewArticles(token) {
  let articles = [];

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {
    key: "value",
  };

  return axios.post(apiLocal + "/article/myNewArticles", bodyParametrs, config);
  // .post(apiSwagger + "/article/myNewArticles", bodyParametrs, config)
  // .then((res) => {
  //   articles = res.data;
  //   // console.log(res);
  // })
  // .catch((res) => {
  //   articles = [];
  // })
}

export function reviewerActionForArticle(token, action, articleId) {
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

export function myDuties(token) {
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
  const token = localStorage.getItem("token");

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };

  const bodyFormData = new FormData();

  bodyFormData.append("articleId", data.articleId);
  bodyFormData.append("description", data.description);
  bodyFormData.append("file", data.file);

  return axios({
    method: "post",
    url: apiLocal + "/article/giveStatus",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
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
};
