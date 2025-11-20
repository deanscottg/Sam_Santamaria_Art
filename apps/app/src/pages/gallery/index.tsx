import Link from "next/link";

const Gallery = () => {
	return (
		<div className="page-container">
			<div className="py-4 text-center space-y-10">
				<h1>Gallery</h1>
				<p className="font-cormorant text-lg">Explore my collection of paintings and photography</p>
			</div>
			<div className="flex flex-col md:flex-row items-center justify-center gap-12 p-10 max-w-4xl mx-auto">
				<Link href="/gallery/painting" className="group">
					<div className="flex flex-col items-center justify-center w-80 h-80 bg-white border-8 border-gray-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
						<h2 className="text-4xl font-cormorant font-bold text-gray-800 text-center px-6 group-hover:text-gray-900 transition-colors">
							Painting<br />
							<span className="text-2xl">& Editioned Prints</span>
						</h2>
					</div>
				</Link>
				
				<Link href="/gallery/photograph" className="group">
					<div className="flex flex-col items-center justify-center w-80 h-80 bg-white border-8 border-gray-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
						<h2 className="text-4xl font-cormorant font-bold text-gray-800 text-center px-6 group-hover:text-gray-900 transition-colors">
							Photo<br />Journeys
						</h2>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Gallery;
