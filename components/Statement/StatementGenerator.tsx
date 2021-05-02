import {
	Center,
	Table,
	TableCaption,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	useMediaQuery,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import { Account } from '../../types/Account';
import { decryptValue } from '../../utils/security';
import Loading from 'react-loading';
import { UnorderedList } from '@chakra-ui/layout';
import { ListItem } from '@chakra-ui/layout';
import { List } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';

interface Transaction {
	transactionType: string;
	transactionId: string;
	date: string;
	amount: string;
	sent?: boolean;
}

export default function StatementGenerator(props: Account) {
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

	const { customer } = useCustomer();
	const { getPrivateKey } = useAccounts();

	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		async function fetch() {
			const response = await axiosConfig.get(
				`transactions/${props.accountNumber}`,
				{
					headers: { Authorization: `Token ${customer?.token}` },
				}
			);

			const publicKey = props.publicKey;
			const privateKey = getPrivateKey(props.accountNumber).privateKey;

			// console.log(publicKey, privateKey);

			// console.log(response.data);

			let result: Transaction[] = response.data.map(
				async ({
					transactionId,
					date,
					transactionType,
					senderAccount,
					senderEncryptedAmount,
					receiverEncryptedAmount,
				}: any) => {
					const amount =
						senderAccount.accountNumber === props.accountNumber
							? senderEncryptedAmount
							: receiverEncryptedAmount;

					return {
						transactionId,
						date,
						transactionType,
						amount: await decryptValue(amount, publicKey, privateKey),
						sent:
							transactionType === 'transfer' &&
							senderAccount.accountNumber === props.accountNumber,
					};
				}
			);

			result = await Promise.all(result);
			// console.log(result);

			setTransactions(result);
		}
		fetch();
	}, [props.accountNumber]);

	const renderColor = (transactionType: string) => {
		if (transactionType === 'deposit') return 'green.200';
		if (transactionType === 'withdrawal') return 'red.200';
		return 'gray.200';
	};

	const renderAmountColor = (transactionType: string, sent?: boolean) => {
		if (transactionType === 'deposit') return 'green';
		if (transactionType === 'withdrawal') return 'red';
		return 'darkAlpha';
	};

	const renderDate = (dateString: string) => {
		const date = new Date(dateString);
		return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
	};

	const renderTransactionType = (transactionType: string, sent?: boolean) => {
		if (transactionType === 'deposit') return 'deposit';
		if (transactionType === 'withdrawal') return 'withdrawal';
		if (transactionType === 'transfer' && sent) return 'transfer - sent';
		else return 'transfer - recieved';
	};

	const RenderTransactions = () =>
		transactions.map(transaction => (
			<Tr
				key={transaction.transactionId}
				backgroundColor={renderColor(transaction.transactionType)}
			>
				<Td color='darkAlpha'>{transaction.transactionId}</Td>
				<Td color='darkAlpha' textTransform='capitalize'>
					{renderTransactionType(transaction.transactionType, transaction.sent)}
				</Td>
				<Td color='darkAlpha'>{renderDate(transaction.date)}</Td>
				<Td
					color={renderAmountColor(
						transaction.transactionType,
						transaction.sent
					)}
				>
					{transaction.transactionType == 'transfer' && transaction.sent
						? '- '
						: ''}
					{transaction.amount}
				</Td>
			</Tr>
		));

	const MobileView = () => {
		return (
			<List bg='twitter.50' my='5' borderRadius='10px'>
				{transactions.map(transaction => (
					<ListItem
						backgroundColor={renderColor(transaction.transactionType)}
						key={transaction.transactionId}
						my='2'
						borderRadius='10px'
						borderColor='darkAlpha'
						borderWidth='2'
					>
						<Box padding='2'>
							<Text color='darkAlpha'>
								<span
									style={{
										fontSize: '80%',
										fontWeight: 'bold',
										textTransform: 'uppercase',
										marginRight: '5px',
									}}
								>
									{' '}
									Transaction ID:
								</span>{' '}
								{transaction.transactionId}
							</Text>
							<Text color='darkAlpha' textTransform='capitalize'>
								<span
									style={{
										fontSize: '80%',
										fontWeight: 'bold',
										textTransform: 'uppercase',
										marginRight: '5px',
									}}
								>
									Transaction Type:{' '}
								</span>
								{renderTransactionType(
									transaction.transactionType,
									transaction.sent
								)}
							</Text>
							<Text color='darkAlpha'>
								<span
									style={{
										fontSize: '80%',
										fontWeight: 'bold',
										textTransform: 'uppercase',
										marginRight: '5px',
									}}
								>
									Date:{' '}
								</span>{' '}
								{renderDate(transaction.date)}
							</Text>
							<Text
								color={renderAmountColor(
									transaction.transactionType,
									transaction.sent
								)}
							>
								<span
									style={{
										color: 'black',
										fontSize: '80%',
										fontWeight: 'bold',
										textTransform: 'uppercase',
										marginRight: '5px',
									}}
								>
									Amount:{' '}
								</span>
								{transaction.transactionType == 'transfer' && transaction.sent
									? '- '
									: ''}
								{transaction.amount}/-
							</Text>
						</Box>
					</ListItem>
				))}
			</List>
		);
	};

	if (transactions.length === 0)
		return (
			<Container
				my='5'
				textAlign='center'
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				color='twitter.50'
				borderRadius='10px'
			>
				<Text>No Transactions to show 😿</Text>
			</Container>
		);

	return transactions.length > 0 ? (
		isLargerThan768 ? (
			<Table
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				borderRadius='10px'
				my='5'
			>
				<TableCaption
					bg='gray.900'
					boxShadow='dark-lg'
					my='5'
					borderRadius='10px'
					color='twitter.50'
				>
					These are the last {transactions.length} transactions
				</TableCaption>
				<Thead>
					<Tr>
						<Th color='twitter.50'>Transaction ID</Th>
						<Th color='twitter.50'>Transaction Type</Th>
						<Th color='twitter.50'>Date</Th>
						<Th color='twitter.50'>Amount</Th>
						{/* <Th color='twitter.50'>Tranferred To/ From</Th> */}
					</Tr>
				</Thead>
				<Tbody>{RenderTransactions()}</Tbody>
				<Tfoot borderRadius='10px'>
					<Tr>
						<Th color='twitter.50'>Transaction ID</Th>
						<Th color='twitter.50'>Transaction Type</Th>
						<Th color='twitter.50'>Date</Th>
						<Th color='twitter.50'>Amount</Th>
						{/* <Th color='twitter.50'>Tranferred To/ From</Th> */}
					</Tr>
				</Tfoot>
			</Table>
		) : (
			<MobileView />
		)
	) : (
		<Center>
			<Loading type='balls' color='twitter.50' height='7vh' width='7vw' />
		</Center>
	);
}
