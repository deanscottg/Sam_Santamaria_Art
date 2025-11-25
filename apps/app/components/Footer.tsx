import Image from "next/image";
const Footer = () => {
	return (
		<footer className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 md:relative pt-12 pb-6 mt-auto bg-transparent">
			<p className="text-gray-700 text-sm text-center">&#169; Copyright Sam Santamaria Art 2023</p>

			<div className="flex md:absolute md:right-4 space-x-3">
				<Image
					className='footer-icon-btn'
					src="/facebook.png"
					alt="facebook"
					height={40}
					width={40}
				/>
				<Image
					className='footer-icon-btn'
					src="/instagram.png"
					alt="finstagram"
					height={40}
					width={40}
				/>
				<Image
					className='footer-icon-btn'
					src="/twitter.png"
					alt="twitter"
					height={40}
					width={40}
				/>
			</div>
		</footer>
	);
};

export default Footer;
