import type { NextPage } from "next";
import Link from "next/link";
import QuoteItem from "../components/QuoteItem";
import { useCastVote, useRandomQuotes } from "../hooks/useQuotes";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: quotePair, isLoading, refetch } = useRandomQuotes();
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

    refetch();
  };

  const isFetchingNext = voteMutation.isLoading || isLoading;

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen p-8">
      <div className="text-2xl text-center">Which quote is funnier?</div>

      {quotePair && (
        <div className="flex items-center justify-center animate-fade-in">
          <QuoteItem
            quote={quotePair.firstQuote}
            vote={() => voteForQuote(quotePair.firstQuote.id)}
            loading={isFetchingNext}
          />
          <span className="m-8">VERSUS</span>
          <QuoteItem
            quote={quotePair.secondQuote}
            vote={() => voteForQuote(quotePair.secondQuote.id)}
            loading={isFetchingNext}
          />
        </div>
      )}

      {!quotePair && (
        <Image src="/rings.svg" width={192} height={192} alt="loading.." />
      )}

      <div className="w-full text-xl text-center">
        <Link href="/results">
          <a>Results</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
