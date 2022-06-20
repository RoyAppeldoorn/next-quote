import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

// POST /api/vote
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const vote = await prisma.vote.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json({ vote });
}
