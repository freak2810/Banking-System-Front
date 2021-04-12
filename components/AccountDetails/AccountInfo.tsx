import { Container, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useCustomer } from '../../context/CustomerContext';
import { Account } from '../../types/Account';
import { PrivateKey } from '../../types/Security';
import { decryptValue, encryptValue } from '../../utils/security';

export default function AccountInfo(props: Account) {
	const { customer } = useCustomer();

	const [balance, setBalance] = useState<bigint>();
	const [privateKey, setPrivateKey] = useState({});

	useEffect(() => {
		axiosConfig
			.get(`private/${props.accountNumber}`, {
				headers: { Authorization: `Token ${customer?.token}` },
			})
			.then(res => {
				return decryptValue(props.balance, props.publicKey, res.data);
			})
			.then(balance => {
				console.log(balance);
				setBalance(balance);
			})
			.catch(err => console.log(err));
	}, [props.accountNumber]);

	return !balance ? null : (
		<Container my='5'>
			<Text color='twitter.50'>Account Number : {props.accountNumber}</Text>
			<Text color='twitter.50' textTransform='capitalize'>
				Account Type : {props.role}
			</Text>
			<Text color='twitter.50' textTransform='capitalize'>
				Created On : {new Date(props.accountCreated).toUTCString()}
			</Text>
			{balance ? (
				<Text color='twitter.50'>Balance : {balance.toString()}</Text>
			) : null}
		</Container>
	);
}
