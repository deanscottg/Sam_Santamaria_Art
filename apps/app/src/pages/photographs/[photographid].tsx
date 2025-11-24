import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import NextImage from "next/image";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { nextSanityClient } from "../../../lib/client";
import { Photo } from "../../../types/types";
import { photoSchema } from "../../../types/zodSchemas";
import { Carousel } from "@mantine/carousel";
import { MantineProvider } from "@mantine/core";

export const getStaticPaths: GetStaticPaths = async () => {
	const photoRes = await nextSanityClient.fetch(
		groq`*[_type == 'photograph']{
            _id
        }`
	);
	const photoPathsData = z
		.array(
			z.object({
				_id: z.string(),
			})
		)
		.parse(photoRes);

	const paths = photoPathsData.map((photo) => {
		return { params: { photographid: photo._id } };
	});
	console.log("photo paths", paths);
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params?.photographid) return { notFound: true };
	const photoDataResponse = await nextSanityClient.fetch(
		groq`*[_id == '${params.photographid}'][0]{
    _id,
        name,
        images[]{
        asset->{
            ...,
            metadata,
        }
        },
        dimensions[]
    }`
	);
	const photosData = photoSchema
		.omit({
			_createdAt: true,
			_rev: true,
			_type: true,
			_updatedAt: true,
		})
		.parse(photoDataResponse);
	return {
		props: { photosData },
	};
};

const PhotgraphId = ({
	photosData,
}: {
	photosData: Omit<Photo, "_createdAt" | "_updatedAt" | "_type" | "_rev">;
}) => {
	const slides = photosData.images?.map((image, i) => (
		<Carousel.Slide key={i}>
			<NextImage
				alt={photosData.name}
				src={image.asset.url}
				width={0}
				height={0}
				sizes={"100vw"}
				placeholder="blur"
				blurDataURL={image.asset.metadata.lqip}
				className="pt-24 object-cover h-full w-full"
			/>
		</Carousel.Slide>
	));
	return (
		<div className="page-container">
			<h1>{photosData.name}</h1>
			<div className="flex flex-col items-center">
				<MantineProvider>
					<Carousel
						withIndicators
						w={"40%"}
						h={"75%"}
						slideSize={"100%"}
						withControls
						loop
						// classNames={classes}
					>
						{/* <div className="flex flex-col items-center"> */}
						{slides}
					</Carousel>
				</MantineProvider>
			</div>

			{/* <Image
          className="pt-24"
          alt={photosData.name}
          src={photosData.image.asset.url}
          width={photosData.image.asset.metadata.dimensions.width}
          height={photosData.image.asset.metadata.dimensions.height}
          placeholder="blur"
          blurDataURL={photosData.image.asset.metadata.lqip}
        /> */}
			<p className="italic pt-8">
				Availbale as: Original | Limited Edition Print{" "}
			</p>
			<p>Dimensions offered: </p>
			<ul>
				{photosData.dimensions.map((dimension) => (
					<p key={photosData.name}>
						{dimension.height} x {dimension.width} x {dimension.depth} (inches)
					</p>
				))}
			</ul>
			
			<div className="mt-8">
				<Link 
					href={`/contact?artwork=${encodeURIComponent(photosData.name)}`}
					className="inline-block px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
				>
					Inquire About This Photograph
				</Link>
			</div>
		</div>
	);
};

export default PhotgraphId;
