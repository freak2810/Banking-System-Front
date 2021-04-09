import Login from './login';
import React, { useState } from 'react';
import Transaction from './transaction';
import { loginContext } from './loginContext';
export default function Home() {
	const [user, isLoggedIn] = useState<boolean>(false);

	return (
		<div>
			<loginContext.Provider value={{ isLoggedIn }}>
				{user ? <Transaction /> : <Login />}
			</loginContext.Provider>
		</div>
	);
}
