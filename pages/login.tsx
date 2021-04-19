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
	SliderProvider,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import axiosConfig from '../config/axiosConfig';
import { useCustomer } from '../context/CustomerContext';
import { useLogin } from '../context/LoginContext';
import validation from './validation';
import { Validate, ValidateErrorProps } from '../types/Validate';
export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [custId, setCustId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [values, setValues] = useState<Validate>({
		phoneNumber: '',
		password: '',
	});
	const [errors, setErrors] = useState<ValidateErrorProps>({});
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
			setErrors(validation(values));
			if (values.phoneNumber.length < 1)
				throw new Error('Invalid Custsomer ID');
			if (values.password.length < 1) throw new Error('Invalid Password');

			setLoading(true);
			//67b5100f-46da-482f-a563-b8ae60717d98
			const result = await axiosConfig.post('customers/login', {
				customerId: '',
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
							name='phoneNumber'
							value={values.phoneNumber}
							onChange={e => {
								setValues({ ...values, [e.target.name]: e.target.value });
							}}
						/>
						{errors.phoneNumber && (
							<Text mb='10px' color='red'>
								{errors.phoneNumber}
							</Text>
						)}
					</FormControl>

					<FormControl>
						<FormLabel color='whiteAlpha.900'>Password</FormLabel>
						<InputGroup marginY={2}>
							<Input
								color='twitter.50'
								borderColor='twitter.50'
								placeholder='Enter Password'
								name='password'
								type={showPassword ? 'text' : 'password'}
								value={values.password}
								onChange={e => {
									setValues({ ...values, [e.target.name]: e.target.value });
								}}
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
						{errors.password && <Text color='red'>{errors.password}</Text>}
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
