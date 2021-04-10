import { createContext, useContext, useState } from 'react';
import JSXChildren from '../types/JSXChildren';

export interface Customer {
	id: string;
	firstName: string;
	lastName: string;
	email?: string;
	phone?: string;
	age: string;
	dob?: string;
	token?: string;
}

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
