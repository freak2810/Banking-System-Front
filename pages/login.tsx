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
import { stringify } from 'node:querystring';
import { Validate, Validate1 } from '../types/Validate';
export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [custId, setCustId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [values, setValues] = useState<Validate>({
		phonenumber: '',
		password: '',
	});
	const [errors, setErrors] = useState<Validate1>({});
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
	function handlechange(e: any) {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	async function loginHandler() {
		try {
			setErrors(validation(values));
			if (values.phonenumber.length < 1)
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
							name='phonenumber'
							//isInvalid={isError}
							value={values.phonenumber}
							onChange={handlechange}
						/>
						{errors.phonenumber && (
							<Text mb='10px' color='red'>
								{errors.phonenumber}
							</Text>
						)}
					</FormControl>
					<Text mb='10px' color='whiteAlpha.900'>
						Password
					</Text>
					<InputGroup marginY={2}>
						<Input
							color='twitter.50'
							borderColor='twitter.50'
							placeholder='Enter Password'
							name='password'
							type={showPassword ? 'text' : 'password'}
							//isInvalid={isPasswordError}
							value={values.password}
							onChange={handlechange}
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
