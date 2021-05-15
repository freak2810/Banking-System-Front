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
			<link rel='canonical' href='https://bankinginhe.vercel.app/' />
			<meta
				name='robots'
				content='index,follow,max-snippet:-1,max-image-preview:large,notranslate,noimageindex'
			/>

			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://bankinginhe.vercel.app/' />
			<meta property='og:title' content='Generic Group Bank' />
			<meta
				property='og:description'
				content='Leaders in Banking and Investment'
			/>
			<meta property='og:image' content='assets/img/piggy-bank.png' />

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content='https://bankinginhe.vercel.app/' />
			<meta property='twitter:title' content='Generic Group Bank' />
			<meta
				property='twitter:description'
				content='Leaders in Banking and Investment'
			/>
			<meta property='twitter:image' content='assets/img/piggy-bank.png' />
		</Head>
	);
}
