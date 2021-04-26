import {
	Container,
	Flex,
	Heading,
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react';
import React from 'react';

interface SignUpProps {
	phoneNumber;
}

export default function SignupForm({ phoneNumber }: SignUpProps) {
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
			<Flex wrap='wrap' justify='space-between' width='100%' my='2'>
				<FormControl maxW='450px' id='firstName' isRequired>
					<FormLabel>First Name</FormLabel>
					<Input placeholder='First Name' type='text' />
				</FormControl>
				<FormControl maxW='450px' id='LastName' isRequired>
					<FormLabel>Last Name</FormLabel>
					<Input placeholder='Last Name' type='text' />
				</FormControl>
			</Flex>
			<Flex wrap='wrap' justify='space-between' width='100%' my='2'>
				<FormControl maxW='450px' id='phoneNumber' isRequired>
					<FormLabel>Phone Number</FormLabel>
					<Input
						value={phoneNumber}
						isDisabled
						placeholder='Phone Number'
						type='tel'
					/>
				</FormControl>

				<FormControl maxW='450px' id='password' isRequired>
					<FormLabel>Password</FormLabel>
					<Input placeholder='Password' type='password' />
				</FormControl>

				<Flex wrap='wrap' justify='space-between' width='100%' my='2'>
					<NumberInput
						maxW='450px'
						defaultValue={18}
						min={18}
						max={65}
						id='age'
						isRequired
					>
						<FormLabel>Age</FormLabel>
						<NumberInputField />
					</NumberInput>
					<FormControl maxW='450px' id='email'>
						<FormLabel>Email Address</FormLabel>
						<Input placeholder='Email Address' type='email' />
					</FormControl>
				</Flex>
			</Flex>
		</Container>
	);
}
