import {
	Container,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import React from 'react';

export default function Transaction() {
	return (
		<Container>
			<FormControl id='accountNumber' isRequired>
				<FormLabel>Account Number</FormLabel>
				<Input placeholder="Enter the reciever's Account Number" />
				<FormHelperText>
					There are 16 digits in the account number
				</FormHelperText>
			</FormControl>
		</Container>
	);
}
