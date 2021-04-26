import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import theme from '../config/chakraconfig';
import AccountContextProvider from '../context/AccountContext';
import CustomerContextProvider from '../context/CustomerContext';
import LoginContextProvider from '../context/LoginContext';

// @ts-ignore
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<CustomerContextProvider>
				<LoginContextProvider>
					<AccountContextProvider>
						<Navbar />
						<Component {...pageProps} />
					</AccountContextProvider>
				</LoginContextProvider>
			</CustomerContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
