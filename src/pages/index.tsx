import type { NextPage } from "next";
import Link from "next/link";
import QuoteItem from "../components/QuoteItem";
import { useRandomQuotes } from "../hooks/useQuotes";

const Home: NextPage = () => {
  const { data: quotePair } = useRandomQuotes();

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen p-8">
      <div className="text-2xl text-center">
        Which quote inspires you the most?
      </div>

      {quotePair && (
        <div className="flex items-center justify-center">
          <QuoteItem quote={quotePair.firstQuote} />
          <span className="m-8">VERSUS</span>
          <QuoteItem quote={quotePair.secondQuote} />
        </div>
      )}

      {!quotePair && <img src="/rings.svg" className="w-48" alt="loading.." />}

      <div className="w-full text-xl text-center">
        <Link href="/results">
          <a>Results</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
