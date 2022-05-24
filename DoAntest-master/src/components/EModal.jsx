import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import { actionSetNumberCart } from '../redux/slice/item';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { actions, getCardData } from '../redux/slice/cart';
import { checkLogin } from '../redux/slice/home';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const type_option = {
	newest: {
		label: 'Đồ Nam',
	},
	bestseller: {
		label: 'Đồ Nữ',
	},
	popular: {
		label: 'Đồ Cho Trẻ',
	},
};

export function EModal(props) {
	const { open, handleClose, item } = props;
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState('M');
	const isLogin = useSelector(checkLogin);
	const dispatch = useDispatch();
	const cartData = useSelector(getCardData);
	const history = useHistory();
	const handleSize = (e) => {
		const { value } = e.target;
		setSize(value);
	};
	const hanldeQuantity = (number) => {
		const total = item.amount ?? 0;
		if (number < 1) return;
		if (number > total) return;
		setQuantity(number);
	};
	const handleClickClose = () => {
		handleClose();
		setQuantity(1);
		setSize('M');
	};
	const handleAddtoCart = () => {
		if (!isLogin) {
			history.replace('/login');
			return;
		}
		let body = null;
		let flag = false;
		let newData = JSON.parse(JSON.stringify(cartData));
		if (newData instanceof Array) {
			newData.forEach((element) => {
				if (element.product_id === item.id && element.size === size) {
					element.amount =
						Number.parseInt(element.amount) + Number.parseInt(quantity);
					body = { cartDetail: newData };
					flag = true;
					return;
				}
			});

			if (flag) {
				body = {
					cart_details: newData,
				};
			} else {
				const newItem = {
					...item,
					product_id: item.id,
					amount: quantity,
					size: size,
					product_name: item.name,
				};
				newData.push(newItem);
				body = {
					cart_details: newData,
				};
			}
		}

		if (body === null) {
			body = {
				cart_details: [
					{
						...item,
						product_id: item.id,
						amount: quantity,
						size: size,
						product_name: item.name,
					},
				],
			};
		}

		if (props.updateCart instanceof Function) {
			props.updateCart(body);
		}

		dispatch(actions.update_data_card({ data: body.cart_details }));
		setQuantity(1);
		setSize('M');
		handleClose();
		toast.success('Thêm giỏ hàng thành công');
	};
	return (
		<div>
			<Modal toggle={handleClickClose} isOpen={open}>
				<ModalHeader toggle={handleClickClose}>Đặt hàng</ModalHeader>
				<ModalBody>
					<div className="modal__container">
						<img src={item?.image_value} alt="" />
						<div className="modal__container-right">
							<p>{item?.name}</p>
							<p>Loại : {type_option[item.type]?.label}</p>
							<p>
								Giá :&nbsp;
								{new Intl.NumberFormat().format(item?.price || 0)} VND
							</p>
							<div>
								<p>Kích thước:</p>
								<select
									name="sizes"
									id="sizes"
									value={size}
									onChange={handleSize}
								>
									<option value="S">S</option>
									<option value="M">M</option>
									<option value="L">L</option>
									<option value="XL">XL</option>
									<option value="L">L</option>
								</select>
							</div>
							<p>Số lượng {`(còn ${item?.amount ?? 0} sản phẩm)`} :&nbsp;</p>
							<div className="buttons_added">
								<input
									className="minus is-form"
									type="button"
									value="-"
									onClick={() => hanldeQuantity(quantity - 1)}
								/>
								<input
									aria-label="quantity"
									className="input-qty"
									name=""
									type="number"
									value={quantity}
								/>
								<input
									className="plus is-form"
									type="button"
									value="+"
									onClick={() => hanldeQuantity(quantity + 1)}
								/>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						disabled={!item?.amount}
						onClick={() => handleAddtoCart(item)}
					>
						Thêm vào giỏ
					</Button>{' '}
					<Button onClick={handleClose}>Hủy bỏ</Button>
				</ModalFooter>
			</Modal>
		</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EModal);
