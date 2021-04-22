import { Container, Heading, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { PrivateKeyStore, useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import ReactLoading from 'react-loading';
import AccountInfo from './AccountInfo';
import { decryptValue } from '../../utils/security';

export default function AccountDetails() {
	const { customer } = useCustomer();
	const {
		accounts,
		updateAllAccounts,
		updateAllPrivateKeys,
		getPrivateKey,
	} = useAccounts();
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	useEffect(() => {
		async function fetch() {
			try {
				const response = await axiosConfig.get(
					`accounts/customer/${customer?.id}`,
					{
						headers: { Authorization: `Token ${customer?.token}` },
					}
				);

				setLoading(false);

				const accountDetails = response.data;

				const axiosRequests = accountDetails.map(account => {
					return axiosConfig.get(`private/${account.accountNumber}`, {
						headers: { Authorization: `Token ${customer?.token}` },
					});
				});

				const keys = await Promise.all(axiosRequests);

				const privateKeyStore: PrivateKeyStore[] = keys.map((eachKey: any) => {
					return {
						accountNumber: eachKey.config.url.split('/')[1],
						privateKey: eachKey.data,
					};
				});

				updateAllPrivateKeys(privateKeyStore);

				let decryptedResults = await accountDetails.map(async account => {
					return {
						...account,
						balance: await decryptValue(
							account.balance,
							account.publicKey,
							getPrivateKey(account.accountNumber).privateKey
						),
					};
				});

				decryptedResults = await Promise.all(decryptedResults);
				console.log(decryptedResults);
				updateAllAccounts(decryptedResults);
			} catch (e) {
				console.log(e);
			}
		}
		fetch();
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
function getPrivateKey(
	accountNumber: any
): import('../../types/Security').PrivateKey {
	throw new Error('Function not implemented.');
}
