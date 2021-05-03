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
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
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
				addToToast('Login Successful', '', 'success');
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

	const renderShowPasswordIcon = (showPassword: boolean) => {
		if (showPassword === true) return <ViewOffIcon />;
		else return <ViewIcon />;
	};

	return (
		<>
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
							<InputGroup my={2}>
								<InputLeftAddon
									bgColor='twitter.50'
									color='gray.900'
									children='+91'
								/>
								<Input
									borderColor='twitter.50'
									color='twitter.50'
									placeholder='Mobile Number'
									type='number'
									name='phoneNumber'
									value={phoneNumber}
									onChange={e => setPhoneNumber(e.target.value)}
								/>
							</InputGroup>
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
										icon={renderShowPasswordIcon(showPassword)}
									/>
								</InputRightElement>
							</InputGroup>
						</FormControl>
					</Box>
					<Flex justifyContent='center' width='100%'>
						<Button
							isLoading={loading}
							loadingText='Logging In'
							marginTop='5'
							isFullWidth
							colorScheme='blue'
							variant='solid'
							size='md'
							onClick={loginHandler}
							marginRight='5'
						>
							Log In
						</Button>
						<Button
							marginTop='5'
							isFullWidth
							colorScheme='teal'
							variant='solid'
							size='md'
							onClick={() => router.push('/signup')}
						>
							Sign Up
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
