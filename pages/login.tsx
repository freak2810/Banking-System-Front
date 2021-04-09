import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Button,
	Container,
	Box,
	Center,
	Flex,
	Heading,
	Stack,
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLogin } from '../context/LoginContext';

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { isLoggedIn, logIn, logOut } = useLogin();

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
					<Input
						marginY={2}
						borderColor='twitter.50'
						color='twitter.50'
						placeholder='Enter Customer ID'
					/>

					<InputGroup marginY={2}>
						<Input
							color='twitter.50'
							borderColor='twitter.50'
							placeholder='Enter Password'
							type={showPassword ? 'text' : 'password'}
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
					marginTop='5'
					isFullWidth
					colorScheme='blue'
					variant='solid'
					size='md'
					onClick={logIn}
				>
					Log In
				</Button>
			</Flex>
		</Flex>
	);
}
