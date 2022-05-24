import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Container, Row } from 'reactstrap';
import AddNewProductModal from '../components/AddNewProductModal.jsx';
import ConfirmDeleteProductModal from '../components/ConfirmDeleteProductModal.jsx';
import { checkIsAdmin, checkLogin } from '../redux/slice/home.js';
import { actions } from '../redux/slice/product';
import { connect } from 'react-redux';
import RPagination from '../components/Pagination.jsx';
import shopApi from '../api/productApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header.jsx';
import CommonLayout from '../layouts/commonLayout.jsx';

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

function Admin(props) {
	const isAdmin = useSelector(checkIsAdmin);
	const history = useHistory();

	// if (!isLogin || !isAdmin) {
	if (!isAdmin) {
		history.replace('/login');
	}

	const [openAdd, setOpenAdd] = React.useState(false);
	const [openDelete, setOpenDelete] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState(undefined);
	const [action, setAction] = React.useState('open');
	const [page, setPage] = React.useState(1);
	const [search, setSearch] = React.useState(false);
	const [filter, setFilter] = React.useState('');
	const [data, setData] = React.useState([]);

	const getTotalPage = (total, size) => {
		const total_page = Math.floor(total / size);
		return total_page * size < total ? total_page + 1 : total_page;
	  };

	const total = props.products?.total || 0;
	const data_ = props.products?.data;
	const totalPage = getTotalPage(total, 10);

	React.useEffect(() => {
		if (page) {
			props.getProducts(page, filter || undefined);
		}
	}, [page, search]);

	React.useEffect(() => {
		data_ && setData(data_);
	}, [data_]);

	const handleCreate = async (value) => {
		const res = await shopApi.createProduct(value);
		setData([...data, { ...res.data, image_value: res.data.image }]);
		setOpenAdd(false);
	};

	const handleUpdate = async (id, value) => {
		const res = await shopApi.updateProduct(id, value);
		setData(
			data.map((item) =>
				item.id === res.data?.id
					? { ...res.data, image_value: res.data.image }
					: item
			)
		);
		setOpenAdd(false);
	};

	const handleDeleteProduct = async (id) => {
		await shopApi.deleteProduct(id);
		setData(data.filter((item) => item.id !== id));
		setOpenDelete(false);
	};

	const handleOpenAdd = () => {
		setOpenAdd(true);
		setAction('add');
		setSelectedItem(undefined);
	};

	const handleOpenUpdate = (item) => {
		return () => {
			setOpenAdd(true);
			setAction('update');
			setSelectedItem(item);
		};
	};

	const handleDelete = (item) => {
		return () => {
			setOpenDelete(true);
			setSelectedItem(item);
		};
	};

	const handleCloseAddModal = () => {
		setOpenAdd(false);
	};

	const handleCloseDeleteModal = () => {
		setOpenDelete(false);
	};

	const handleClickPagination = (data) => {
		const page = (data < 1 && 1) || (data > totalPage && totalPage) || data;
		setPage(page);
	};

	const handleChangeFilter = (e) => {
		const { value } = e.target;
		setFilter(value);
	};

	return (
		<CommonLayout>
			<div className="p-5">
				<div className="d-flex justify-content-center">
					<h3>Sản phẩm</h3>
				</div>
				<div className="d-flex justify-content-between">
					<button
						type="button"
						className="btn btn-primary m-2 px-5"
						onClick={handleOpenAdd}
					>
						Thêm
					</button>
					<div className="d-flex w-50">
						<input
							className="m-2 w-75 "
							type="text"
							placeholder="Tìm kiếm"
							value={filter}
							onChange={handleChangeFilter}
						/>
						<button
							type="button"
							className="btn btn-primary m-2 w-25"
							onClick={() => setSearch(!search)}
						>
							Tìm kiếm
						</button>
					</div>
				</div>
				<Table borderless>
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Tên sản phẩm</th>
							<th scope="col">Hình ảnh</th>
							<th scope="col">Miêu tả</th>
							<th scope="col">Loại</th>
							<th scope="col">Giá</th>
							<th scope="col">SL</th>
							<th scope="col" style={{ width: 150 }}>
								Thao tác
							</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>
										<h5>{item.name?.toUpperCase()}</h5>
									</td>
									<td>
										<p className="h6">
											<img src={item.image_value} width={50} />
										</p>
									</td>
									<td>
										<p className="h6">{item.description}</p>
									</td>
									<td>
										<p className="h6">{type_option[item.type]?.label}</p>
									</td>
									<td>
										<p className="h6">
											{item.price?.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND',
											})}
										</p>
									</td>
									<td>
										<p className="h6">
											{new Intl.NumberFormat().format(item.amount || 0)}
										</p>
									</td>
									<td>
										<div>
											<button
												className="btn btn-success m-1"
												onClick={handleOpenUpdate(item)}
											>
												Sửa
											</button>
											<button
												className="btn btn-danger m-1"
												onClick={handleDelete(item)}
											>
												Xóa
											</button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
				{totalPage > 1 && (
					<Container>
						<Row>
							<RPagination
								currentPage={page}
								totalPage={totalPage}
								handleClick={handleClickPagination}
							/>
						</Row>
					</Container>
				)}
				<AddNewProductModal
					open={openAdd}
					action={action}
					item={selectedItem}
					handleClose={handleCloseAddModal}
					handleCreate={handleCreate}
					handleUpdate={handleUpdate}
				/>
				<ConfirmDeleteProductModal
					open={openDelete}
					item={selectedItem}
					handleClose={handleCloseDeleteModal}
					handleDeleteProduct={handleDeleteProduct}
				/>
			</div>
		</CommonLayout>
	);
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: (page, filter) => {
			dispatch(actions.get_products({ page, filter }));
		},
		createProduct: (data) => {
			dispatch(actions.create_product({ data }));
		},
		updateProduct: (id, data) => {
			dispatch(actions.update_product({ id, data }));
		},
		deleteProduct: (id) => {
			dispatch(actions.delete_product({ id }));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
