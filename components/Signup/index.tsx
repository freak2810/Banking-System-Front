import { Flex, useToast } from '@chakra-ui/react';
import { MutableRefObject, RefObject, useRef, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import PhoneAlert from './PhoneDialogue';
import { useRouter } from 'next/router';
import SignupForm from './SignupForm';
import { phoneNumberSignUpValidation } from '../../utils/validation';

export default function SignUp() {
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const cancelRef = useRef<MutableRefObject<RefObject<any>>>();

	const router = useRouter();

	const toast = useToast();
	const toastIdRef = useRef<string | undefined | number>();

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

	function onCloseHandler() {
		setIsOpen(false);
		router.push('/');
	}

	function onAadhaarChangedHandler(phoneNumber: string) {
		setPhoneNumber(phoneNumber);
		setIsVerified(false);
	}

	async function verifyCustomer() {
		try {
			setLoading(true);
			phoneNumberSignUpValidation(phoneNumber);

			try {
				const response = await axiosConfig.get(
					`customers/phone/${phoneNumber}`
				);
				if (response.status === 200) {
					setIsVerified(false);
					addToToast('Phone Number Already Exists');
					setPhoneNumber('');
				}
			} catch (e) {
				addToToast('Phone Number Verified', '', 'success');
				setIsVerified(true);
				setIsOpen(false);
			}
		} catch (e) {
			addToToast(e.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Flex bg='twitter.50' minHeight='100vh' justify='center'>
			<PhoneAlert
				loading={loading}
				cancelRef={cancelRef}
				onClose={onCloseHandler}
				isOpen={isOpen}
				phoneNumber={phoneNumber}
				onChangeHandler={onAadhaarChangedHandler}
				verify={verifyCustomer}
			/>
			{isVerified === true ? <SignupForm phoneNumber={phoneNumber} /> : null}
		</Flex>
	);
}
