export type Quote = {
  id: number;
  quote: string;
  author: string;
  permalink: string;
};

interface QuoteItemProps {
  quote: Quote;
  vote: () => void;
  loading: boolean;
}

const btn =
  "flex justify-self-end items-center px-8 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100";

const QuoteItem = ({ quote, vote, loading }: QuoteItemProps) => (
  <div
    className={`flex flex-col items-center transition-opacity justify-between md:h-72 max-w-xl w-full ${
      loading && "opacity-0"
    }`}
  >
    <blockquote
      key={quote.id}
      className="relative max-w-xl pb-4 m-8 text-lg italic sm:text-xl"
    >
      <p className="mb-4 text-center">&quot;{quote.quote}&quot;</p>
      <div className="flex flex-col">
        <span className="mb-1 text-sm italic font-bold text-center">
          {quote.author}
        </span>
      </div>
    </blockquote>

    <button className={btn} disabled={loading} onClick={() => vote()}>
      Vote
    </button>
  </div>
);

export default QuoteItem;
