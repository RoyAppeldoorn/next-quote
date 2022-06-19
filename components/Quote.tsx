interface QuoteProps {
  content: string;
  author: string;
}

const Quote = ({ content, author }: QuoteProps) => (
  <blockquote className="relative max-w-xl p-4 m-8 text-2xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500">
    <p className="mb-4">&quot;{content}&quot;</p>
    <cite className="flex items-center">
      <div className="flex flex-col items-start">
        <span className="mb-1 text-sm italic font-bold">{author}</span>
      </div>
    </cite>
  </blockquote>
);

export default Quote;
