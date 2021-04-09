import { createContext, useContext, useState } from 'react';

interface LoginContextData {
	isLoggedIn: boolean;
	logIn: () => void;
	logOut: () => void;
}

interface Props {
	children: JSX.Element;
}

const LoginContext = createContext<LoginContextData>({
	isLoggedIn: false,
	logIn: () => null,
	logOut: () => null,
});

export function useLogin() {
	return useContext(LoginContext);
}

export default function LoginContextProvider({ children }: Props) {
	const [isLoggedin, setIsLoggedin] = useState(true);

	function setLoggedIn() {
		setIsLoggedin(() => true);
	}

	function setLoggedOut() {
		setIsLoggedin(() => false);
	}

	return (
		<LoginContext.Provider
			value={{
				isLoggedIn: isLoggedin,
				logIn: setLoggedIn,
				logOut: setLoggedOut,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
}
