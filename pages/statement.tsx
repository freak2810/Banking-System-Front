import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useLogin } from '../context/LoginContext';
import { useRouter } from 'next/router';
import Loading from 'react-loading';
import StatementGeneration from '../components/Statement';

export default function Statement() {
	const { isLoggedIn } = useLogin();
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) router.push('/login');
	}, [isLoggedIn]);

	if (!isLoggedIn) return <Loading />;

	return (
		<Flex
			bg='twitter.50'
			justifyContent='center'
			alignItems='center'
			minHeight='100vh'
			padding='5'
		>
			<StatementGeneration />
		</Flex>
	);
}
