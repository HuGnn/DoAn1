import axiosClient from "./axiosClient";

const homeApi = {
  getTop: ({ search, type, sort, page = 1 }) => {
    const url = "/products";

    return axiosClient.get(url, {
      params: { type, size: 6, search, order: sort, page },
    });
  },
};
export default homeApi;
