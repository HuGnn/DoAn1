import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import AuthLayout from '../layouts/authLayout.jsx';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authApi from '../api/authApi.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actionSetLogin } from '../redux/slice/home.js';
import { actions } from '../redux/slice/cart';
import { connect } from 'react-redux';
// import { actionSetNumberCart } from '../redux/slice/item.js';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Hãy nhập định dạng email')
		.required('Bạn phải nhập email'),
	password: yup
		.string()
		.min(5, 'Bạn phải nhập mật khẩu')
		.required('Bạn phải nhập mật khẩu'),
});
export function Login(props) {
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
			const dt = await authApi.login(data);

			if (dt.status === 200) {
				const token = dt?.data?.token.split('|')[1];
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(dt?.data?.user));
				dispatch(actionSetLogin(dt?.data));
				// toast.success('Đăng nhập thành công');
				props.getCarts();
				history.replace('/');
				// history.replace("/" + path);
			}
		} catch (error) {
			toast.error('Đăng nhập thất bại');
		}
	};
	return (
		<AuthLayout>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
					<p className="lead fw-normal mb-0 me-3">Đăng nhập với</p>
					<button type="button" className="btn btn-primary btn-floating mx-1">
						<i className="fa fa-facebook-f"></i>
					</button>

					<button type="button" className="btn btn-primary btn-floating mx-1">
						<i className="fa fa-twitter"></i>
					</button>

					<button type="button" className="btn btn-primary btn-floating mx-1">
						<i className="fa fa-linkedin"></i>
					</button>
				</div>

				<div className="divider d-flex align-items-center justify-content-center my-4">
					<p className="text-center fw-bold mx-3 mb-0">Or</p>
				</div>

				<div className="form-outline mb-4">
					<input
						type="text"
						{...register('email')}
						onMouseDown={handleMouseDown}
						defaultValue={getValues('email')}
						className={
							errors.email
								? 'form-control form-control-lg form__error'
								: 'form-control form-control-lg'
						}
						placeholder="Nhập địa chỉ email"
					/>
					<p className="text__error">{errors.email?.message}</p>
				</div>

				<div className="form-outline mb-3 ">
					<div className={'position-relative'}>
						<input
							type={isShowPass ? 'text' : 'password'}
							id="form3Example5"
							{...register('password')}
							defaultValue={getValues('password')}
							onMouseDown={handleMouseDown}
							className={
								errors.password
									? 'form-control form-control-lg form__error'
									: 'form-control form-control-lg'
							}
							placeholder="Nhập mật khẩu"
						/>
						{isShowPass ? (
							<i
								className="fa fa-eye-slash pass__icon"
								onClick={() => {
									setIsShowPass(false);
								}}
							/>
						) : (
							<i
								className="fa fa-eye pass__icon"
								onClick={() => {
									setIsShowPass(true);
								}}
							/>
						)}
					</div>
					<p className="text__error">{errors.password?.message}</p>
				</div>

				<div className="d-flex justify-content-between align-items-center">
					{/* <div className="form-check mb-0">
						<input
							className="form-check-input me-2"
							type="checkbox"
							value=""
							id="form2Example3"
						/>
						<label className="form-check-label" htmlFor="form2Example3">
							Ghi nhớ đăng nhập
						</label>
					</div> */}
					<span
						onClick={() => history.push('/forget-password')}
						className="text-body"
						style={{ cursor: 'pointer' }}
					>
						Quên mật khẩu?
					</span>
				</div>

				<div className="text-center text-lg-start mt-4 pt-2">
					<button type="submit" className="btn btn-primary btn-sm px-5">
						Đăng nhập
					</button>
					<p className="small fw-bold mt-2 pt-1 mb-0 fs-6">
						Bạn chưa có tài khoản?{' '}
						<Link to="/signup" className="link-danger">
							Đăng ký
						</Link>
					</p>
				</div>
			</form>
		</AuthLayout>
	);
}

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCarts: () => {
			dispatch(actions.get_carts());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
