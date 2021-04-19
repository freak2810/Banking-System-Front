import { useEffect } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useCustomer } from '../../context/CustomerContext';
import { Account } from '../../types/Account';

export default function StatementGenerator(props: Account) {
	const { customer } = useCustomer();

	useEffect(() => {
		async function fetch() {
			const result = await axiosConfig.get(
				`transactions/${props.accountNumber}`,
				{
					headers: { Authorization: `Token ${customer?.token}` },
				}
			);

			console.log(result.data);
		}
		fetch();
	}, [props.accountNumber]);

	return <div></div>;
}
