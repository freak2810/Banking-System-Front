import { Container, Heading, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { PrivateKeyStore, useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import ReactLoading from 'react-loading';
import { Accounts } from '../../types/Account';
import { PrivateKey } from '../../types/Security';
import AccountInfo from './AccountInfo';

export default function AccountDetails() {
	const { customer } = useCustomer();
	const { accounts, updateAllAccounts, updateAllPrivateKeys } = useAccounts();
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	useEffect(() => {
		axiosConfig
			.get(`accounts/customer/${customer?.id}`, {
				headers: { Authorization: `Token ${customer?.token}` },
			})
			.then(res => {
				updateAllAccounts(res.data);
				setLoading(false);
				return res.data as Accounts;
			})
			.then(accounts => {
				const axiosRequests = accounts.map(account => {
					return axiosConfig.get(`private/${account.accountNumber}`, {
						headers: { Authorization: `Token ${customer?.token}` },
					});
				});

				return Promise.all(axiosRequests);
			})
			.then(Results => {
				const privateKeys: PrivateKeyStore[] = Results.map(res => {
					return {
						accountNumber: res.config.url?.split('/')[1] as string,
						privateKey: res.data as PrivateKey,
					};
				});
				updateAllPrivateKeys(privateKeys);
			})
			.catch(e => console.error(e));
	}, []);

	if (loading)
		return (
			<ReactLoading type='balls' color='twitter.50' height='7vh' width='7vw' />
		);

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
			{selectedIndex > -1 ? <AccountInfo {...accounts[selectedIndex]} /> : null}
		</Container>
	);
}
