import bigInt, { randBetween } from 'big-integer';
import { PrivateKey, PublicKey } from '../types/Security';

const L = (x: bigInt.BigInteger, n: bigInt.BigInteger) =>
	x.minus(bigInt.one).divide(n);

export async function encryptValue(
	value: number,
	publicKey: PublicKey
): Promise<string> {
	const newPublicKey = {
		n: bigInt(publicKey.n),
		g: bigInt(publicKey.g),
	};

	const { n, g } = newPublicKey;
	const nSquared = n.square();

	const r = randBetween(bigInt.one, nSquared);

	const c1 = g.modPow(bigInt(value), nSquared);
	const c2 = r.modPow(n, nSquared);

	return c1.multiply(c2).mod(nSquared).toString();
}

export async function decryptValue(
	cipher: string,
	publicKey: PublicKey,
	privateKey: PrivateKey
): Promise<string> {
	const cipherText = bigInt(cipher);

	const newPublicKey = {
		n: bigInt(publicKey.n),
		g: bigInt(publicKey.g),
	};

	const newPrivateKey = {
		lambda: bigInt(privateKey.lambda),
		mu: bigInt(privateKey.mu),
	};

	const { n } = newPublicKey;
	const { lambda, mu } = newPrivateKey;

	const nSquared = n.square();

	const alpha = cipherText.modPow(lambda, nSquared);

	return L(alpha, n).multiply(mu).mod(n).toString();
}
