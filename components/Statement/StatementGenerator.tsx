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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import { Account } from '../../types/Account';
import { decryptValue } from '../../utils/security';
import Loading from 'react-loading';

interface Transaction {
	transactionType: string;
	transactionId: string;
	date: string;
	amount: string;
	sent?: boolean;
}

export default function StatementGenerator(props: Account) {
	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

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

	return transactions.length > 0 ? (
		<Table
			bg='gray.900'
			boxShadow='dark-lg'
			padding='5'
			width='100px'
			borderRadius='10px'
			my='5'
			size='sm'
		>
			{/* <TableCaption
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				my='5'
				borderRadius='10px'
				color='twitter.50'
			>
				These are the last {transactions.length} transactions
			</TableCaption> */}
			<Thead>
				<Tr>
					<Th width='20%' color='twitter.50'>
						Transaction ID
					</Th>
					<Th backgroundColor='red' width='10%' color='twitter.50'>
						Transaction Type
					</Th>
					<Th width='10%' color='twitter.50'>
						Date
					</Th>
					<Th width='10%' color='twitter.50'>
						Amount
					</Th>
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
		<Center>
			<Loading type='balls' color='twitter.50' height='7vh' width='7vw' />
		</Center>
	);
}

//TODO: When the decryption of balance is done ... also update the details in the account context
