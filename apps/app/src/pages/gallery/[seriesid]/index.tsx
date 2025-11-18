import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import { z } from "zod";
import { useState } from "react";
import ArtCard from "../../../../components/ArtCard";
import { nextSanityClient } from "../../../../lib/client";
import { Series, WithRequired } from "../../../../types/types";
import {
	dimensionSchema,
	imageSchema,
	paintingSchema,
	seriesSchema,
} from "../../../../types/zodSchemas";

const seriesWithIdSchema = z.object({
	_id: z.string(),
	name: z.string(),
	paintings: z.array(
		paintingSchema.required({
			_id: true,
		})
	),
});

type SeriesWithId = z.infer<typeof seriesWithIdSchema>;

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await nextSanityClient.fetch(groq`*[_type == 'series'] { _id }`);
	const pathsData = z
		.array(
			z.object({
				_id: z.string(),
			})
		)
		.parse(res);

	const paths = pathsData.map((series) => {
		return { params: { seriesid: series._id } };
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params?.seriesid) return { notFound: true };

	const seriesDataResponse = await nextSanityClient.fetch(
		groq`*[_id == '${params.seriesid}'][0]{
	  _id,
    name,
    paintings[]->{
	  _id,
      name,
      images[]{
        asset->{
          ...,
          metadata
        }
    },
      dimensions[]{
        height,
        width,
        depth
      }
    }
}`
	);
	const seriesData = seriesWithIdSchema.parse(seriesDataResponse);

	return {
		// Returing clean data
		props: { seriesData },
	};
};

const PAINTINGS_PER_PAGE = 6;

const Seriesid = ({ seriesData }: { seriesData: SeriesWithId }) => {
	const [currentPage, setCurrentPage] = useState(1);
	
	const totalPages = Math.ceil(seriesData.paintings.length / PAINTINGS_PER_PAGE);
	const startIndex = (currentPage - 1) * PAINTINGS_PER_PAGE;
	const endIndex = startIndex + PAINTINGS_PER_PAGE;
	const paginatedPaintings = seriesData.paintings.slice(startIndex, endIndex);

	const goToPage = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="page-container">
			<h1>{seriesData.name}</h1>
			<p>Brief description of {seriesData.name}</p>
			<div className="art-card-grid">
				{paginatedPaintings.map((painting, i) => (
					<ArtCard seriesId={seriesData._id} paintingData={painting} key={i} />
				))}
			</div>
			
			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-2 mt-12 mb-8">
					<button
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-4 py-2 font-cormorant font-semibold text-gray-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
						aria-label="Previous page"
					>
						← Previous
					</button>
					
					<div className="flex gap-2">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => goToPage(page)}
								className={`px-3 py-1 font-cormorant font-semibold transition-all rounded ${
									currentPage === page
										? 'bg-gray-300 text-gray-900 shadow-md'
										: 'text-gray-700 hover:bg-gray-200 hover:shadow-sm'
								}`}
								aria-label={`Go to page ${page}`}
								aria-current={currentPage === page ? 'page' : undefined}
							>
								{page}
							</button>
						))}
					</div>
					
					<button
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="px-4 py-2 font-cormorant font-semibold text-gray-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
						aria-label="Next page"
					>
						Next →
					</button>
				</div>
			)}
		</div>
	);
};

export default Seriesid;
