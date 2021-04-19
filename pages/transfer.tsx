import { CheckCircleIcon, Search2Icon, WarningTwoIcon } from '@chakra-ui/icons';
import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Stack,
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import axiosConfig from '../config/axiosConfig';
import { useAccounts } from '../context/AccountContext';
import { useCustomer } from '../context/CustomerContext';
import { FocusableElement } from '@chakra-ui/utils';
import { encryptValue } from '../utils/security';
import { useRouter } from 'next/router';
import AlertDialogue from '../components/AlertDialogue';
import { useLogin } from '../context/LoginContext';
import Loading from '../components/Loading';
import { Account } from '../types/Account';

export default function Transaction() {
	const [accountSelectedIndex, setAccountSelectedIndex] = useState<number>(-1);
	const { accounts } = useAccounts();
	const { customer } = useCustomer();
	const [verifyButtonColor, setVerifyButtonColor] = useState<string>('blue');
	const [verifyButtonTitle, setVerifyButtonTitle] = useState<string>('Verify');
	const [loadingIcon, setLoadingIcon] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(0);
	const [isOpen, setIsOpen] = React.useState(false);
	const cancelRef = useRef<FocusableElement>();
	const router = useRouter();
	const { isLoggedIn } = useLogin();

	const [receiverAccountNumber, setReceiverAccountNumber] = useState<string>(
		''
	);
	const [receiverAccount, setReceiverAccount] = useState<Account>();

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [isLoggedIn]);

	if (!isLoggedIn) return <Loading />;

	function RenderIcon() {
		if (verifyButtonColor === 'blue') return <Search2Icon />;
		else if (verifyButtonColor === 'green') return <CheckCircleIcon />;
		else return <WarningTwoIcon />;
	}

	function alertCloseHandler() {
		setIsOpen(false);
	}

	async function alertContinueHandler() {
		try {
			setLoading(true);
			setIsOpen(false);

			const senderValue = await encryptValue(
				amount * -1,
				accounts[accountSelectedIndex].publicKey
			);

			const receiverValue = await encryptValue(
				amount,
				(receiverAccount as Account).publicKey
			);

			await axiosConfig.post(
				'transactions/transfer',
				{
					senderAccount: accounts[accountSelectedIndex as number].accountNumber,
					senderAmount: senderValue.toString(),
					receiverAccount: receiverAccount?.accountNumber,
					receiverAmount: receiverValue.toString(),
				},
				{ headers: { Authorization: `Token ${customer?.token}` } }
			);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
			router.push('/dashboard');
		}
	}

	async function verifyButtonHandler() {
		try {
			setLoadingIcon(true);
			const res = await axiosConfig.get(`/accounts/${receiverAccountNumber}`, {
				headers: { Authorization: `Token ${customer?.token}` },
			});
			setReceiverAccount(res.data);
		} catch (e) {
			setVerifyButtonColor('red');
			setVerifyButtonTitle('Try Again');
			setReceiverAccount(undefined);
		} finally {
			setLoadingIcon(false);
		}

		axiosConfig
			.get(`/accounts/${receiverAccountNumber}`, {
				headers: { Authorization: `Token ${customer?.token}` },
			})
			.then(res => {
				setVerifyButtonColor('green');
				setVerifyButtonTitle('Verified');
				setLoadingIcon(false);
				setReceiverAccount(res.data);
			})
			.catch(e => {
				setVerifyButtonColor('red');
				setVerifyButtonTitle('Try Again');
				setLoadingIcon(false);
				setReceiverAccount(undefined);
			});
	}

	return (
		<Flex
			bg='twitter.50'
			alignItems='center'
			justifyContent='center'
			height='100vh'
		>
			<Container
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				borderRadius='10px'
				margin='5%'
			>
				<Heading color='twitter.50' textAlign='center'>
					Transfer
				</Heading>
				<FormControl id='senderaccountNumber' isRequired my='5'>
					<FormLabel color='whiteAlpha.900'>Select your account</FormLabel>
					<Select
						placeholder='Select Account'
						bg='twitter.50'
						onChange={e => {
							setAccountSelectedIndex(+e.target.value);
						}}
					>
						{accounts.map((account, index) => (
							<option key={index} value={index}>
								{account.accountNumber}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl id='recieveraccountNumber' isRequired my='5'>
					<FormLabel color='whiteAlpha.900'>To Account Number</FormLabel>
					<InputGroup>
						<Input
							width='90%'
							color='whiteAlpha.900'
							placeholder="Reciever's Account Number"
							value={receiverAccountNumber}
							onChange={e => setReceiverAccountNumber(e.target.value)}
						/>
						<InputRightElement width='fit-content'>
							<IconButton
								isLoading={loadingIcon}
								onClick={verifyButtonHandler}
								colorScheme={verifyButtonColor}
								aria-label={verifyButtonTitle}
								icon={<RenderIcon />}
							/>
						</InputRightElement>
					</InputGroup>
					<FormHelperText color='whiteAlpha.900'>
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
					<Button
						isLoading={loading}
						loadingText='Processing Transaction'
						colorScheme='blue'
						mx='2'
						onClick={() => setIsOpen(true)}
					>
						Transfer
					</Button>
					<Button colorScheme='red' mx='2'>
						Reset
					</Button>
				</ButtonGroup>
			</Container>
			<AlertDialogue
				heading='Are you sure about this?'
				body={`You can't undo this action afterwards.`}
				isOpen={isOpen}
				onContinue={alertContinueHandler}
				onClose={alertCloseHandler}
				cancelRef={cancelRef}
			/>
		</Flex>
	);
}
