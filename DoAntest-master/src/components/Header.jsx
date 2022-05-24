import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logoImg } from '../asset';
// import { actionSetNumberCart, getNumberCart } from "../redux/slice/item";
import {
	actionSetLogin,
	checkLogin,
	checkIsAdmin,
	// getUserInfo,
} from '../redux/slice/home';
import { connect } from 'react-redux';
import { getCartTotal } from '../redux/slice/cart';

export function Header(props) {
	// const numberCart = useSelector(getNumberCart);
	const dispatch = useDispatch();
	const history = useHistory();
	const isLogin = useSelector(checkLogin);
	const isAdmin = useSelector(checkIsAdmin);
	const numberCart = useSelector(getCartTotal);

	const handleLogout = () => {
		dispatch(actionSetLogin(false));
		localStorage.removeItem('token');
		history.push('/login');
	};

	const loginElement = isLogin ? (
		<div className="login">
			<div className="d-flex align-items-center cursor-pointer ms-3">
				<img
					src="https://i.picsum.photos/id/166/200/300.webp?hmac=oQFdz1K0cxOrp0xV0q2_qKTY5JqF-JMzC5pCtUs2He8"
					alt=""
					className="avt"
				/>
				<p
					style={{
						color: '#210101',
						paddingLeft: '5px',
						marginBottom: '0',
					}}
				>
					{localStorage.getItem('name')}
				</p>
			</div>
			<ul className="sub__avt">
				<li
					className="sub__avt-item"
					onClick={() => {
						history.push('/history-receipt');
					}}
				>
					Đơn hàng đã mua
				</li>
				<li className="sub__avt-item" onClick={handleLogout}>
					Đăng xuất
				</li>
			</ul>
		</div>
	) : (
		<i className="fa fa-user" onClick={() => history.push('/login')}></i>
	);

	const linkToItems = isAdmin ? (
		<>
			<li className="nav-item ">
				<NavLink
					to="/admin/product"
					activeClassName="link--active"
					exact
					className="nav-link"
				>
					Danh mục sản phẩm
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink
					to="/admin/bill"
					activeClassName="link--active"
					className="nav-link"
				>
					Đơn hàng
				</NavLink>
			</li>
		</>
	) : null;

	const detailOrders =
		!isAdmin && isLogin ? (
			<li className="nav-item">
				<NavLink
					to="/history-receipt"
					activeClassName="link--active"
					className="nav-link"
				>
					Danh sách hóa đơn
				</NavLink>
			</li>
		) : null;

	return (
		<header className="top-navbar">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<Link to="/" className="navbar-brand">
						<img src={logoImg.logo} alt="" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbars-rs-item"
						aria-controls="navbars-rs-item"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbars-rs-item">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item ">
								<NavLink
									to="/"
									activeClassName="link--active"
									exact
									className="nav-link"
								>
									Trang chủ
								</NavLink>
							</li>
							<li className="nav-item ">
								<NavLink
									to="/menu"
									activeClassName="link--active"
									className="nav-link"
								>
									Quần Áo
								</NavLink>
							</li>
							{detailOrders}
							{/* <li className="nav-item">
								<a className="nav-link" href="contact.html">
									Liên hệ
								</a>
							</li> */}
							{linkToItems}
						</ul>
					</div>
					<div className="icon__group d-lg-flex align-items-center d-none">
						<Link to="/menu">
							<i className="fa fa-search"></i>
						</Link>
						<Link to="/add-to-cart">
							<div id={'cart'}>
								<i className="fa fa-shopping-cart"></i>
								{numberCart !== 0 && <span>{numberCart}</span>}
							</div>
						</Link>
						{loginElement}
					</div>
				</div>
			</nav>
		</header>
	);
}

const mapStateToProps = (state) => {
	return {
		carts: state.carts,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
