import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

const styles = {
	global: (props: Dict<any>) => ({
		body: {
			color: mode('gray.800', 'whiteAlpha.900')(props),
			bg: mode('gray.100', '#141214')(props),
		},
	}),
};

// const components = {
//   Drawer: {
//     // setup light/dark mode component defaults
//     baseStyle: props => ({
//       dialog: {
//         bg: mode('white', '#141214')(props),
//       },
//     }),
//   },
// };

const theme = extendTheme({
	styles,
});

export default theme;
