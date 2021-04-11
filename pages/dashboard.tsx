import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomerWelcomeScreen from '../components/CustomerWelcomeScreen';
import TransationSelector from '../components/TransactionSelector';
import { useCustomer } from '../context/CustomerContext';
import { useLogin } from '../context/LoginContext';

export default function Dashboard() {
	const { isLoggedIn } = useLogin();
	const router = useRouter();

	const { customer } = useCustomer();

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [isLoggedIn]);

	if (!isLoggedIn) return null;

	return (
		<Flex
			bg='twitter.50'
			height='100vh'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<CustomerWelcomeScreen />
			<TransationSelector />
		</Flex>
	);
}

// TODO: Need a link which redirects to edit details
// TODO: Need 3 buttons for 3 transactions
