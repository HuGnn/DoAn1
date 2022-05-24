import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { TableE } from '../components/TableE.jsx';
import CommonLayout from '../layouts/commonLayout.jsx';
import { actionGetReceipt, checkLogin, getReceipt } from '../redux/slice/home';

export const HistoryOrder = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const isLogin = useSelector(checkLogin);

	if (!isLogin) {
		history.replace('/login/history-receipt');
	}
	const receipt = useSelector(getReceipt);
	useEffect(() => {
		dispatch(actionGetReceipt());
	}, [dispatch]);

	return (
		<CommonLayout>
			<Container>
				<div
					className="px-5 py-5 mx-1"
					style={{ padding: '7rem 0 2rem 0', fontSize: '1rem' }}
				>
					<TableE data={receipt} />
				</div>
			</Container>
		</CommonLayout>
	);
};
