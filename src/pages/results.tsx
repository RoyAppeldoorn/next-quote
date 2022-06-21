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

const QuoteRow: React.FC<{ quote: QuoteQueryResponse; rank: number }> = ({
  quote,
  rank,
}) => {
  return (
    <tr>
      <td className="py-4 pl-4 font-bold whitespace-nowrap text-md sm:pl-6">
        {rank}
      </td>
      <td className="hidden px-3 py-4 text-sm whitespace-nowrap md:table-cell">
        {quote.author}
      </td>
      <td className="px-3 py-4 text-sm break-words whitespace-normal">
        {quote.quote}
      </td>
      <td className="hidden px-3 py-4 text-sm whitespace-nowrap md:table-cell">
        {generateCountPercent(quote).toFixed(2) + "%"}
      </td>
    </tr>
  );
};

const ResultsPage: React.FC<{ quotes: QuoteQueryResponse[] }> = (props) => {
  const filteredQuotes = props.quotes.sort((a, b) => {
    return generateCountPercent(b) - generateCountPercent(a);
  });

  return (
    <div className="flex flex-col items-center py-8">
      <Head>
        <title>Funniest Quote Results</title>
      </Head>
      <div className="text-2xl font-bold text-center">
        Funniest Quote Results
      </div>

      <div className="mt-8 overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
        <table className="max-w-4xl min-w-full divide-y divide-gray-500 table-auto">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-sm font-semibold text-left text-white sm:pl-6"
              >
                Rank
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3 text-sm font-semibold text-left text-white md:table-cell"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-sm font-semibold text-left text-white"
              >
                Quote
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3 text-sm font-semibold text-left text-white md:table-cell whitespace-nowrap"
              >
                Win %
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredQuotes.map((currentQuote, index) => {
              return (
                <QuoteRow quote={currentQuote} key={index} rank={index + 1} />
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
