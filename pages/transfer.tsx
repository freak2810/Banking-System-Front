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
	IconButton,
	Input,
	NumberInput,
	NumberInputField,
	Select,
	useToast,
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
import {
	accountNumberValidation,
	accountSelectedValidation,
	amountValidation,
} from '../utils/validation';
import SEO from '../components/SEO';

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

	const toast = useToast();
	const toastIdRef = useRef<string | undefined | number>();

	function addToToast(
		title: string,
		description?: string,
		status?: string
	): void {
		toastIdRef.current = toast({
			title,
			description,
			duration: 5000,
			isClosable: true,
			position: 'top',
			status: status === 'success' ? 'success' : 'error',
		});
	}

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

			const negativeMultiplier = await encryptValue(
				amount * -1,
				accounts[accountSelectedIndex].publicKey
			);

			const senderValue = await encryptValue(
				amount,
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
					senderAmount: senderValue,
					receiverAccount: receiverAccount?.accountNumber,
					receiverAmount: receiverValue,
					negativeMultiplier,
				},
				{ headers: { Authorization: `Token ${customer?.token}` } }
			);

			addToToast('Transaction Successful', `Amount: ${amount}`, 'success');
		} catch (e) {
			console.log(e);
			addToToast('Internal Server Error', 'Please try again later');
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
			setVerifyButtonColor('green');
			setVerifyButtonTitle('Verified');
		} catch (e) {
			setVerifyButtonColor('red');
			setVerifyButtonTitle('Try Again');
			setReceiverAccount(undefined);
		} finally {
			setLoadingIcon(false);
		}
	}

	function transferButtonHandler() {
		try {
			accountSelectedValidation(accountSelectedIndex);
			accountNumberValidation(
				receiverAccountNumber,
				receiverAccount ? true : false
			);
			amountValidation(amount, accounts[accountSelectedIndex].balance);
			setIsOpen(true);
		} catch (e) {
			addToToast(e.message);
		}
	}

	function accountNumberChangedHandler(accountNumber: string) {
		setReceiverAccountNumber(accountNumber);
		setVerifyButtonColor('blue');
		setVerifyButtonTitle('Verify');
	}

	return (
		<>
			<SEO title='Transfer' />
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
						<Flex>
							<Input
								color='whiteAlpha.900'
								placeholder='Account Number'
								value={receiverAccountNumber}
								onChange={e => accountNumberChangedHandler(e.target.value)}
							/>
							<IconButton
								marginLeft='1'
								isLoading={loadingIcon}
								onClick={verifyButtonHandler}
								colorScheme={verifyButtonColor}
								aria-label={verifyButtonTitle}
								icon={<RenderIcon />}
							/>
						</Flex>
						<FormHelperText
							color='whiteAlpha.900'
							textDecoration={
								verifyButtonColor === 'green' ? 'underline' : 'none'
							}
						>
							{verifyButtonColor === 'green'
								? `This Account belongs to ${
										(receiverAccount as any).customer.firstName
								  } ${(receiverAccount as any).customer.lastName}`
								: 'There are 16 digits in the account number'}
						</FormHelperText>
					</FormControl>
					<FormControl id='amount' isRequired my='5'>
						<FormLabel color='twitter.50'>Amount</FormLabel>
						<NumberInput min={0} keepWithinRange={true}>
							<NumberInputField
								color='twitter.50'
								placeholder='Amount to Transfer'
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
							onClick={transferButtonHandler}
						>
							Transfer
						</Button>
						<Button
							colorScheme='red'
							mx='2'
							onClick={() => router.push('/dashboard')}
						>
							Go Back
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
		</>
	);
}
