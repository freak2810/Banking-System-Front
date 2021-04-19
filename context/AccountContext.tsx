import { createContext, useContext, useState } from 'react';
import { Accounts, Account } from '../types/Account';
import JSXChildren from '../types/JSXChildren';
import { PrivateKey } from '../types/Security';

export interface PrivateKeyStore {
	accountNumber: string;
	privateKey: PrivateKey;
}

interface AccountContextData {
	accounts: Accounts;
	updateAllAccounts: (accounts: Accounts) => void;
	privateKeys: PrivateKeyStore[];
	updateAllPrivateKeys: (privateKeys: PrivateKeyStore[]) => void;
	getPrivateKey: (accountNumber: string) => PrivateKeyStore | null;
}

const AccountContext = createContext<AccountContextData>({
	accounts: [],
	updateAllAccounts: (accounts: Accounts) => null,
	privateKeys: [],
	updateAllPrivateKeys: (privateKeys: PrivateKeyStore[]) => null,
	getPrivateKey: (accountNumber: string) => null,
});

export function useAccounts() {
	return useContext(AccountContext);
}

export default function AccountContextProvider({ children }: JSXChildren) {
	const [accounts, setAccounts] = useState<Accounts>([]);
	const [privateKeys, setPrivateKeys] = useState<PrivateKeyStore[]>([]);

	function updateAllAccounts(accounts: Accounts) {
		setAccounts(() => accounts);
	}

	function updateAllPrivateKeys(privateKeys: PrivateKeyStore[]) {
		setPrivateKeys(() => privateKeys);
	}

	function getPrivateKey(accountNumber: string) {
		return privateKeys.filter(key => key.accountNumber === accountNumber)[0];
	}

	// function updateOneAccount(account: Account) {
	// 	const remainder = accounts.filter(
	// 		acc => account.accountNumber !== acc.accountNumber
	// 	);
	// 	setAccounts(() => [...remainder, account]);
	// }

	return (
		<AccountContext.Provider
			value={{
				accounts,
				updateAllAccounts,
				privateKeys,
				updateAllPrivateKeys,
				getPrivateKey,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}
