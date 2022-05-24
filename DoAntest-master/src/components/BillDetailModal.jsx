import moment from 'moment';
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { logoImg } from '../asset/index.js';

function BillDetailModal({ open, handleClose, data }) {
	const handleClickClose = () => {
		handleClose();
	};

	return (
		<Modal toggle={handleClickClose} isOpen={open} className="custom-modal">
			<ModalHeader toggle={handleClickClose}>
				<div className="card-header">
					<h3 className="my-3">Chi tiết đơn đặt hàng</h3>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="card ">
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
											<span>Mã hóa đơn:</span>{' '}
											<span className="order-detail-value">#{data?.id}</span>
										</p>
										<span>Thời gian:</span>{' '}
										<span className="order-detail-value">
											{moment(data?.created_at).format('DD-MM-YYYY hh:mm:ss')}
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
												<th className="text-center">#</th>
												<th>Sản phẩm</th>
												<th className="text-right">Số lượng</th>
												<th className="text-right">Giá</th>
											</tr>
										</thead>
										<tbody>
											{data?.bill_details?.length > 0 &&
												data?.bill_details?.map((item, index) => (
													<tr key={item?.id}>
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
						</div>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={handleClose}>Hủy bỏ</Button>
			</ModalFooter>
		</Modal>
	);
}

export default BillDetailModal;
