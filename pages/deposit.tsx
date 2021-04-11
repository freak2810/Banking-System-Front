import {
	Button,
	ButtonGroup,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	Stack,
} from '@chakra-ui/react';
import React from 'react';
export default function Deposit() {
	return (
		<Flex
			bg='blackAlpha.100'
			alignItems='center'
			justifyContent='center'
			height='100vh'
		>
			<Stack
				width='40%'
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				borderRadius='10px'
			>
				<FormControl id='accountNumber' isRequired my='5'>
					<FormLabel color='whiteAlpha.900'>Account Number</FormLabel>
					<Input
						color='whiteAlpha.900'
						placeholder='Enter the Account Number to Deposit Amount'
					/>
					<FormHelperText color='whiteAlpha.900'>
						There are 16 digits in the account number
					</FormHelperText>
				</FormControl>
				<FormControl id='amount' isRequired my='5'>
					<FormLabel color='whiteAlpha.900'>Amount</FormLabel>
					<NumberInput min={0} keepWithinRange={true}>
						<NumberInputField
							color='whiteAlpha.900'
							placeholder='Enter the amount that you would like to deposit'
						/>
					</NumberInput>
					<FormHelperText color='whiteAlpha.900'>
						Enter the amount in INR
					</FormHelperText>
				</FormControl>
				<ButtonGroup>
					<Button colorScheme='blue'>Deposit</Button>
					<Button colorScheme='red'>Reset</Button>
				</ButtonGroup>
			</Stack>
		</Flex>
	);
}
