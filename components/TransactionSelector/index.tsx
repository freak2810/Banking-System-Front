import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function TransationSelector() {
	const router = useRouter();

	return (
		<Container
			bg='gray.900'
			boxShadow='dark-lg'
			padding='5'
			width='100%'
			borderRadius='10px'
		>
			<Flex justifyContent='space-around' wrap='wrap'>
				<Button
					colorScheme='blue'
					size='md'
					m='2'
					onClick={() => router.push('/transfer')}
				>
					Transfer
				</Button>
				<Button
					m='2'
					colorScheme='green'
					onClick={() => router.push('/deposit')}
				>
					Deposit
				</Button>
				<Button
					m='2'
					colorScheme='pink'
					onClick={() => router.push('/withdraw')}
				>
					Withdraw
				</Button>
			</Flex>
		</Container>
	);
}
