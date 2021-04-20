import { useState } from 'react';
import AadhaarAlert from './AadhaarAlert';

export default function SignUp() {
	const [aadhaar, setAadhaar] = useState('');

	function onAadhaarChangedHandler(aadhaarNumber: string) {
		setAadhaar(aadhaarNumber);
	}

	function verifyCustomer() {
		//Customer Verification Logic

		console.log(`${aadhaar} verified!`);
	}

	return (
		<div>
			<AadhaarAlert
				aadhaar={aadhaar}
				onChangeHandler={onAadhaarChangedHandler}
				verify={verifyCustomer}
			/>
		</div>
	);
}
