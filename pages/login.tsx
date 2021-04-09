import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { loginContext } from './loginContext';

export default function Login() {
	const { isLoggedIn } = useContext(loginContext);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<Flex
			height='100vh'
			bg='gray.900'
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
				<Heading color='whiteAlpha.800' mb={5}>
					Login
				</Heading>
				<Box>
					<Input
						marginY={2}
						borderColor='whiteAlpha.800'
						color='whiteAlpha.800'
						placeholder='Enter Customer ID'
					/>

					<InputGroup marginY={2}>
						<Input
							color='whiteAlpha.800'
							borderColor='whiteAlpha.800'
							placeholder='Enter Password'
							type={showPassword ? 'text' : 'password'}
						/>

						<InputRightElement width='fit-content'>
							<Button
								bg='whiteAlpha.800'
								onClick={() => setShowPassword(prevState => !prevState)}
							>
								{showPassword ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</Box>

				<Button
					marginTop='5'
					isFullWidth
					colorScheme='blue'
					variant='solid'
					size='md'
					onClick={() => {
						isLoggedIn(true);
					}}
				>
					Log In
				</Button>
			</Flex>
		</Flex>
	);
}
