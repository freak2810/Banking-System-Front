import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomerWelcomeScreen from '../components/CustomerWelcome';
import Loading from '../components/Loading';
import TransationSelector from '../components/TransactionSelector';
import { useLogin } from '../context/LoginContext';

export default function Dashboard() {
	const { isLoggedIn } = useLogin();
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [isLoggedIn]);

	if (!isLoggedIn) return <Loading />;

	return (
		<Flex
			bg='twitter.50'
			minHeight='100vh'
			direction='column'
			justifyContent='center'
			alignItems='center'
			padding='5%'
		>
			<CustomerWelcomeScreen />
			<TransationSelector />
		</Flex>
	);
}

// TODO: Need a link which redirects to edit details
