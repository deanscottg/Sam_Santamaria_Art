import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";

export default function App({ Component, pageProps }: AppProps)  {
	return (
	<div className="bg-gradient-to-br from-gray-400 to-gray-200 bg-auto">
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</div>
	);
}
