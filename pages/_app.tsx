import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../config/chakraconfig';

// @ts-ignore
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
