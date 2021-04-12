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
import { useEffect, useRef, useState } from 'react';
import axiosConfig from '../config/axiosConfig';
import { useCustomer } from '../context/CustomerContext';
import { useLogin } from '../context/LoginContext';

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [custId, setCustId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

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
			if (custId.length < 1) throw new Error('Invalid Custsomer ID');
			if (password.length < 1) throw new Error('Invalid Password');

			setLoading(true);

			const result = await axiosConfig.post('customers/login', {
				customerId: '84c60997-1988-4c78-97e7-393e30105840',
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
						<FormLabel color='whiteAlpha.900'>Customer ID</FormLabel>
						<Input
							marginY={2}
							borderColor='twitter.50'
							color='twitter.50'
							placeholder='Enter Customer ID'
							onChange={e => setCustId(e.target.value)}
						/>
					</FormControl>
					<InputGroup marginY={2}>
						<Input
							color='twitter.50'
							borderColor='twitter.50'
							placeholder='Enter Password'
							type={showPassword ? 'text' : 'password'}
							onChange={e => setPassword(e.target.value)}
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
