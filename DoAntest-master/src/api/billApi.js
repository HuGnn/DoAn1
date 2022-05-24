import axiosClient from './axiosClient';

const billApi = {
	getBills: (page) => {
		const url = '/bill';
		return axiosClient.get(url, {
			params: {
				page: page || 1,
				size: 10,
			},
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
	},
};

export default billApi;
