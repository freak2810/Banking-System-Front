import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
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
						<Component {...pageProps} />
					</AccountContextProvider>
				</LoginContextProvider>
			</CustomerContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
