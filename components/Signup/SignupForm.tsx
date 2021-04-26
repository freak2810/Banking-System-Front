import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
	Container,
	Flex,
	Heading,
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	InputGroup,
	IconButton,
	InputRightElement,
	Box,
	Center,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface Customer {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	age: number;
}

interface SignUpProps {
	customer: Customer;
	valueChangedHandler: (target, value) => void;
}

export default function SignupForm({
	customer,
	valueChangedHandler,
}: SignUpProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<Container
			bg='gray.900'
			maxW='container.lg'
			boxShadow='dark-lg'
			padding='6'
			borderRadius='10px'
			margin='5%'
			centerContent
			color='twitter.50'
			height='fit-content'
		>
			<Heading my='5'>Sign Up</Heading>
			<Flex wrap='wrap' justify='space-around' width='100%' my='2'>
				<FormControl maxW='450px' id='firstName' isRequired>
					<FormLabel>First Name</FormLabel>
					<Input
						value={customer.firstName}
						onChange={e => valueChangedHandler(e.target['id'], e.target.value)}
						placeholder='First Name'
						type='text'
					/>
				</FormControl>
				<FormControl maxW='450px' id='lastName' isRequired>
					<FormLabel>Last Name</FormLabel>
					<Input
						value={customer.lastName}
						onChange={e => valueChangedHandler(e.target['id'], e.target.value)}
						placeholder='Last Name'
						type='text'
					/>
				</FormControl>
			</Flex>
			<Flex wrap='wrap' justify='space-around' width='100%' my='2'>
				<FormControl maxW='450px' id='phoneNumber' isRequired>
					<FormLabel>Phone Number</FormLabel>
					<Input
						value={customer.phoneNumber}
						isDisabled
						placeholder='Phone Number'
						type='tel'
					/>
				</FormControl>

				<FormControl maxW='450px' id='password' isRequired>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input
							colorScheme='twitter.50'
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							value={customer.password}
							onChange={e =>
								valueChangedHandler(e.target['id'], e.target.value)
							}
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
				</FormControl>

				<Flex wrap='wrap' justify='space-around' width='100%' my='2'>
					<Box w='450px'>
						<NumberInput
							width='100%'
							defaultValue={18}
							min={18}
							max={65}
							id='age'
							isRequired
							value={customer.age}
							onChange={number => valueChangedHandler('age', number)}
						>
							<FormLabel>Age</FormLabel>
							<NumberInputField />
						</NumberInput>
					</Box>
					<FormControl maxW='450px' id='email'>
						<FormLabel>Email Address</FormLabel>
						<Input
							value={customer.email}
							onChange={e =>
								valueChangedHandler(e.target['id'], e.target.value)
							}
							placeholder='Email Address'
							type='email'
						/>
					</FormControl>
				</Flex>
			</Flex>
		</Container>
	);
}
