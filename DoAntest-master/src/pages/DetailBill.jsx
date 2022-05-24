import moment from 'moment';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import { logoImg } from '../asset/index.js';
import CommonLayout from '../layouts/commonLayout.jsx';
import { checkLogin, getCurrentReceipt } from '../redux/slice/home.js';

const Detailbill = () => {
	const data = useSelector(getCurrentReceipt);
	const history = useHistory();
	const isLogin = useSelector(checkLogin);

	console.log('XXX DATA', data);
	if (!isLogin) {
		history.replace('/login/detail-receipt');
	}

	useEffect(() => {
		// getBillDetail(id);
	}, []);

	return (
		<CommonLayout>
			<Container style={{ padding: '7rem 0 2rem 0', fontSize: '1rem' }}>
				<div className="card ">
					<div className="card-header">
						<h3 className="my-3">Chi tiết đơn đặt hàng</h3>
					</div>
					<div className="card-body p-4">
						<div className="customer-order-detail">
							<div className="row">
								<div className="col-md-6">
									<div className="order-slogan">
										<img
											width="200px"
											src={logoImg.logo}
											alt="Martfury - Laravel Ecommerce system"
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="order-meta">
										<p>
											<span>Mã hóa đơn:</span> {data?.id}
											<span className="order-detail-value">
												<div id={data?.id}></div>
											</span>
										</p>
										<span>Thời gian:</span>{' '}
										<span className="order-detail-value">
											{moment(data.created_at).format('DD-MM-YYYY hh:mm:ss')}
										</span>
									</div>
								</div>
							</div>
							<h5>Thông tin đơn hàng</h5>

							<div className="col-12">
								<span>Tổng tiền:</span>{' '}
								<span className="order-detail-value">
									{' '}
									{Number.parseFloat(data?.total_price)?.toLocaleString(
										'vi-VN',
										{
											style: 'currency',
											currency: 'VND',
										}
									)}{' '}
								</span>
							</div>
							<div className="col-12">
								<span>Phí ship:</span>{' '}
								<span className="order-detail-value">
									{' '}
									{15000?.toLocaleString('vi-VN', {
										style: 'currency',
										currency: 'VND',
									})}{' '}
								</span>
							</div>
							<div className="col-12"></div>

							<h5>Chi tiết đặt hàng</h5>
							<div className="col-12">
								<div className="table-responsive">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th className="text-center">STT</th>
												<th>Sản phẩm</th>
												<th className="text-right">Số lượng</th>
												<th className="text-right">Giá</th>
											</tr>
										</thead>
										<tbody>
											{data?.bill_details?.length &&
												data?.bill_details?.map((item, index) => (
													<tr key={item?.product_id}>
														<td className="text-center">{index + 1}</td>

														<td>{item?.product_name}</td>
														<td className="">{item?.amount} </td>
														<td className="">
															{Number.parseFloat(item?.price)?.toLocaleString(
																'vi-VN',
																{
																	style: 'currency',
																	currency: 'VND',
																}
															)}{' '}
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
							<div>
								<span
									className="ps-btn ps-btn--sm ps-btn--danger"
									onClick={() => history.push('/history-receipt')}
								>
									Quay lại
								</span>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</CommonLayout>
	);
};

export default Detailbill;
