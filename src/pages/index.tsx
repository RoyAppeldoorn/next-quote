import type { NextPage } from "next";
import Link from "next/link";
import QuoteItem from "../components/QuoteItem";
import { useCastVote, useRandomQuotes } from "../hooks/useQuotes";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: quotePair, isLoading, refetch, isFetching } = useRandomQuotes();
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
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="flex items-center justify-center">
        {quotePair && (
          <div className="flex flex-col items-center justify-center md:flex-row animate-fade-in">
            <QuoteItem
              quote={quotePair.firstQuote}
              vote={() => voteForQuote(quotePair.firstQuote.id)}
              loading={isFetchingNext}
            />
            <span className="self-center m-8 mt-16 font-bold text-white md:mt-8">
              VERSUS
            </span>
            <QuoteItem
              quote={quotePair.secondQuote}
              vote={() => voteForQuote(quotePair.secondQuote.id)}
              loading={isFetchingNext}
            />
          </div>
        )}
      </div>

      {!quotePair ||
        (isFetching && (
          <Image src="/rings.svg" width={192} height={192} alt="loading.." />
        ))}
    </div>
  );
};

export default Home;
