import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Stack,
} from '@chakra-ui/react';
import React from 'react';

export default function Transaction() {
	return (
		<Flex
			bg='blackAlpha.300'
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
				<FormControl id='senderaccountNumber' isRequired my='5'>
					<FormLabel color='whiteAlpha.900'>From Account Number</FormLabel>
					<Input
						color='whiteAlpha.900'
						placeholder="Enter the reciever's Account Number"
					/>
					<FormHelperText color='whiteAlpha.900'>
						There are 16 digits in the account number
					</FormHelperText>
				</FormControl>
				<FormControl id='recieveraccountNumber' isRequired my='5'>
					<FormLabel color='whiteAlpha.900'>To Account Number</FormLabel>
					<Input
						color='whiteAlpha.900'
						placeholder="Enter the reciever's Account Number"
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
							placeholder='Enter the amount that you would like to send'
						/>
						<NumberInputStepper color='whiteAlpha.900'>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<FormHelperText color='whiteAlpha.900'>
						Enter the amount in INR
					</FormHelperText>
				</FormControl>

				<ButtonGroup>
					<Button colorScheme='blue'>Transfer</Button>
					<Button colorScheme='red'>Reset</Button>
				</ButtonGroup>
			</Stack>
		</Flex>
	);
}
