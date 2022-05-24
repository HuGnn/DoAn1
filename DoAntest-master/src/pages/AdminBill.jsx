import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Table } from 'reactstrap';
import RPagination from '../components/Pagination.jsx';
import {
	actionGetBillDetail,
	checkIsAdmin,
	checkLogin,
	getCurrentReceipt,
} from '../redux/slice/home.js';
import { actions, getBillData, getBillTotal } from '../redux/slice/bill';
import BillDetailModal from '../components/BillDetailModal.jsx';
import moment from 'moment';
import CommonLayout from '../layouts/commonLayout.jsx';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const caculatePageCount = (totalItem, itemsPerPage) => {
	if (totalItem % itemsPerPage === 0) return totalItem / itemsPerPage;
	return (totalItem - (totalItem % itemsPerPage)) / itemsPerPage + 1;
};

function AdminBill(props) {
	const isLogin = useSelector(checkLogin);
	const isAdmin = useSelector(checkIsAdmin);
	const history = useHistory();
	const dispatch = useDispatch();

	// if (!isLogin || !isAdmin) {
	if (!isAdmin) {
		history.replace('/login');
	}

	const [page, setPage] = React.useState(1);
	const [data, setData] = React.useState([]);
	const [selectedItem, setSelectedItem] = React.useState(undefined);
	const [open, setOpen] = React.useState(false);
	const billData = useSelector(getBillData);
	const billTotal = useSelector(getBillTotal);
	const billDetail = useSelector(getCurrentReceipt);

	const totalPage = caculatePageCount(billTotal, 10);

	useEffect(() => {
		props.getBills(1);
	}, []);

	React.useEffect(() => {
		if (page) {
			props.getBills(page);
		}
	}, [page]);

	React.useEffect(() => {
		if (billData) setData([...billData]);
	}, [billData]);

	const handleClickPagination = (data) => {
		const page = (data < 1 && 1) || (data > totalPage && totalPage) || data;
		setPage(page);
	};

	const handleClickView = (item) => {
		setSelectedItem(item);
		setOpen(true);
		dispatch(actionGetBillDetail(item.id));
	};

	const handleCloseModal = () => {
		setOpen(false);
	};

	return (
		<CommonLayout>
			<div className="p-5">
				<div className="d-flex justify-content-center">
					<h3>Hóa đơn</h3>
				</div>
				<Table>
					<thead>
						<tr>
							<th scope="col">Mã đơn hàng</th>
							<th scope="col">Ngày tạo</th>
							<th scope="col">Tổng tiền</th>
							<th scope="col" style={{ width: 150 }}>
								Hành động
							</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item) => (
								<tr key={item.id}>
									<td>#{item.id}</td>
									<td>
										{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}
									</td>
									<td>
										{Number.parseFloat(item?.total_price)?.toLocaleString(
											'vi-VN',
											{
												style: 'currency',
												currency: 'VND',
											}
										)}{' '}
									</td>
									<td>
										<span
											className="ps-btn ps-btn--sm ps-btn--small"
											onClick={() => {
												handleClickView(item);
											}}
										>
											Xem
										</span>
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

				<BillDetailModal
					open={open}
					data={billDetail}
					handleClose={handleCloseModal}
				/>
			</div>
		</CommonLayout>
	);
}

const mapStateToProps = (state) => {
	return {
		bills: state.bills,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBills: (page) => {
			dispatch(actions.get_bills({ page }));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBill);
