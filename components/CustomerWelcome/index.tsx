import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useToast,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useCustomer } from '../../context/CustomerContext';
import { Customer } from '../../types/Customer';
import { passwordValidation } from '../../utils/validation';

export default function CustomerWelcomeScreen() {
	const { customer } = useCustomer();

	const [isOpen, setIsOpen] = useState(false);
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const cancelRef = useRef();

	const router = useRouter();

	const toast = useToast();
	const toastIdRef = useRef<string | undefined | number>();

	const { firstName, id, email, phone } = customer as Customer;

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

	const renderShowPasswordIcon = (showPassword: boolean) => {
		if (showPassword === true) return <ViewOffIcon />;
		else return <ViewIcon />;
	};

	async function onCreateConfirmHandler() {
		try {
			passwordValidation(password);

			try {
				const response = await axiosConfig.post(
					'/accounts',
					{
						id,
						password,
					},
					{
						headers: { Authorization: `Token ${customer?.token}` },
					}
				);

				addToToast(
					'Account created',
					`Account Number: ${response.data.accountNumber}`,
					'success'
				);
			} catch (e) {
				addToToast('Invalid Credentials');
			} finally {
				router.push('/login');
				setIsOpen(false);
			}
		} catch (e) {
			addToToast(e.message);
		}
	}

	function confirmDialogue() {
		return (
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={() => setIsOpen(false)}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent bg='gray.900'>
						<AlertDialogHeader
							color='twitter.50'
							fontSize='lg'
							fontWeight='bold'
						>
							Create new Account
						</AlertDialogHeader>
						<AlertDialogBody>
							<FormControl id='confirmPassword'>
								<FormLabel color='twitter.50'>Confirm Password</FormLabel>
								<InputGroup marginY={2}>
									<Input
										color='twitter.50'
										borderColor='twitter.50'
										placeholder='Password'
										name='password'
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									<InputRightElement width='fit-content'>
										<IconButton
											aria-label={showPassword ? 'Hide' : 'Show' + 'password'}
											colorScheme='twitter.50'
											onClick={() => setShowPassword(prevState => !prevState)}
											icon={renderShowPasswordIcon(showPassword)}
										/>
									</InputRightElement>
								</InputGroup>
							</FormControl>
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button colorScheme='linkedin' onClick={onCreateConfirmHandler}>
								Confirm
							</Button>
							<Button
								ref={cancelRef}
								colorScheme='red'
								onClick={() => setIsOpen(false)}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		);
	}

	return (
		<Container
			bg='gray.900'
			boxShadow='dark-lg'
			padding='5'
			width='100%'
			borderRadius='10px'
			my='5'
		>
			<Heading color='twitter.50' mb={5}>
				Hey! {firstName}🐣
			</Heading>
			<Flex alignItems='center' justifyContent='space-between'>
				<Box marginLeft='1'>
					<Text color='twitter.50'>Customer ID</Text>
					<Text color='twitter.50' fontWeight='bold'>
						{id}
					</Text>
					<Text color='twitter.50' mt='5'>
						Email ID
					</Text>
					<Text color='twitter.50' fontWeight='bold'>
						{email}
					</Text>
					<Text color='twitter.50' mt='5'>
						Phone Number
					</Text>
					<Text color='twitter.50' fontWeight='bold'>
						{phone}
					</Text>
				</Box>
				<Button
					colorScheme='linkedin'
					marginLeft='5px'
					onClick={() => setIsOpen(true)}
				>
					Open a new Account
				</Button>
			</Flex>
			{confirmDialogue()}
		</Container>
	);
}
