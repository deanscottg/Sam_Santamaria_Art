import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import NextImage from "next/image";
import Link from "next/link";
import { z } from "zod";
import { nextSanityClient } from "../../../lib/client";
import { Painting } from "../../../types/types";
import { paintingSchema } from "../../../types/zodSchemas";
import { Carousel } from "@mantine/carousel";
import { MantineProvider } from "@mantine/core";
// import classes from "../../styles/Carousel.module.css";

export const getStaticPaths: GetStaticPaths = async () => {
	const paintingsRes = await nextSanityClient.fetch(
		groq`*[_type == 'painting']{
    _id
  }`
	);
	const paintingPathsData = z
		.array(
			z.object({
				_id: z.string(),
			})
		)

		.parse(paintingsRes);

	const paths = paintingPathsData.map((painting) => {
		return { params: { paintingid: painting._id } };
	});

	return {
		paths,
		fallback: false,
	};
};
// /gallery/[seriesid]/[paintingid]

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params?.paintingid) return { notFound: true };
	const paintingsDataResponse = await nextSanityClient.fetch(
		groq`*[_id == '${params.paintingid}'][0]{
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

	const paintingsData = paintingSchema
		.omit({
			_createdAt: true,
			_rev: true,
			_type: true,
			_updatedAt: true,
		})
		.parse(paintingsDataResponse);

	return {
		props: { paintingsData },
	};
};

const PaintingId = ({
	paintingsData,
}: {
	paintingsData: Omit<Painting, "_createdAt" | "_updatedAt" | "_type" | "_rev">;
}) => {
	const slides = paintingsData.images?.map((image, i) => (
		<Carousel.Slide key={i}>
			<NextImage
				alt={paintingsData.name}
				src={image.asset.url}
				width={0}
				height={0}
				sizes={"100vw"}
				placeholder="blur"
				blurDataURL={image.asset.metadata.lqip}
				className="pt-24 object-contain h-full w-full"
			/>
		</Carousel.Slide>
	));

	return (
		<div className="page-container">
			<h1>{paintingsData.name}</h1>
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

			{/* {paintingsData.images && paintingsData.images[0] && (
					<NextImage
						alt={paintingsData.name}
						src={paintingsData.images[0].asset.url}
						width={paintingsData.images[0].asset.metadata.dimensions.width}
						height={paintingsData.images[0].asset.metadata.dimensions.height}
						placeholder="blur"
						blurDataURL={paintingsData.images[0].asset.metadata.lqip}
						className="pt-24"
					/>
				)} */}

			<p className="italic pt-8">
				Available as: Original | Limited Edition Print{" "}
			</p>
			<p>Dimensions offered: </p>
			<ul>
				{paintingsData.dimensions && paintingsData.dimensions.map((dimension) => (
					<p key={paintingsData.name}>
						{dimension.height} x {dimension.width} x {dimension.depth} (inches)
					</p>
				))}
			</ul>
			<div className="mt-8">
			<Link href={`/contact?artwork=${encodeURIComponent(paintingsData.name)}`} 
			className="inline-block px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors">
				<button>Inquire About This Painting</button>
			</Link>
		</div>
		 </div>
	);
};

export default PaintingId;
