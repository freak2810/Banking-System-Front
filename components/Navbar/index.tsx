import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogin } from '../../context/LoginContext';

export default function Navbar() {
	const router = useRouter();
	const { isLoggedIn, logOut } = useLogin();

	function logout() {
		logOut();
		router.push('/login');
	}

	return router.pathname !== '/login' && router.pathname !== '/' ? (
		<nav
			style={{
				backgroundColor: '#171923',
				justifyContent: 'center',
				position: 'absolute',
				top: 0,
				display: 'flex',
				width: '100%',
				height: '7vh',
			}}
		>
			<Flex
				width='90%'
				flexDirection='row-reverse'
				alignItems='center'
				justifyContent='space-between'
			>
				{isLoggedIn ? (
					<Button colorScheme='red' onClick={logout}>
						Log Out
					</Button>
				) : null}
				{router.pathname !== '/dashboard' &&
				router.pathname !== '/login' &&
				router.pathname !== '/' ? (
					<Button
						colorScheme='messenger'
						onClick={() => router.push('/dashboard')}
					>
						Go Back
					</Button>
				) : null}
			</Flex>
		</nav>
	) : null;
}
