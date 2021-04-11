import { Flex } from '@chakra-ui/react';
import ReactLoading from 'react-loading';

export default function Loading() {
	return (
		<Flex
			bg='twitter.50'
			height='100vh'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<ReactLoading type='balls' color='twitter.50' height='7vh' width='7vw' />
		</Flex>
	);
}
