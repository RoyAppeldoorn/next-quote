import { useMutation, useQuery, useQueryClient } from "react-query";
import { Quote } from "../components/QuoteItem";

type QuotePair = {
  firstQuote: Quote;
  secondQuote: Quote;
};

type Vote = {
  votedFor: number;
  votedAgainst: number;
};

export const useRandomQuotes = () => {
  return useQuery<QuotePair, Error>(
    ["get-pair-of-quotes"],
    () => fetch("/api/quote").then((res) => res.json()),
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCastVote = () => {
  return useMutation((newVote: Vote) => {
    return fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(newVote),
    });
  });
};
