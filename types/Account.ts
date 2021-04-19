import { PublicKey } from './Security';

export interface Account {
	accountNumber: string;
	role: string;
	balance: string;
	publicKey: PublicKey;
	accountCreated: string;
}

export type Accounts = Account[];
