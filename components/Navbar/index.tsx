import { Button, ButtonGroup, Container, flexbox } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useLogin } from '../../context/LoginContext';

export default function Navbar() {
	const router = useRouter();
	const { isLoggedIn, logIn, logOut } = useLogin();

	function logout() {
		logOut();
		router.push('/');
	}

	return (
		<nav
			style={{
				backgroundColor: '#171923',
				//backgroundColor: 'red',
				position: 'absolute',
				top: 0,
				display: 'flex',
				width: '100vw',
				height: '60px',
			}}
		>
			<ButtonGroup spacing='89vw'>
				<Button
					colorScheme='messenger'
					variant='ghost'
					mt='2.5'
					size='md'
					onClick={() => router.push('/dashboard')}
				>
					{isLoggedIn ? 'Go Back' : 'Home'}
				</Button>

				<Button
					colorScheme='messenger'
					variant='ghost'
					mt='2.5'
					size='md'
					onClick={logout}
				>
					{isLoggedIn ? 'Log Out' : 'Log In'}
				</Button>
			</ButtonGroup>
		</nav>
	);
}
