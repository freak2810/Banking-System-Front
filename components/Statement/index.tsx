import { Container, Flex, Heading, Select, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAccounts } from '../../context/AccountContext';
import StatementGenerator from './StatementGenerator';

export default function StatementGeneration() {
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	const { accounts } = useAccounts();
	return (
		<div>
			<Container
				bg='gray.900'
				boxShadow='dark-lg'
				padding='5'
				width='100%'
				borderRadius='10px'
				my='5'
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
							{account.accountNumber}
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
