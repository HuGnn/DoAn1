import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  // responseType: "json"
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // if (!config.headers.authorization) {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     config.headers.authorization = `bearer ${token}`;
    //   }
    // }
    return config;
  },
  (error) => {}
);

axiosClient.interceptors.response.use(
  (axiosResponse) => {
    return axiosResponse;
  },
  (error) => {}
);

export default axiosClient;
