import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import AlertDialogue from '../components/AlertDialogue';
import { FocusableElement } from '@chakra-ui/utils';

export default function Deposit() {
	const [accountNumber, setAccountNumber] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);

	const [isOpen, setIsOpen] = React.useState(false);
	const cancelRef = useRef<FocusableElement>();

	function resetButtonHandler() {
		setAccountNumber('');
		setAmount(0);
	}

	function alertCloseHandler() {
		setIsOpen(false);
	}

	return (
		<Flex
			bg='twitter.50'
			alignItems='center'
			justifyContent='center'
			height='100vh'
		>
			<AlertDialogue
				heading='Are you sure about this?'
				body={`You can't undo this action afterwards.`}
				isOpen={isOpen}
				onClose={alertCloseHandler}
				cancelRef={cancelRef}
			/>
			<Container
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				borderRadius='10px'
				margin='5%'
			>
				<Heading color='twitter.50' textAlign='center'>
					Deposit
				</Heading>
				<FormControl id='accountNumber' isRequired my='5'>
					<FormLabel color='twitter.50'>Account Number</FormLabel>
					<Input
						color='twitter.50'
						placeholder='Enter the Account Number to Deposit Amount'
						value={accountNumber}
						onChange={e => setAccountNumber(e.target.value)}
					/>
					<FormHelperText color='twitter.50'>
						There are 16 digits in the account number
					</FormHelperText>
				</FormControl>
				<FormControl id='amount' isRequired my='5'>
					<FormLabel color='twitter.50'>Amount</FormLabel>
					<NumberInput min={0} keepWithinRange={true}>
						<NumberInputField
							color='twitter.50'
							placeholder='Enter the amount that you would like to deposit'
							value={amount}
							onChange={e => setAmount(+e.target.value)}
						/>
					</NumberInput>
					<FormHelperText color='twitter.50'>Amount in INR</FormHelperText>
				</FormControl>
				<ButtonGroup width='100%' justifyContent='center'>
					<Button colorScheme='blue' mx='2' onClick={() => setIsOpen(true)}>
						Deposit
					</Button>
					<Button colorScheme='red' mx='2' onClick={resetButtonHandler}>
						Reset
					</Button>
				</ButtonGroup>
			</Container>
		</Flex>
	);
}
