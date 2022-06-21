// we currently know that there are 44 quotes in de database
const MAX_QUOTE_ID = 44;

export const getUniqueQuoteId: (quoteId?: number) => number = (quoteId) => {
  const randomQuoteId = Math.floor(Math.random() * MAX_QUOTE_ID) + 1;

  if (randomQuoteId !== quoteId) return randomQuoteId;
  return getUniqueQuoteId(quoteId);
};

export const getVotingOptions = () => {
  const firstId = getUniqueQuoteId();
  const secondId = getUniqueQuoteId(firstId);

  return [firstId, secondId];
};
