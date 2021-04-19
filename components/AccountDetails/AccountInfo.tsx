import { Container, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { PrivateKeyStore, useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import { Account } from '../../types/Account';
import { PrivateKey, PublicKey } from '../../types/Security';
import { decryptValue, encryptValue } from '../../utils/security';

export default function AccountInfo(props: Account) {
	const { getPrivateKey } = useAccounts();

	const [balance, setBalance] = useState<bigint>();

	const decrypt = async (
		balance: string,
		publicKey: PublicKey,
		privateKey: PrivateKey
	) => {
		return await decryptValue(balance, publicKey, privateKey);
	};

	useEffect(() => {
		const key = getPrivateKey(props.accountNumber);

		console.log(key);

		decryptValue(props.balance, props.publicKey, key?.privateKey as PrivateKey)
			.then(balance => setBalance(balance))
			.catch(e => console.log(e));
	}, [props.accountNumber]);

	return typeof balance === typeof 'undefined' ? null : (
		<Container my='5'>
			<Text color='twitter.50'>Account Number : {props.accountNumber}</Text>
			<Text color='twitter.50' textTransform='capitalize'>
				Account Type : {props.role}
			</Text>
			<Text color='twitter.50' textTransform='capitalize'>
				Created On : {new Date(props.accountCreated).toUTCString()}
			</Text>
			<Text color='twitter.50'>Balance : ₹ {balance?.toString()} /-</Text>
		</Container>
	);
}
