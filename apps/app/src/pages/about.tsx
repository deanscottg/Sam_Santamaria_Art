import Link from "next/link";
import Image from "next/image";
import AboutScrollNav from "../../components/AboutScrollNav";
import { useState } from "react";
import SailorMoonPopUp from "../../components/SailorMoonPopUp";
import { motion, animate, AnimatePresence } from "framer-motion";

const About = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="page-container">
			<h1 className="py-10 text-center">About the Artist</h1>
			<AboutScrollNav />
			
			{/* Artist Photo */}
			<div className="flex justify-center py-10">
				<Image
					src="/SamPic2.png"
					alt="Sam Santamaria"
					width={300}
					height={400}
					className="shadow-2xl border-[16px] border-white outline outline-2 outline-gray-300"
				/>
			</div>
			
			<div className="py-6 max-w-4xl mx-auto px-6">
				<div
					id="artistStatment"
					className=" pt-10 text-center border-b-2 border-black"
				>
					<h2 className="text-2xl font-bold italic pt-10 pb-10">
						Artist Statement
					</h2>
					<p className="">
						The fear of water lurks in the mind of one born in the sign of fire.
						Still, I am fascinated by the enigmas buried in oceanic depths –
						concealing mysteries to me that are revealed only in small parts as
						shards of light provide constantly shifting illumination. I try to
						handle my fear by depicting personal interpretations of acquatic
						life’s nuances. Scraping pigments roughly over canvas or paper, I
						want to capture the constant motion of tides and currents that
						stimulate the undersea and heave its surface. In a sense, I gain a
						measure of control over a source of anxiety. Letting colors seep,
						blend, or splash frenziedly, I simulate perpetual energy, which I
						think only a water environment can sustain.
					</p>
					<p className="p-8">
						Rendering other aspects of nature, from the expanse of landscapes to
						fragments of plant life – always in relation to water – is another
						facet of my art. I emphasize the interplay of various colors,
						blurring detail to express a spontaneous reaction to the poetics of
						a particular scene or what a distinct composition of flora evokes in
						me.
					</p>
				</div>
				<br></br>
				<div
					id="artActivities"
					className=" text-center border-b-2 border-black pb-8"
				>
					<h2 className="text-2xl font-bold italic pt-6 pb-10">
						Art Activities
					</h2>
					<p className="p-4">
						Artprons: Utilitarian Aesthetics, art event (acrylic on canvas,
						fabric and yarn, photos on canvas) with Sandy and Adrienne
						Santamaria, Chelsea Hotel, New York City, August 2011
						<br></br>
						Color laserprints and acrylic on paper, solo exhibit, Naperville IL,
						October 2000 Postulations, color laserprints and acrylic on paper,
						solo exhibit presented by Jersey City Historic Downtown Special
						Improvement District, New Jersey, April 1999
						<br></br>
						Legend: from Philippine Muslim Mythology, color laserprints, solo
						exhibit, Milwaukee Public Museum, grant provided by Miller Brewing
						Company, February 1998
						<br></br>
						Pictures of the Floating World, oil and acrylic on canvas and paper,
						solo exhibit, Philippine Consulate Center, New York City, August
						1989
					</p>
				</div>
				<div
					id="publications"
					className=" text-center border-b-2 border-black pb-8"
				>
					<h2 className="text-2xl font-bold italic pt-6 pb-10">Publications</h2>
					<div className="p-4 flex flex-col items-center gap-4">
						<div className="flex flex-col md:flex-row items-center gap-6 max-w-2xl">
							<motion.div
								whileHover={{ scale: 1.05 }}
								className="flex-shrink-0"
							>
								<Image
									src="/sailorMoonCover.jpg"
									alt="Sailor Moon Book Cover"
									width={150}
									height={200}
									className="rounded shadow-lg"
								/>
							</motion.div>
							<div className="text-left">
								<p className="font-semibold mb-2">
									SAILOR MOON - Stories, Poems, Photographs
								</p>
								<p className="text-sm text-gray-700 mb-3">
									84 pp full color, published by AuthorHOUSE, 2019
								</p>
								<Link
									className="painting-nav-link inline-block font-bold"
									href="https://www.amazon.com/Sailor-Moon-Events-Comic-Sinister-ebook/dp/B07Z4KR5VN"
									target="_blank"
									rel="noopener noreferrer"
								>
									View on Amazon
								</Link>
							</div>
						</div>
						<p className="pt-4">
							SARI MANOK – Legend, Art &amp; Haiku Lyric, 48 pp full color, soon
							to be published
						</p>
					</div>
				</div>
				<div id="professional" className=" text-center pb-10">
					<h2 className="text-2xl font-bold italic pt-6 pb-10">
						Professional Career
					</h2>
					<p className="p-4">
						Editor, American Institute of Certified Public Accountants, New York
						and New Jersey, 1997-2012
						<br></br>
						Senior Copywriter, Plenum Publishing Corp., New York City, 1989-1997
						<br></br>
						Correspondent, Philippine News and Manila Post, New York and New
						Jersey, 1997-1999
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
