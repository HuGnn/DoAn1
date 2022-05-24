import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AuthLayout from "../layouts/authLayout.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../api/authApi.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { actionSetLogin } from "../redux/slice/home.js";

const schema = yup.object().shape({
  email: yup.string().email("Hãy nhập định dạng email").required("Bạn phải nhập email"),
});
export default function ForgetPass() {
  const [isShowPass, setIsShowPass] = useState(false);
  const { path } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleMouseDown = ({ target }) => {
    clearErrors(`${target.name}`);
  };
  const onSubmit = async (data) => {
    try {
      const dt = await authApi.forget(data);
      if (dt.status === 200) {
        localStorage.setItem("token_reset", dt?.data);

        toast.success("Vui lòng kiểm tra email để đổi lại mật khẩu");
      } else {
        toast.error("Tài khoản không tồn tại");
      }
    } catch (error) {
      toast.error("Tài khoản không tồn tại");
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex flex-row align-items-center justify-content-center '>
          <h4 className='lead fw-normal mb-3 me-3 fs-3'>Tìm lại mật khẩu </h4>
        </div>

        <div className='d-flex flex-row align-items-center justify-content-center'>
          <h3 className='lead fw-normal mb-3 me-3'>Nhập email của bạn để lấy lại mật khẩu</h3>
        </div>

        <div className='form-outline mb-4'>
          <input
            type='text'
            {...register("email")}
            onMouseDown={handleMouseDown}
            defaultValue={getValues("email")}
            className={errors.email ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder='Nhập địa chỉ email'
          />
          <p className='text__error'>{errors.email?.message}</p>
        </div>

        <div className='text-center text-lg-start mt-4 pt-2'>
          <button type='submit' className='btn btn-primary btn-sm px-5'>
            Xác nhận
          </button>
          <button
            className='btn btn-secondary btn-sm ms-3 px-5'
            onClick={() => {
              history.push("/login");
            }}
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
