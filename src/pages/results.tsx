import type { GetStaticProps } from "next";
import Head from "next/head";
import { prisma } from "../lib/prisma";

type QuoteQueryResponse = {
  id: number;
  quote: string;
  author: string;
  _count: {
    VoteFor: number;
    VoteAgainst: number;
  };
};

const generateCountPercent = (quote: QuoteQueryResponse) => {
  const { VoteFor, VoteAgainst } = quote._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const QuoteListing: React.FC<{ quote: QuoteQueryResponse; rank: number }> = ({
  quote,
  rank,
}) => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 text-md sm:pl-6 font-bold">
        {rank}
      </td>
      <td className="hidden whitespace-nowrap py-4 px-3 text-sm md:table-cell">
        {quote.author}
      </td>
      <td className="whitespace-normal py-4 px-3 text-sm break-words">
        {quote.quote}
      </td>
      <td className="hidden whitespace-nowrap py-4 px-3 text-sm md:table-cell">
        {generateCountPercent(quote).toFixed(0) + "%"}
      </td>
    </tr>
  );
};

const ResultsPage: React.FC<{ quotes: QuoteQueryResponse[] }> = (props) => {
  const filteredQuotes = props.quotes.sort((a, b) => {
    return generateCountPercent(b) - generateCountPercent(a);
  });

  return (
    <div className="flex flex-col items-center p-8">
      <Head>
        <title>Funniest Quote Results</title>
      </Head>
      <div className="text-2xl text-center font-bold">Results</div>

      <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 mt-8">
        <table className="divide-y divide-gray-500 table-auto max-w-xl min-w-full">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
              >
                Rank
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-sm font-semibold text-white hidden md:table-cell"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-sm font-semibold text-white"
              >
                Quote
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-sm font-semibold text-white hidden md:table-cell"
              >
                Percentage
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredQuotes.map((currentQuote, index) => {
              return (
                <QuoteListing
                  quote={currentQuote}
                  key={index}
                  rank={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
  const quoteOrdered = await prisma.quote.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      quote: true,
      author: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
  const TEN_MINUTES = 60 * 10;
  return { props: { quotes: quoteOrdered }, revalidate: TEN_MINUTES };
};
