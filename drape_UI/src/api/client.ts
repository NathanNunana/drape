import axios from "axios";

export const Endpoints = {
  login: "/auth/login/",
  register: "auth/register/",
};

export const client = axios.create({
  baseURL: "https://yengsebastian1.pythonanywhere.com",
  headers: {
    "Content-Type": "application/json",
  },
});
