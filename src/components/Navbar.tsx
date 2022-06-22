import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="mb-8 text-4xl font-bold text-center">
        Which quote is funnier?
      </div>
      <div className="w-full text-xl text-center">
        <Link href="/">
          <a
            className={`${
              router.pathname === "/" ? "text-white" : "text-gray-400"
            }`}
          >
            Home
          </a>
        </Link>
        <span className="p-4">{"-"}</span>
        <Link href="/results">
          <a
            className={`${
              router.pathname === "/results" ? "text-white" : "text-gray-400"
            }`}
          >
            Results
          </a>
        </Link>
        <a href="https://github.com/RoyAppeldoorn/next-quote" />
      </div>
    </nav>
  );
};

export default Navbar;
