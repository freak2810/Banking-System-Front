import Login from './login';
import React, { useState } from 'react';
import Transaction from './transaction';
import { LoginContex } from './loginContex';
export default function Home() {
	const [user, isLoggedIn] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<div>
			<LoginContex.Provider
				value={{ showPassword, setShowPassword, isLoggedIn }}
			>
				{user ? <Transaction /> : <Login />}
			</LoginContex.Provider>
		</div>
	);
}
