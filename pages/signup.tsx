import { PhoneIcon } from '@chakra-ui/icons';
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	NumberInput,
	NumberInputField,
	Select,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import React from 'react';

export default function Signup() {
	return (
		<Flex bg='twitter.50' alignItems='center' justifyContent='center'>
			<Stack
				width='30%'
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				borderRadius='10px'
			>
				<Heading color='twitter.50' mb={5}>
					SignUp
				</Heading>
				<FormControl id='FirstName' isRequired>
					<FormLabel color='whiteAlpha.900'>First Name</FormLabel>
					<Input color='whiteAlpha.900' placeholder='First Name' />
				</FormControl>
				<FormControl id='LastName' isRequired>
					<FormLabel color='whiteAlpha.900'>Last Name</FormLabel>
					<Input color='whiteAlpha.900' placeholder='Last Name' />
				</FormControl>
				<FormControl id='Gender' isRequired>
					<FormLabel color='whiteAlpha.900'>Gender</FormLabel>
					<Select color='whiteAlpha.900' placeholder='Select Gender'>
						<option>Male</option>
						<option>Female</option>
						<option>Others</option>
					</Select>
				</FormControl>
				<FormControl id='Age' isRequired>
					<FormLabel color='whiteAlpha.900'>Age</FormLabel>
					<NumberInput max={50} min={10}>
						<NumberInputField color='whiteAlpha.900' placeholder='Enter Age' />
					</NumberInput>
				</FormControl>
				<FormControl id='Addhaar' isRequired>
					<FormLabel color='whiteAlpha.900'>Addhaar Number</FormLabel>
					<NumberInput max={50} min={10}>
						<NumberInputField
							color='whiteAlpha.900'
							placeholder='Enter Addhaar Number'
						/>
					</NumberInput>
				</FormControl>
				<FormControl id='email' isRequired>
					<FormLabel color='whiteAlpha.900'>Email address</FormLabel>
					<Input
						type='email'
						color='whiteAlpha.900'
						placeholder='Enter E-mail'
					/>
				</FormControl>

				<FormControl id='PhoneNumber' isRequired>
					<FormLabel color='whiteAlpha.900'>Phone Number</FormLabel>

					<Input type='tel' placeholder='Phone number' />
				</FormControl>
				<FormControl id='Address' isRequired>
					<FormLabel color='whiteAlpha.900'>Address</FormLabel>
					<Textarea placeholder='Enter Your Address' />
				</FormControl>

				<Button
					marginTop='5'
					isFullWidth
					colorScheme='blue'
					variant='solid'
					size='md'
				>
					Sign-Up
				</Button>
			</Stack>
		</Flex>
	);
}
