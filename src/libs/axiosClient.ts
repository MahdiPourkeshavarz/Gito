import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

export default apiClient;
