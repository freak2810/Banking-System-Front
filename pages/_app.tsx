import '../styles/globals.scss';
import { ChakraProvider, theme } from '@chakra-ui/react';

// @ts-ignore
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
