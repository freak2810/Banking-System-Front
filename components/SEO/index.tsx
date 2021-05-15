import Head from 'next/head';

interface SEOProps {
	title: string;
}

export default function SEO({ title }: SEOProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content='Leaders in Banking and Investment' />
			<link
				rel='shortcut icon'
				href='assets/img/piggy-bank.png'
				type='image/x-icon'
			/>
		</Head>
	);
}
