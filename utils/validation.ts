export const loginValidation = (phoneNumber: string, password: string) => {
	if (phoneNumber.length <= 0) throw new Error('Phone Number is Required');

	if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber))
		throw new Error('Phone Number should be of 10 digits only');

	if (password.length <= 0) throw new Error('Password is Required');

	if (!/^(?=.{8,})/.test(password))
		throw new Error('Password should atleast be of 8 digits');
};

export const amountValidation = (amount: number, balance?: string) => {
	if (!amount || amount <= 0)
		throw new Error('Amount should be greater than 0');

	if (balance && amount > +balance) throw new Error('Insufficient Balance');
};

export const accountSelectedValidation = (selectedIndex?: number) => {
	if (selectedIndex > -1) return;
	throw new Error('Please Select your Account Number');
};

export const accountNumberValidation = (
	accountNumber: string,
	isVerified: boolean
) => {
	if (accountNumber.length <= 0)
		throw new Error('Please Enter a valid Account Number');

	if (!isVerified) throw new Error('Please Verify the Account Number');
};

export const phoneNumberSignUpValidation = (phoneNumber: string) => {
	if (phoneNumber.length <= 0) throw new Error('Phone Number is Required');

	if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber))
		throw new Error('Phone Number should be of 10 digits only');
};
