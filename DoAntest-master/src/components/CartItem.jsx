import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { actions, getCardData } from '../redux/slice/cart';

export default function CartItem(props) {
	const { product, handleDeleteItem } = props;
	const [quantity, setQuantity] = useState(product.amount);
	const dataCart = useSelector(getCardData);
	const dispatch = useDispatch();

	const handleChange = ({ target }) => {
		if (Number.parseInt(target.value) < 1) return;
		let newData = [];
		dataCart.forEach((element) => {
			newData.push({
				...element,
			});
		});
		newData
			.filter((x) => x.product_id === product.product_id)
			.forEach((x) => (x.amount = Number.parseInt(target.value)));
		setQuantity(Number.parseInt(target.value));
		dispatch(actions.update_data_card({ data: newData }));
	};

	return (
		<tr>
			<th scope="row">
				<img src={product?.image} alt="" id="image-cart" />
			</th>
			<td>
				<h5>{product?.product_name}</h5>
			</td>
			<td>
				{product?.price?.toLocaleString('vi-VN', {
					style: 'currency',
					currency: 'VND',
				})}
			</td>
			<td>
				<p>{product?.size}</p>
			</td>
			<td>
				<input
					type="number"
					value={quantity}
					onChange={handleChange}
					style={{ width: '50px' }}
				/>
			</td>
			<td>
				{(Number.parseFloat(product?.price) * quantity).toLocaleString(
					'vi-VN',
					{
						style: 'currency',
						currency: 'VND',
					}
				)}
			</td>
			<td>
				<Button
					size="sm"
					color="danger"
					outline
					onClick={() => handleDeleteItem(product?.id)}
				>
					Xóa
				</Button>
			</td>
		</tr>
	);
}
