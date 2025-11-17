import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import Router from "next/router";
import { useState } from "react";
import Loader from "../../components/loader";
import { motion, AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState(false);
	Router.events.on("routeChangeStart", (url) => {
		setIsLoading(true);
		console.log("Event is starting");
	});
	Router.events.on("routeChangeComplete", (url) => {
		setIsLoading(false);
		console.log("Event has ended");
	});
	if (isLoading) return <Loader />;

	return (
		<Layout>
			<motion.div
				initial={{ opacity: 0, y: 25 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 25 }}
				transition={{ delay: 1 }}
			>
				<Component {...pageProps} />
			</motion.div>
		</Layout>
	);
}
