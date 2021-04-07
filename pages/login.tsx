import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Heading, Stack } from '@chakra-ui/layout';
import { useState } from 'react';

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loginVariant, setLoginVariant] = useState<boolean>(true);

	return (
		<Center h='100vh'>
			<Box align='center' boxShadow='base' padding='5' borderRadius='10px'>
				<Heading mb={5}>Login</Heading>
				<Stack>
					<Input placeholder='Enter Customer ID' />

					<InputGroup>
						<Input
							placeholder='Enter Password'
							type={showPassword ? 'text' : 'password'}
						/>

						<InputRightElement width='4.5rem'>
							<Button onClick={() => setShowPassword(prevState => !prevState)}>
								{showPassword ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</Stack>
				<Button
					marginTop='5'
					isFullWidth
					_hover={{ background: '#2b6cb0', color: '#fff' }}
					colorScheme='blue'
					variant='outline'
					size='md'
				>
					Log In
				</Button>
			</Box>
		</Center>
	);
}
