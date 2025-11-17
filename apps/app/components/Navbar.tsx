import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import GalleryDropDown from "./GalleryDropDown";
import slogo from "/public/s-logo.png";
import { motion, animate, AnimatePresence } from "framer-motion";

const Navbar = () => {
	const route = useRouter();
	return (
		<nav className="bg-transparent px-2 sm:px-4 py-2">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<Link href="/" className="flex items-center">
					<Image
						src={slogo}
						alt="s-logo"
						height={240}
						width={200}
						className="h-5 mr-3 sm:h-7"
					></Image>
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
				</Link>
				<div className="hidden w-full md:block md:w-auto">
					<ul className="flex flex-col p-4 mt-4 border border-gray-200 rounded-lg md:flex-row md:space-x-6 md:mt-0 md:text-sm md:font-medium md:border-0 bg-transparent">
						<motion.button
							whileHover={{ x: -3 }}
							className="nav-link-btn flex items-center"
							onClick={() => route.back()}
						>
							← Back
						</motion.button>
						<Link href="/" className="nav-link-btn">
							Home
							<motion.div whileHover={{ scale: 1.5 }}></motion.div>
						</Link>
						<Link href="/about" passHref className="nav-link-btn">
							{" "}
							About{" "}
						</Link>
						<Link href="/contact" className="nav-link-btn">
							{" "}
							Contact{" "}
						</Link>
						<GalleryDropDown></GalleryDropDown>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
