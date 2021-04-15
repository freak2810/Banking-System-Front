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
	InputLeftAddon,
	FormHelperText,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import axiosConfig from '../config/axiosConfig';
import { useCustomer } from '../context/CustomerContext';
import { useLogin } from '../context/LoginContext';

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [custId, setCustId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

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
	function ValidatePhone(e: any) {
		setCustId(e.target.value);
		const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (e.target.value.match(regex)) return setIsError(false);
		else {
			return setIsError(true);
		}
	}
	function ValidatePassword(e: any) {
		setPassword(e.target.value);
		const passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
		if (e.target.value.match(passreg)) return setIsPasswordError(false);
		else return setIsPasswordError(true);
	}

	async function loginHandler() {
		try {
			if (custId.length < 1) throw new Error('Invalid Custsomer ID');
			if (password.length < 1) throw new Error('Invalid Password');

			setLoading(true);

			const result = await axiosConfig.post('customers/login', {
				customerId: '67b5100f-46da-482f-a563-b8ae60717d98',
				password: 'shubhasya',
			});
			updateCustomer(result.data);
			setLoading(false);
			logIn();
			router.push('/dashboard');
		} catch (e) {
			addToToast('Please enter valid ID and Password');
			setCustId('');
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
						<FormLabel color='whiteAlpha.900'>Mobile No</FormLabel>

						<Input
							marginY={2}
							borderColor='twitter.50'
							color='twitter.50'
							placeholder='Enter Mobile No'
							type='tel'
							isInvalid={isError}
							value={custId}
							onChange={ValidatePhone}
						/>
					</FormControl>

					<InputGroup marginY={2}>
						<Input
							color='twitter.50'
							borderColor='twitter.50'
							placeholder='Enter Password'
							type={showPassword ? 'text' : 'password'}
							isInvalid={isPasswordError}
							value={password}
							onChange={ValidatePassword}
						/>

						<InputRightElement width='fit-content'>
							<IconButton
								aria-label={showPassword ? 'Hide' : 'Show' + 'password'}
								colorScheme='twitter.50'
								onClick={() => setShowPassword(prevState => !prevState)}
								icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
							/>
						</InputRightElement>
					</InputGroup>
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
