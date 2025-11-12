// app/leaderboard/page.tsx
import LeaderboardPage from "@/components/leaderboard";
import prisma from "@/prisma/prisma";

export default async function Page() {
  let leaderboard: LeaderBoard = [];
  try {
    // fetch most viewed , commented or upvoted collabs collabs

    const topByUpvotes = await prisma.collab.findMany({
      orderBy: {
        upvotes: "desc",
      },
      take: 10, // top 10
      include: {
        author: true,
      },
    });

    const topByViews = await prisma.collab.findMany({
      orderBy: {
        views: "desc",
      },
      take: 10,
      include: {
        author: true,
      },
    });
    const topByComments = await prisma.collab.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
        author: true,
      },
      orderBy: {
        comments: {
          _count: "desc", // ✅ correct syntax
        },
      },
      take: 10,
    });

    // compute overall leaderboard
    const leaderboardData = topByUpvotes.map((collab) => {
      const viewsRank =
        topByViews.findIndex((c) => c.id === collab.id) + 1 || 11;
      const commentsRank =
        topByComments.findIndex((c) => c.id === collab.id) + 1 || 11;
      const upvotesRank =
        topByUpvotes.findIndex((c) => c.id === collab.id) + 1 || 11;
      const overallScore = viewsRank + commentsRank + upvotesRank;

      return {
        collab,
        viewsRank,
        commentsRank,
        upvotesRank,
        overallScore,
      };
    });

    // sort by overall score
    leaderboard = leaderboardData.sort((a, b) => a.overallScore - b.overallScore);

  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
  }

  return <LeaderboardPage leaderboard={leaderboard} />;
}


export type LeaderBoard = {
    collab: {
        author: {
            id: string;
            createdAt: Date;
            username: string;
            email: string | null;
            password: string;
            image: string | null;
        } | null;
    } & {
        id: string;
        slug: string;
        title: string;
        subtitle: string | null;
        description: string | null;
        imageUrl: string | null;
        link: string | null;
        upvotes: number;
        views: number;
        authorId: string | null;
        isFeatured: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    };
    viewsRank: number;
    commentsRank: number;
    upvotesRank: number;
    overallScore: number;
}[]

