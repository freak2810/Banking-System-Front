import { Container, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAccounts } from '../../context/AccountContext';
import { Account } from '../../types/Account';
import { PrivateKey } from '../../types/Security';
import { decryptValue } from '../../utils/security';

export default function AccountInfo(props: Account) {
	const { getPrivateKey } = useAccounts();

	const [balance, setBalance] = useState<string>();

	useEffect(() => {
		const key = getPrivateKey(props.accountNumber);

		decryptValue(props.balance, props.publicKey, key?.privateKey as PrivateKey)
			.then(balance => setBalance(balance))
			.catch(e => console.log(e));
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
			<Text color='twitter.50'>Balance : ₹ {balance?.toString()} /-</Text>
		</Container>
	);
}
