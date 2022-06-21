import type { NextPage } from "next";
import Link from "next/link";
import QuoteItem from "../components/QuoteItem";
import { useCastVote, useRandomQuotes } from "../hooks/useQuotes";

const Home: NextPage = () => {
  const { data: quotePair } = useRandomQuotes();
  const voteMutation = useCastVote();

  const voteForQuote = (selectedQuote: number) => {
    if (!quotePair) return;

    if (selectedQuote === quotePair?.firstQuote.id) {
      voteMutation.mutate({
        votedFor: quotePair.firstQuote.id,
        votedAgainst: quotePair.secondQuote.id,
      });
    } else {
      voteMutation.mutate({
        votedFor: quotePair.secondQuote.id,
        votedAgainst: quotePair.firstQuote.id,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen p-8">
      <div className="text-2xl text-center">Which quote is funnier?</div>

      {quotePair && (
        <div className="flex items-center justify-center">
          <QuoteItem
            quote={quotePair.firstQuote}
            vote={() => voteForQuote(quotePair.firstQuote.id)}
          />
          <span className="m-8">VERSUS</span>
          <QuoteItem
            quote={quotePair.secondQuote}
            vote={() => voteForQuote(quotePair.secondQuote.id)}
          />
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
