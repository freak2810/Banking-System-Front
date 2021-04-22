import { Container, Text } from '@chakra-ui/react';
import { Account } from '../../types/Account';

export default function AccountInfo(props: Account) {
	const renderDate = (dateString: string) => {
		const date = new Date(dateString);
		return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
	};

	return (
		<Container my='5'>
			<Text color='twitter.50'>Account Number : {props.accountNumber}</Text>
			<Text color='twitter.50' textTransform='capitalize'>
				Account Type : {props.role}
			</Text>
			<Text color='twitter.50' textTransform='capitalize'>
				Created On : {renderDate(props.accountCreated)}
			</Text>
			<Text color='twitter.50'>Balance : ₹ {props.balance} /-</Text>
		</Container>
	);
}
