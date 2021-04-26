import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	FormControl,
	FormLabel,
	Input,
	Button,
} from '@chakra-ui/react';
import React, { MutableRefObject } from 'react';

interface Identity {
	phoneNumber: string;
	onChangeHandler: (aadhaarNumber: string) => void;
	verify: () => void;
	isOpen: boolean;
	onClose: () => void;
	cancelRef: MutableRefObject<any>;
	loading: boolean;
}

export default function AadhaarAlert({
	phoneNumber,
	onChangeHandler,
	verify,
	isOpen,
	onClose,
	cancelRef,
	loading,
}: Identity) {
	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={onClose}
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent bg='gray.900'>
					<AlertDialogHeader
						fontSize='3xl'
						fontWeight='bold'
						color='twitter.50'
					>
						First Step
					</AlertDialogHeader>
					<AlertDialogBody color='twitter.50'>
						<FormControl isRequired id='email'>
							<FormLabel>Phone Number</FormLabel>
							<Input
								placeholder='Phone Number'
								value={phoneNumber}
								onChange={e => onChangeHandler(e.target.value)}
								type='number'
							/>
						</FormControl>
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button
							isLoading={loading}
							loadingText='Verifying'
							colorScheme='blue'
							onClick={verify}
						>
							Verify
						</Button>
						<Button ref={cancelRef} colorScheme='red' ml={3} onClick={onClose}>
							Cancel
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}
