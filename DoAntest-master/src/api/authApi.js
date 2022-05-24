import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    const url = "/user/login";
    const dt = new FormData();
    dt.append("email", data.email);
    dt.append("password", data.password);

    return axiosClient.post(url, dt);
  },
  signUp: (data) => {
    const url = "/user/register";
    const dt = {};
    dt.email = data.email;
    dt.phone = data.phone;
    dt.first_name = data.firstname;
    dt.last_name = data.lastname;
    dt.password = data.password;
    dt.address = data.address;
    dt.password_confirmation = data.confirm;

    return axiosClient.post(url, JSON.stringify(dt));
  },
  forget: (data) => {
    const url = "/user/resetPassWord";
    // const dt = new FormData();
    // dt.append("email", data.email);

    return axiosClient.post(url, data, { params: { email: data.email } });
  },
  changePass: (data, token) => {
    const url = "/user/confirmResetPassWord";

    return axiosClient.post(url, data, {
      headers: { resetPassowrdToken: token },
      params: { password: data.password },
    });
  },
};

export default authApi;
