import type { NextApiRequest, NextApiResponse } from "next";
import { getVotingOptions } from "../../helpers/getRandomQuote";
import { prisma } from "../../lib/prisma";

// POST /api/quote
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [firstQuoteId, secondQuoteId] = getVotingOptions();

  const bothQuotes = await prisma.quote.findMany({
    where: { id: { in: [firstQuoteId, secondQuoteId] } },
  });

  if (bothQuotes.length !== 2) {
    throw new Error("Found no quotes");
  }

  res
    .status(200)
    .json({ firstQuote: bothQuotes[0], secondQuote: bothQuotes[1] });
}
