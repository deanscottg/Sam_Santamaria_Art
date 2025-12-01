import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import { z } from "zod";
import FeaturedItemsBanner from "../../components/FeaturedItemsBanner";
import { nextSanityClient } from "../../lib/client";
import { paintingSchema } from "../../types/zodSchemas";
import { Painting } from "../../types/types";

const inter = Inter({ subsets: ["latin"] });

// Schema for featured paintings
const featuredPaintingSchema = paintingSchema.required({
	_id: true,
});

type FeaturedPainting = z.infer<typeof featuredPaintingSchema>;

export const getStaticProps: GetStaticProps = async () => {
	// Fetch all paintings and select 3 random ones
	const allPaintingsResponse = await nextSanityClient.fetch(
		groq`*[_type == 'painting']{
			_id,
			name,
			images[]{
				asset->{
					...,
					metadata
				}
			},
			dimensions[]
		}`
	);

	const allPaintings = z.array(featuredPaintingSchema).parse(allPaintingsResponse);
	
	// Shuffle and select 3 random paintings
	const shuffled = [...allPaintings].sort(() => 0.5 - Math.random());
	const featuredPaintings = shuffled.slice(0, 3);

	return {
		props: { featuredPaintings },
		revalidate: 3600, // Regenerate with new random paintings every hour
	};
};

export default function Home({ featuredPaintings }: { featuredPaintings: FeaturedPainting[] }) {
	return (
		<div>
			<div className="">
				<h1 className="text-center  py-2">Sam Santamaria Art</h1>
				<h2 className="text-center font-cormorant font-bold text-3xl">
					Fine Art out of Tampa, Florida
				</h2>
				<p className="text-center text-xl font-cormorant font-medium tracking-wider">
					Artist | Photographer | Author{" "}
				</p>
				<p className="text-center">
					Currently under contruction check back for further updates!
				</p>
			</div>
		<div className="justify-center flex py-16 mb-16">
			<Image
				src="/SamBackground.png"
				alt="ArtistImage"
				height={700}
				width={350}
				className="shadow-2xl border-[16px] border-white outline outline-2 outline-gray-300"
				style={{ height: '600px', width: 'auto' }}
			/>				{/* <div className='flex  flex-col items-row  rounded-md h-130 w-150 m-sm  justify-center items-center pt-16'>
          <FeaturedItems></FeaturedItems>
          <div>
              <p className="text-center py-10">Featured Works</p>

          </div>
        // </div>  */}
			</div>

			{/* <div className="m-0 w-screen bg-white h-40">
          
        </div> */}

			{/* <Link  className="btn" href="/gallery">Check out my latest work!</Link> */}
			<FeaturedItemsBanner featuredPaintings={featuredPaintings} />
		</div>
	);
}
