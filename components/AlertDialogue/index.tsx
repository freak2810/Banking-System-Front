import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';

interface Alert {
	isOpen: boolean;
	cancelRef: any;
	onClose: () => void;
	heading?: string;
	body?: string;
	onContinue: () => void;
}

export default function ALertDialogue(props: Alert) {
	return (
		<AlertDialog
			isOpen={props.isOpen}
			leastDestructiveRef={props.cancelRef}
			onClose={props.onClose}
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent bg='gray.900'>
					<AlertDialogHeader fontSize='lg' fontWeight='bold' color='twitter.50'>
						{props.heading}
					</AlertDialogHeader>
					<AlertDialogBody color='twitter.50'>{props.body}</AlertDialogBody>
					<AlertDialogFooter>
						<Button
							ref={props.cancelRef}
							onClick={props.onContinue}
							colorScheme='blue'
						>
							Continue
						</Button>
						<Button colorScheme='red' onClick={props.onClose} ml={3}>
							Cancel
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}
