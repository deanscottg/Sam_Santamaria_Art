import Image from "next/image";
const Footer = () => {
	return (
		<footer className="flex justify-center items-center relative pt-12 pb-6 mt-auto bg-transparent">
			<p className="text-gray-700 text-sm">&#169; Copyright Sam Santamaria Art 2023</p>

			<div className="absolute flex right-4 space-x-3">
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
