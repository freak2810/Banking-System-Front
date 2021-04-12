import { createContext, useContext, useState } from 'react';
import { Accounts, Account } from '../types/Account';
import JSXChildren from '../types/JSXChildren';
import { PrivateKey } from '../types/Security';

interface PrivateKeyStore {
	accountNumber: string;
	privateKey: PrivateKey;
}

interface AccountContextData {
	accounts: Accounts;
	updateAllAccounts: (accounts: Accounts) => void;
	// privateKeys: PrivateKeyStore[];
}

const AccountContext = createContext<AccountContextData>({
	accounts: [],
	updateAllAccounts: (accounts: Accounts) => null,
	// privateKeys: [],
});

export function useAccounts() {
	return useContext(AccountContext);
}

export default function AccountContextProvider({ children }: JSXChildren) {
	const [accounts, setAccounts] = useState<Accounts>([]);

	function updateAllAccounts(accounts: Accounts) {
		setAccounts(() => accounts);
	}

	function updateOneAccount(account: Account) {
		setAccounts((prevState: Accounts) => [...prevState, account]);
	}

	return (
		<AccountContext.Provider value={{ accounts, updateAllAccounts }}>
			{children}
		</AccountContext.Provider>
	);
}
