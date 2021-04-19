import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import {
	Button,
	Box,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
	FormControl,
	FormLabel,
	useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import axiosConfig from '../config/axiosConfig';
import { useCustomer } from '../context/CustomerContext';
import { useLogin } from '../context/LoginContext';
import { loginValidation } from '../utils/validation';

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { updateCustomer } = useCustomer();
	const { isLoggedIn, logIn } = useLogin();

	const router = useRouter();

	const toast = useToast();
	const toastIdRef = useRef<string | undefined | number>();

	useEffect(() => {
		if (isLoggedIn) router.push('/dashboard');
	}, []);

	if (isLoggedIn) return null;

	function addToToast(title: string, description?: string): void {
		toastIdRef.current = toast({
			title,
			description,
			duration: 5000,
			isClosable: true,
			position: 'top',
			status: 'error',
		});
	}

	async function loginHandler() {
		try {
			loginValidation(phoneNumber, password);

			setLoading(true);

			try {
				const result = await axiosConfig.post('customers/login', {
					phoneNumber,
					password,
				});

				updateCustomer(result.data);
				setLoading(false);
				logIn();
				router.push('/dashboard');
			} catch (e) {
				addToToast('Invalid Credentials');
			}
		} catch (e) {
			addToToast(e.message);
		} finally {
			setPhoneNumber('');
			setPassword('');
			setLoading(false);
		}
	}

	return (
		<Flex
			height='100vh'
			bg='twitter.50'
			justifyContent='center'
			alignItems='center'
		>
			<Flex
				alignItems='center'
				bg='gray.900'
				direction='column'
				justifyContent='space-evenly'
				boxShadow='dark-lg'
				padding='5'
				borderRadius='10px'
			>
				<Heading color='twitter.50' mb={5}>
					Login
				</Heading>
				<Box>
					<FormControl id='custId'>
						<FormLabel color='whiteAlpha.900'>Mobile Number</FormLabel>

						<Input
							marginY={2}
							borderColor='twitter.50'
							color='twitter.50'
							placeholder='Mobile Number'
							type='number'
							name='phoneNumber'
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
						/>
					</FormControl>

					<FormControl>
						<FormLabel color='whiteAlpha.900'>Password</FormLabel>
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
									icon={showPassword === true ? <ViewOffIcon /> : <ViewIcon />}
								/>
							</InputRightElement>
						</InputGroup>
					</FormControl>
				</Box>
				<Button
					isLoading={loading}
					loadingText='Logging In'
					marginTop='5'
					isFullWidth
					colorScheme='blue'
					variant='solid'
					size='md'
					onClick={loginHandler}
				>
					Log In
				</Button>
			</Flex>
		</Flex>
	);
}
