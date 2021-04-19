export const loginValidation = (phoneNumber: string, password: string) => {
	if (phoneNumber.length <= 0) throw new Error('Phone Number is Required');

	if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber))
		throw new Error('Phone Number should be of 10 digits only');

	if (password.length <= 0) throw new Error('Password is Required');

	if (!/^(?=.{8,})/.test(password))
		throw new Error('Password should atleast be of 8 digits');
};
