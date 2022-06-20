export type Quote = {
  id: number;
  quote: string;
  author: string;
  permalink: string;
};

interface QuoteItemProps {
  quote: Quote;
}

const QuoteItem = ({ quote }: QuoteItemProps) => (
  <blockquote className="relative max-w-xl p-4 m-8 text-2xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500">
    <p className="mb-4">&quot;{quote.quote}&quot;</p>
    <cite className="flex items-center">
      <div className="flex flex-col items-start">
        <span className="mb-1 text-sm italic font-bold">{quote.author}</span>
      </div>
    </cite>
  </blockquote>
);

export default QuoteItem;
