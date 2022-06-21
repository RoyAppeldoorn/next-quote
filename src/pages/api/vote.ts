import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

// POST /api/vote
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = JSON.parse(req.body);
  const vote = await prisma.vote.create({
    data: {
      votedAgainstId: input.votedAgainst,
      votedForId: input.votedFor,
    },
  });
  res.status(200).json({ vote });
}
