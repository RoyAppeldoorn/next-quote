import type { NextPage } from "next";
import { useQuery, useQueryClient } from "react-query";
import Quote from "../components/Quote";

interface Quote {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: String[];
}

const Home: NextPage = () => {
  const {
    isLoading,
    error,
    data: quote,
    isError,
  } = useQuery<Quote, Error>("quoteData", () =>
    fetch("https://api.quotable.io/random").then((res) => res.json())
  );

  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries("quoteData");
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      {quote ? <Quote content={quote.content} author={quote.author} /> : null}
      <button
        className="px-4 py-2 text-gray-700 bg-white rounded-sm"
        onClick={refetch}
      >
        Renew!
      </button>
    </div>
  );
};

export default Home;
