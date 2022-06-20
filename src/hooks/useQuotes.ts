import { useState } from "react";
import { useQuery } from "react-query";
import { Quote } from "../components/QuoteItem";

type QuotePair = {
  firstQuote: Quote;
  secondQuote: Quote;
};

export const useRandomQuotes = () => {
  return useQuery<QuotePair, Error>(["get-pair-of-quotes"], () =>
    fetch("/api/quote").then((res) => res.json())
  );
};
