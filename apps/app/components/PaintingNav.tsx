import Link from "next/link";
import { Series } from "../types/types";

const PaintingNav = ({
  seriesData,
}: {
  seriesData: Pick<Series, "_id" | "name">[];
}) => {
  return (
    <div className="w-full md:w-auto">
      <ul className="flex flex-col justify-center p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-white md:bg-transparent space-y-2 md:space-y-0">
        {seriesData.map((series) => (
          <Link
            className="painting-nav-link block text-center"
            key={series._id}
            href={"/gallery/" + series._id}
          >
            {series.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PaintingNav;
