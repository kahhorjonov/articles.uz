import http from "./httpService";
import api from "../utils/config.json";

const token = localStorage.getItem("token");

const { apiLocal } = api;

export function getNotifications() {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParametrs = {};

  return http.post(
    apiLocal + "/notification/notificationList",
    bodyParametrs,
    config
  );
}

export function deleteNotification(id) {
  return http.delete(apiLocal + `/notification/deleteNotification/${id}`);
}

export default {
  getNotifications,
  deleteNotification,
};
