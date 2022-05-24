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
  password: yup.string().min(5, "Bạn phải nhập mật khẩu").required("Bạn phải nhập mật khẩu"),
  confirm: yup.string().oneOf([yup.ref("password")], "Mật khẩu không tương ứng"),
});
export default function ChangePass() {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  if (token !== localStorage.getItem("token_reset")) {
    history.push("/login");
  }

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
    const dt = await authApi.changePass(data, token);
    try {
      if (dt.status === 200) {
        toast.success("Đổi mật khẩu thành công!");
        history.replace("/login");
      } else {
        toast.error("Đổi mật khẩu thất bại");
      }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại");
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex flex-row align-items-center justify-content-center '>
          <h4 className='lead fw-normal mb-3 me-3 fs-3'>Đặt lại mật khẩu</h4>
        </div>

        <div className='d-flex flex-row align-items-center justify-content-center '>
          <h3 className='lead fw-normal mb-3 me-3'>Nhập mật khẩu mới để đổi lại </h3>
        </div>

        <div className='form-outline mb-3 '>
          <div className={"position-relative"}>
            <input
              type={isShowPass ? "text" : "password"}
              {...register("password")}
              defaultValue={getValues("password")}
              onMouseDown={handleMouseDown}
              className={errors.password ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
              placeholder='Nhập mật khẩu'
            />
            {isShowPass ? (
              <i
                className='fa fa-eye-slash pass__icon'
                onClick={() => {
                  setIsShowPass(false);
                }}
              />
            ) : (
              <i
                className='fa fa-eye pass__icon'
                onClick={() => {
                  setIsShowPass(true);
                }}
              />
            )}
          </div>
          <p className='text__error'>{errors.password?.message}</p>
        </div>

        <div className='form-outline mb-3 '>
          <div className={"position-relative"}>
            <input
              type={isShowConfirm ? "text" : "password"}
              {...register("confirm")}
              defaultValue={getValues("confirm")}
              onMouseDown={handleMouseDown}
              className={errors.confirm ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
              placeholder='Nhập lại mật khẩu'
            />
            {isShowConfirm ? (
              <i
                className='fa fa-eye-slash pass__icon'
                onClick={() => {
                  setIsShowConfirm(false);
                }}
              />
            ) : (
              <i
                className='fa fa-eye pass__icon'
                onClick={() => {
                  setIsShowConfirm(true);
                }}
              />
            )}
          </div>
          <p className='text__error'>{errors.confirm?.message}</p>
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
