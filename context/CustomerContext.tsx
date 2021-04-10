import { createContext, useContext, useState } from 'react';
import { Customer } from '../types/Customer';
import JSXChildren from '../types/JSXChildren';

interface CustomerContextData {
	customer?: Customer;
	updateCustomer: (customer: Customer) => void;
}

const CustomerContext = createContext<CustomerContextData>({
	updateCustomer: (customer: Customer) => null,
});

export function useCustomer() {
	return useContext(CustomerContext);
}

export default function CustomerContextProvider({ children }: JSXChildren) {
	const [user, setUser] = useState<Customer>();

	function updateCustomer(customer: Customer) {
		setUser(() => customer);
	}

	return (
		<CustomerContext.Provider
			value={{ customer: user, updateCustomer: updateCustomer }}
		>
			{children}
		</CustomerContext.Provider>
	);
}
