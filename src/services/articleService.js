import axios from "axios";
import jwtDecode from "jwt-decode";
import api from "../utils/config.json";
import httpService from "./httpService";

const { apiSwagger, apiLocal } = api;

class ArticleService {
  token = localStorage.getItem("token");

  static async addArticle(data) {
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
      const result = await axios({
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

  static async sendWork(articleId, status, file) {
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
      const result = await axios({
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

  static async getAllArticles() {
    let articles = [];

    await axios
      .get(apiLocal + "/article/newMyArticle")
      // .get(apiSwagger + "/article/newMyArticle")
      .then((res) => {
        articles = res.data;
      })
      .catch((res) => {
        articles = [];
      });
    return articles;
  }

  static async getNewAllArticles() {
    let articles = [];

    await axios
      .get(apiLocal + "/article/getNewAllArticle")
      // .get(apiSwagger + "/article/getNewAllArticle")
      .then((res) => {
        articles = res.data;
      })
      .catch((res) => {
        articles = [];
      });
    return articles;
  }

  static async newMyArticles(token, step) {
    let articles = [];

    // console.log(step);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParametrs = {
      status: step,
    };

    await axios
      .post(apiLocal + "/article/newMyArticle", bodyParametrs, config)
      // .post(apiSwagger + "/article/newMyArticle", bodyParametrs, config)
      .then((res) => {
        articles = res.data;
        // console.log(res);
      })
      .catch((res) => {
        articles = [];
      });

    return articles;
  }

  static async myNewArticles(token) {
    let articles = [];

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParametrs = {
      key: "value",
    };

    await axios
      .post(apiLocal + "/article/myNewArticles", bodyParametrs, config)
      // .post(apiSwagger + "/article/myNewArticles", bodyParametrs, config)
      .then((res) => {
        articles = res.data;
        // console.log(res);
      })
      .catch((res) => {
        articles = [];
      });
    return articles;
  }

  static async reviewerActionForArticle(token, action, articleId) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParametrs = {
      articleStatus: action,
      articleId: articleId,
    };

    await axios
      .post(
        apiLocal + "/article/reviewerAcceptTheArticle",
        bodyParametrs,
        config
      )
      // .post(apiSwagger + "/article/reviewerAcceptTheArticle", bodyParametrs, config)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        console.error(res);
      });
  }

  static async confirmArticle(token, bool, articleId) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParametrs = {
      confirm: bool,
      articleId: articleId,
    };

    await axios
      .post(apiLocal + "/articleStatus/confirm", bodyParametrs, config)
      // .post(apiSwagger + "/articleStatus/confirm", bodyParametrs, config)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.error(res);
      });
    // return console.log();;
  }

  static async confirmForUsers(bool, articleId, userId, deadline) {
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

    return await axios.post(
      apiLocal + "/article/addAndRemoveRedactor",
      // apiSwagger + "/article/addAndRemoveRedactor",
      bodyParametrs,
      config
    );
  }

  static async articleInfo(id) {
    return httpService.get(`${apiLocal} + /article/articleInfoForAdmin/${id}`);
  }

  static async myDuties(token) {
    let articles = [];

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParametrs = {};

    await axios
      .post(
        "http://192.168.100.27:8080/api/article/myDuties",
        bodyParametrs,
        config
      )
      // .post(apiSwagger + "/article/myDuties", bodyParametrs, config)
      .then((res) => {
        // articles = res;
        // return articles;
      })
      .catch((res) => {
        // console.error(res);
        // return articles;
      });
  }

  static async getRedactorsAndReviewers(id, role) {
    let people = [];

    await axios
      .post(apiLocal + "/article/getReviewerAndRedactorRandom", {
        // .post(apiSwagger + "/article/getReviewerAndRedactorRandom", {
        articleId: `${id}`,
        roleId: `${role}`,
      })
      .then((res) => {
        people = res.data;
      })
      .catch((res) => {
        people = [];
      });

    return people;
  }
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
      "Authorization": `Bearer ${token}`,
    },
  });
}

export default { ArticleService, editArticleByAdmin };
