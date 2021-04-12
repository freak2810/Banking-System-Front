import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AccountDetails from '../components/AccountDetails';
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
			height='100vh'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<CustomerWelcomeScreen />
			<TransationSelector />
			<AccountDetails />
		</Flex>
	);
}

// TODO: Need a link which redirects to edit details
// TODO: Need 3 buttons for 3 transactions
