import { Quote } from "../src/components/QuoteItem";
import { prisma } from "../src/lib/prisma";
import { data } from "./data";

const executeBackfill = async () => {
  const formattedQuotes = data.map((q: Quote) => ({
    id: q.id,
    quote: q.quote,
    author: q.author,
    permalink: q.permalink,
  }));

  const creation = await prisma.quote.createMany({ data: formattedQuotes });

  console.log("Creation?", creation.count);
};

executeBackfill();
