import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useAccounts } from '../context/AccountContext';
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
			height='100vh'
			bg='twitter.50'
			justifyContent='center'
			alignItems='center'
		>
			<StatementGeneration />
		</Flex>
	);
}
