// we currently know that there are 44 quotes in de database
const MAX_QUOTE_ID = 44;

export const getUniqueQuoteId: (notThisOne?: number) => number = (
  notThisOne
) => {
  const quoteId = Math.floor(Math.random() * MAX_QUOTE_ID) + 1;

  if (quoteId !== notThisOne) return quoteId;
  return getUniqueQuoteId(notThisOne);
};

export const getVotingOptions = () => {
  const firstId = getUniqueQuoteId();
  const secondId = getUniqueQuoteId(firstId);

  return [firstId, secondId];
};
