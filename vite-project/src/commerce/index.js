import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.chec.io/v1/",
});
