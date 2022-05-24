import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardSubtitle,
	CardTitle,
	Container,
	Table,
} from 'reactstrap';
import itemApi from '../api/itemApi.js';
import CartItem from '../components/CartItem.jsx';
import CommonLayout from '../layouts/commonLayout.jsx';
import { actionSetNumberCart } from '../redux/slice/item.js';
import { checkLogin, getUserInfo } from '../redux/slice/home.js';
import { connect } from 'react-redux';
import { actions, getCardData, getCardTotalPrice } from '../redux/slice/cart';

export function AddToCart(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const isLogin = useSelector(checkLogin);
	const listItem = useSelector(getCardData) ?? [];
	const totalPrice = useSelector(getCardTotalPrice);
	const userInfo = useSelector(getUserInfo);
	const [addressValue, setAddressValue] = useState(() => userInfo?.address);
	console.log(listItem, totalPrice)
	if (!isLogin) {
		history.replace('/login/add-to-cart');
	}
	useEffect(() => {}, []);

	const handleDeleteItem = (cartItem) => {
		let newItem = JSON.parse(JSON.stringify(listItem));
		newItem = newItem?.filter(
			(e) => !(e.product_id === cartItem.product_id && e.size === cartItem.size)
		);
		props.updateCart({ cart_details: newItem });
	};

	const handleBuyItem = async () => {
		if (!listItem?.length) return;
		const item = listItem.map((e) => ({
			product_id: e.product_id,
			amount: Number(e.amount),
			size: e.size,
		}));

		try {
			const dt = await itemApi.createBill({
				bill_details: item,
				address: addressValue,
			});
			if (dt.status === 200) {
				toast.success('Đặt hàng thành công');
				dispatch(actionSetNumberCart(0));
				history.push('/add-to-cart-success');
				props.getCarts();
			}
		} catch (error) {
			toast.error('Lỗi hệ thống. Không đặt được hàng');
		}
	};

	return (
		<CommonLayout>
			<Container style={{ padding: '7rem 0 2rem 0' }}>
				<Card className="card__content">
					<CardHeader>
						<CardTitle>
							<h3>Giỏ hàng</h3>
						</CardTitle>
					</CardHeader>
					<CardBody>
						<Table borderless>
							<thead>
								<tr>
									<th>Hình ảnh</th>
									<th>Tên sản phẩm</th>
									<th>Giá</th>
									<th>Kích thước</th>
									<th>Số lượng</th>
									<th>Tổng tiền</th>
									<th>Hành động</th>
								</tr>
							</thead>
							<tbody>
								{listItem.length > 0 &&
									listItem.map((e, index) => (
										<CartItem
											key={index}
											product={e}
											index={index}
											handleDeleteItem={() => handleDeleteItem(e)}
										/>
									))}
							</tbody>
						</Table>
					</CardBody>
					<input
						style={{ width: '90%', margin: 'auto' }}
						className="form-control form-control-lg"
						placeholder="Nhập địa chỉ nhận hàng"
						value={addressValue}
						onChange={(e) => setAddressValue(e.target.value)}
					/>
					<CardBody style={{ textAlign: 'right' }}>
						<CardSubtitle>
							<h5>Tổng tiền :&nbsp; {new Intl.NumberFormat().format(totalPrice || 0)} đ</h5>
						</CardSubtitle>
						<CardBody>
							<Button color="primary" className="me-3" onClick={handleBuyItem}>
								Mua hàng
							</Button>
							<Button
								color="secondary"
								onClick={() => {
									history.push('/menu');
								}}
							>
								Quay lại
							</Button>
						</CardBody>
					</CardBody>
				</Card>
			</Container>
		</CommonLayout>
	);
}

const mapStateToProps = (state) => {
	return {
		carts: state.carts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateCart: (data) => {
			dispatch(actions.update_cart({ data }));
		},
		getCarts: () => {
			dispatch(actions.get_carts());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
