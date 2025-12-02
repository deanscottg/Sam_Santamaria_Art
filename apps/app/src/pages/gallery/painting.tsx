import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import PaintingNav from "../../../components/PaintingNav";
import { nextSanityClient } from "../../../lib/client";
import { Series } from "../../../types/types";
import { seriesSchema } from "../../../types/zodSchemas";
import { z } from "zod";

export const getStaticProps: GetStaticProps = async () => {
	const seriesDataResponse = await nextSanityClient.fetch(
		groq`*[_type == 'series']{
            _id,
            name
        }`
	);

	const seriesData = z
		//   Create Array schema to validate
		.array(
			// Using the seriesSchema, only selecting the fields to test for
			seriesSchema.pick({
				_id: true,
				name: true,
			})
		)
		// Validating the data
		.parse(seriesDataResponse);

	return {
		props: { seriesData },
	};
};
const Paintings = ({
	seriesData,
}: {
	seriesData: Pick<Series, "_id" | "name">[];
}) => {
	return (
		<div className="page-container h-screen">
			<div className="py-4">
				<h1 className="text-center py-2 text-black">
					Paintings and Editioned Prints
				</h1>
				<p className="my-10 mx-4 sm:mx-20 md:mx-40 lg:mx-60 text-center text-black">
					All original, one-of-a-kind paintings and photographs are
					available. Limited and numbered editions of the originals
					are reproduced as museum quality prints on canvas or paper.
					Canvas prints are stretched over 1 ½ -inch wood mounts and
					are ready to hang without framing. Prints on acid free
					deckle edge paper (feathery edges) are unframed or come with
					the option to be matted and framed to tastefully present the
					art and photographs.
				</p>
				<PaintingNav seriesData={seriesData}></PaintingNav>
			</div>

			{/* <ArtCard /> */}
		</div>
	);
};

export default Paintings;
