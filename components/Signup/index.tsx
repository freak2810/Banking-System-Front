import { Flex, useToast } from '@chakra-ui/react';
import { MutableRefObject, RefObject, useRef, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import PhoneAlert from './PhoneDialogue';
import { useRouter } from 'next/router';
import SignupForm from './SignupForm';
import {
	customerSignUpValidation,
	phoneNumberSignUpValidation,
} from '../../utils/validation';

export default function SignUp() {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [customer, setCustomer] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
		age: 18,
	});

	const cancelRef = useRef<MutableRefObject<RefObject<any>>>();

	const router = useRouter();

	const toast = useToast();
	const toastIdRef = useRef<string | undefined | number>();

	function valueChangedHandler(target: string, value: string) {
		const updatedCustomer = { ...customer };

		if (target === 'firstName') updatedCustomer.firstName = value;
		else if (target === 'lastName') updatedCustomer.lastName = value;
		else if (target === 'password') updatedCustomer.password = value;
		else if (target === 'age') updatedCustomer.age = +value;
		else if (target === 'email') updatedCustomer.email = value;

		setCustomer(updatedCustomer);
	}

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
				setCustomer(prevState => {
					return { ...prevState, phone: phoneNumber };
				});
			}
		} catch (e) {
			addToToast(e.message);
		} finally {
			setLoading(false);
		}
	}

	async function createCustomer() {
		try {
			setLoading(true);
			customerSignUpValidation(customer);

			try {
				await axiosConfig.post('customers/signup', customer);
				addToToast('Signup Successful', 'Welcome to the family!!', 'success');
				router.push('/login');
			} catch (e) {
				addToToast('Internal Server Error');
				setLoading(false);
			}
		} catch (e) {
			addToToast(e.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Flex bg='twitter.50' minHeight='100vh' justify='center' padding='5%'>
			<PhoneAlert
				loading={loading}
				cancelRef={cancelRef}
				onClose={onCloseHandler}
				isOpen={isOpen}
				phoneNumber={phoneNumber}
				onChangeHandler={onAadhaarChangedHandler}
				verify={verifyCustomer}
			/>
			{isVerified === true ? (
				<SignupForm
					loading={loading}
					onSaveButtonHandler={createCustomer}
					valueChangedHandler={valueChangedHandler}
					customer={customer}
				/>
			) : null}
		</Flex>
	);
}
