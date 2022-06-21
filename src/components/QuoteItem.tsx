export type Quote = {
  id: number;
  quote: string;
  author: string;
  permalink: string;
};

interface QuoteItemProps {
  quote: Quote;
  vote: () => void;
}

const btn =
  "items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100";

const QuoteItem = ({ quote, vote }: QuoteItemProps) => (
  <div className="flex flex-col items-center">
    <blockquote
      key={quote.id}
      className="relative max-w-xl pb-4 m-8 text-lg italic border-b-2 border-gray-700 sm:text-xl"
    >
      <p className="mb-4">&quot;{quote.quote}&quot;</p>
      <cite className="flex items-center">
        <div className="flex flex-col items-start">
          <span className="mb-1 text-sm italic font-bold">{quote.author}</span>
        </div>
      </cite>
    </blockquote>

    <button className={btn} onClick={() => vote()}>
      Funnier
    </button>
  </div>
);

export default QuoteItem;
