import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AccountDetails from '../components/AccountDetails';
import CustomerWelcomeScreen from '../components/CustomerWelcome';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import TransationSelector from '../components/TransactionSelector';
import { useCustomer } from '../context/CustomerContext';
import { useLogin } from '../context/LoginContext';

export default function Dashboard() {
	const { isLoggedIn } = useLogin();
	const { customer } = useCustomer();
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [isLoggedIn]);

	if (!isLoggedIn) return <Loading />;

	return (
		<>
			<SEO title={`${customer.firstName}'s Dash`} />
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
				<AccountDetails />
			</Flex>
		</>
	);
}

// TODO: Need a link which redirects to edit details
