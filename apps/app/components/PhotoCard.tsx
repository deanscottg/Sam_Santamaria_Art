import NextImage from "next/image";
import Link from "next/link";
import { Photo, WithRequired } from "../types/types";

type Props = {
	// photoData: WithRequired<Photo, "_id">;
	photoData: Omit<Photo, "_createdAt" | "_rev" | "_type" | "_updatedAt">;
};

const PhotoCard = ({ photoData }: Props) => {
	return (
		<div className="art-card">
			<Link key={photoData._id} href={"/photographs/" + photoData._id} className="flex flex-col items-center w-full h-full">
				<div className="art-card-frame flex-shrink-0 group">
					{photoData.images && photoData.images[0] && (
						<NextImage
							alt={photoData.name}
							src={photoData.images[0].asset.url}
							width={photoData.images[0].asset.metadata.dimensions.width}
							height={photoData.images[0].asset.metadata.dimensions.height}
							placeholder="blur"
							blurDataURL={photoData.images[0].asset.metadata.lqip}
							className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-125"
						/>
					)}
				</div>
				<h2 className="text-lg font-cormorant font-bold mt-4">{photoData.name}</h2>
			</Link>
		</div>
	);
};

export default PhotoCard;
function useNextSanityImage() {
	throw new Error("Function not implemented.");
}
