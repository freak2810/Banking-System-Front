import { Container, Heading, Select, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import ReactLoading from 'react-loading';
import AccountInfo from './AccountInfo';

export default function AccountDetails() {
	const { customer } = useCustomer();
	const { accounts, updateAllAccounts } = useAccounts();
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	useEffect(() => {
		axiosConfig
			.get(`accounts/customer/${customer?.id}`, {
				headers: { Authorization: `Token ${customer?.token}` },
			})
			.then(res => {
				updateAllAccounts(res.data);
				console.log(res.data);
				setLoading(false);
			})
			.catch(e => console.error(e));
	}, []);

	if (loading)
		return (
			<ReactLoading type='balls' color='twitter.50' height='7vh' width='7vw' />
		);

	// function renderAccountInfo(index?: number) {
	// 	if (index) return <AccountInfo {...accounts[index]} />;
	// 	else return null;
	// }

	return (
		<Container
			bg='gray.900'
			boxShadow='dark-lg'
			padding='5'
			width='100%'
			borderRadius='10px'
			my='5'
		>
			<Heading color='twitter.50' my='5'>
				Account Details
			</Heading>
			<Select
				placeholder='Select Account'
				bg='twitter.50'
				onChange={e => {
					setSelectedIndex(+e.target.value);
				}}
			>
				{accounts.map((account, index) => (
					<option color='teal' key={index} value={index}>
						{account.accountNumber}
					</option>
				))}
			</Select>
			<AccountInfo {...accounts[selectedIndex as number]} />
		</Container>
	);
}
