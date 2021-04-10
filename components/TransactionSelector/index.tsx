import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';

export default function TransationSelector() {
	return (
		<Container
			bg='gray.900'
			boxShadow='dark-lg'
			padding='5'
			width='100%'
			borderRadius='10px'
			my='5'
		>
			<Flex justifyContent='space-between'>
				<Button colorScheme='blue'>Transfer</Button>
				<Button colorScheme='green'>Deposit</Button>
				<Button colorScheme='pink'>Withdraw</Button>
			</Flex>
		</Container>
	);
}
