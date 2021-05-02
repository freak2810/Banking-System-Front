import { Container, Heading, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAccounts } from '../../context/AccountContext';
import { useCustomer } from '../../context/CustomerContext';
import StatementGenerator from './StatementGenerator';

export default function StatementGeneration() {
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	const { accounts } = useAccounts();
	const { customer } = useCustomer();

	return (
		<div>
			<Container
				bg='gray.900'
				boxShadow='dark-lg'
				borderRadius='10px'
				padding='5'
				// my='5'
			>
				<Heading color='twitter.50' my='5' textAlign='center'>
					Account Statement
				</Heading>
				<Select
					placeholder='Select Account'
					bg='twitter.50'
					onChange={e => {
						setSelectedIndex(+e.target.value);
					}}
				>
					{accounts.map((account, index) => (
						<option color='teal' key={index} value={index}>
							{`${account.accountNumber} (${customer.firstName} ${customer.lastName})`}
						</option>
					))}
				</Select>
			</Container>
			{selectedIndex !== -1 ? (
				<StatementGenerator {...accounts[selectedIndex]} />
			) : null}
		</div>
	);
}
