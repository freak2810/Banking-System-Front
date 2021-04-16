import { Validate } from '../types/Validate';

const validation = (values: Validate) => {
	let errors = {} as Validate;
	if (!values.phonenumber) {
		errors.phonenumber = 'Phone number required';
	} else if (
		!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
			values.phonenumber
		)
	)
		errors.phonenumber = 'Phone NUmber Is Invalid';
	if (!values.password) errors.password = 'Password is required';
	else if (!/^(?=.{8,})/.test(values.password))
		errors.password = 'Enter 8 digits password';
	//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
	return errors;
};
export default validation;
