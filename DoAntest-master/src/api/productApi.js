import axiosClient from "./axiosClient";

const shopApi = {
  getProducts: (page, filter) => {
    const url = "/products";
    return axiosClient.get(url, {
      params: {
        page: page || 1,
        size: 10,
        search: filter,
      },
    });
  },
  getProductSearch: (page, type, sort = undefined, search = undefined) => {
    const url = "/products";
    return axiosClient.get(url, {
      params: {
        page: page || 1,
        size: 9,
        search: search,
        sort: sort,
        type: type,
      },
    });
  },
  createProduct: (params) => {
    const url = "/products";

    return axiosClient.post(url, params, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  updateProduct: (id, params) => {
    const url = `/products/${id}`;

    return axiosClient.put(url, params, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`;

    return axiosClient.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
};

export default shopApi;
