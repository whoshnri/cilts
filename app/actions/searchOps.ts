"use server";

import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

type CollabWithDetails = Prisma.CollabGetPayload<
  typeof collabWithDetails
>;
const collabWithDetails = Prisma.validator<Prisma.CollabDefaultArgs>()({
  include: {
    author: { select: { username: true, image: true } },
    _count: { select: { comments: true } },
  },
});

export async function searchCollabs(query: string, offset: number) {
  try {
    const queryLower = query.toLowerCase();
    const results = await prisma.collab.findMany({
      where: {
        OR: [{ title: { contains: queryLower } }, { subtitle: { contains: queryLower } }],
      },
      ...collabWithDetails,
      skip: offset,
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    if (!results) {
      return null;
    }
    return results;
  } catch (error) {
    console.error("Error searching collabs:", error);
    return null;
  }
}

export async function getRecentCollabs() {
  try {
    const results = await prisma.collab.findMany({
      ...collabWithDetails,
      take: 6,
      orderBy: { createdAt: "desc" },
    });
    if (!results) {
      return null;
    } else {
      return results;
    }
  } catch (error) {
    console.error("Error fetching recent collabs:", error);
    return null;
  }
}
