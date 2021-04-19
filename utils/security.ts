import { modPow, randBetween } from 'bigint-crypto-utils';
import { PrivateKey, PublicKey } from '../types/Security';

const L = (x: bigint, n: bigint) => BigInt((x - BigInt(1)) / BigInt(n));

export async function encryptValue(
	value: number,
	publicKey: PublicKey
): Promise<bigint> {
	const newPublicKey: { n: bigint; g: bigint } = {
		n: BigInt(publicKey.n),
		g: BigInt(publicKey.g),
	};

	const { n, g }: { n: bigint; g: bigint } = newPublicKey;
	const nSquared: bigint = (n * n) as bigint;

	const r: bigint = randBetween(n * n, BigInt(1)) as bigint;

	const c1: bigint = modPow(g, BigInt(value), nSquared) as bigint;
	const c2: bigint = modPow(r, n, nSquared) as bigint;

	return ((c1 * c2) % nSquared) as bigint;
}

export async function decryptValue(
	cipher: string,
	publicKey: PublicKey,
	privateKey: PrivateKey
): Promise<bigint> {
	const cipherText = BigInt(cipher) as bigint;

	const newPublicKey: { n: bigint; g: bigint } = {
		n: BigInt(publicKey.n),
		g: BigInt(publicKey.g),
	};

	const newPrivateKey: { lambda: bigint; mu: bigint } = {
		lambda: BigInt(privateKey.lambda) as bigint,
		mu: BigInt(privateKey.mu) as bigint,
	};

	const { n }: { n: bigint; g: bigint } = newPublicKey;
	const { lambda, mu }: { lambda: bigint; mu: bigint } = newPrivateKey;

	const alpha: bigint = modPow(cipherText, lambda, n * n) as bigint;

	return ((L(alpha, n) * mu) % n) as bigint;
}
