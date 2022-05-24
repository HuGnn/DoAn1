import axiosClient from './axiosClient';

const shopApi = {
	getCarts: () => {
		const headers = {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		};
		const url = `/user/cart`;

		return axiosClient.get(url, {
			headers,
		});
	},
	updateCart: (params) => {
		const url = `/user/cart`;

		return axiosClient.put(url, params, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	},
};

export default shopApi;
