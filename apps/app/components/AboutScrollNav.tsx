import Link from "next/link";
const AboutScrollNav = () => {
  return (
    <div className="w-full md:w-auto">
      <ul className="flex flex-col justify-center p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-white md:bg-transparent space-y-2 md:space-y-0">
        <Link href="#artistStatment" className="painting-nav-link block text-center">
          {" "}
          Artist Statement{" "}
        </Link>
        <Link href="#artActivities" className="painting-nav-link block text-center">
          {" "}
          Art Activities{" "}
        </Link>
        <Link href="#publications" className="painting-nav-link block text-center">
          {" "}
          Publications{" "}
        </Link>
        <Link href="#professional" className="painting-nav-link block text-center">
          {" "}
          Professional Career{" "}
        </Link>
      </ul>
    </div>
  );
};

export default AboutScrollNav;
