'use client';

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";
import { MantineProvider } from "@mantine/core";
import { Painting, WithRequired } from "../types/types";

type FeaturedPainting = WithRequired<Painting, "_id">;

interface FeaturedItemsBannerProps {
	featuredPaintings: FeaturedPainting[];
}

const FeaturedItemsBanner = ({ featuredPaintings }: FeaturedItemsBannerProps) => {
	return (
		<div className="m-0 w-screen bg-transparent pt-20 pb-4">
			<div className="text-center mb-3">
				<h2 className="text-3xl font-cormorant font-bold text-gray-800">
					Featured Works
				</h2>
			</div>
			
			<MantineProvider>
				<div className="max-w-md mx-auto px-8">
					<Carousel
						withIndicators
						loop
					>
						{featuredPaintings.map((painting) => (
							<Carousel.Slide key={painting._id}>
								<Link href={`/paintings/${painting._id}`}>
									<div className="flex flex-col items-center pb-12">
										<div className="art-card-frame w-full max-w-sm aspect-square group cursor-pointer mb-6">
											{painting.images && painting.images[0] && (
												<Image
													alt={painting.name}
													src={painting.images[0].asset.url}
													width={painting.images[0].asset.metadata.dimensions.width}
													height={painting.images[0].asset.metadata.dimensions.height}
													placeholder="blur"
													blurDataURL={painting.images[0].asset.metadata.lqip}
													className="object-contain w-full h-full scale-90 transition-transform duration-300 group-hover:scale-100"
												/>
											)}
										</div>
										<h3 className="text-2xl font-cormorant font-bold text-gray-800 hover:underline">
											{painting.name}
										</h3>
									</div>
								</Link>
							</Carousel.Slide>
						))}
					</Carousel>
				</div>
			</MantineProvider>

			<div className="text-center mt-3">
				<Link
					className="text-lg font-cormorant font-semibold text-gray-700 hover:text-gray-900 hover:underline transition-colors"
					href="/gallery"
				>
					View All Works →
				</Link>
			</div>
		</div>
	);
}
 
export default FeaturedItemsBanner;