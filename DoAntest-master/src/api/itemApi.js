import axiosClient from './axiosClient';

const itemApi = {
	getAllItems: ({ pageNumber, category, search, sort, label }) => {
		const url = '/products';

		return axiosClient.get(url, {
			params: {
				page: pageNumber || 1,
				size: 9,
				sort: sort || undefined,
				type: label || undefined,
				search: search || undefined,
				category: category || undefined,
			},
		});
	},
	getCategory: () => {
		const url = '/foodcategory';
		return axiosClient.get(url);
	},
	createBill: (dt) => {
		const url = '/bill';

		return axiosClient.post(url, dt, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	},
	getBill: () => {
		const url = '/user/bill';

		return axiosClient.get(url, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	},

	getBillDetail: (data) => {
		const url = `/bill/${data.payload}`;

		return axiosClient.get(url, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	},
};
export default itemApi;
