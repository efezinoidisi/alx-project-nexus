import axios from "axios";

const baseURL = "https://job-board-platform.onrender.com/api";

export const api = axios.create({
  baseURL,
});

// api.interceptors.request.use()
