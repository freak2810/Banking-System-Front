import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../config/chakraconfig';
import LoginContextProvider from '../context/LoginContext';

// @ts-ignore
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<LoginContextProvider>
				<Component {...pageProps} />
			</LoginContextProvider>
		</ChakraProvider>
	);
}

export default MyApp;
