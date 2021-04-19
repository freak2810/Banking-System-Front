import { Validate, ValidateErrorProps } from '../types/Validate';

const validation = (values: Validate) => {
	let errors = {} as ValidateErrorProps;
	if (!values.phoneNumber) {
		errors.phoneNumber = 'Phone number required';
	} else if (
		!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
			values.phoneNumber
		)
	)
		errors.phoneNumber = 'Phone Number Is Invalid';
	if (!values.password) errors.password = 'Password required';
	else if (!/^(?=.{8,})/.test(values.password))
		errors.password = 'Enter 8 digit password';
	//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
	return errors;
};
export default validation;
