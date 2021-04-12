import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { useCustomer } from '../../context/CustomerContext';
import { Customer } from '../../types/Customer';

export default function CustomerWelcomeScreen() {
	const { customer } = useCustomer();

	const { firstName, id } = customer as Customer;

	return (
		<Container
			bg='gray.900'
			boxShadow='dark-lg'
			padding='5'
			width='100%'
			borderRadius='10px'
			my='5'
		>
			<Box>
				<Heading color='twitter.50' mb={5}>
					Hey! {firstName}🐣
				</Heading>
				<Text color='twitter.50'>Customer ID: {id}</Text>
			</Box>
		</Container>
	);
}
