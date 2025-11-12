// components/LeaderboardPage.tsx
"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import Link from "next/link";
import { LeaderBoard } from "@/app/leaderboard/page";

const TiroFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

type SortKey = "upvotes" | "comments" | "views";

interface LeaderboardItem {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  upvotes: number;
  comments: number;
  views: number;
}

interface RankedLeaderboardItem extends LeaderboardItem {
  rank: number;
}

interface LeaderboardPageProps {
  leaderboard: LeaderBoard;
}

const LeaderboardPage: FC<LeaderboardPageProps> = ({ leaderboard }) => {
  const [collabs, setCollabs] = useState<LeaderboardItem[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("upvotes");

  useEffect(() => {
    // Transform leaderboard data to match LeaderboardItem structure
    const transformedData = leaderboard.map((item) => ({  
      id: item.collab.id,
      title: item.collab.title,
      slug: item.collab.slug,
      authorName: item.collab.author ? item.collab.author.username : "Unknown",
      upvotes: item.collab.upvotes,
      comments: item.commentsRank,
      views: item.collab.views,
    }));
    setCollabs(transformedData);
  }, [leaderboard]);

  const rankedList = useMemo((): RankedLeaderboardItem[] => {
    const sortedCollabs = [...collabs].sort((a, b) => b[sortBy] - a[sortBy]);
    return sortedCollabs.map((collab, index) => ({
      ...collab,
      rank: index + 1,
    }));
  }, [collabs, sortBy]);

  const refreshLeaderboard = async () => {
    window.location.reload();
  }

  return (
    <section className="py-24 sm:py-32 min-h-screen">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h1
            className={`${TiroFont.className} text-4xl font-bold text-gray-900 sm:text-5xl`}
          >
            Leaderboard
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600">
            See which collaborations are trending this week.
          </p>
        </div>

        <div className="my-10 flex items-center justify-between gap-4">
          <div className="flex shrink-0 space-x-1 sm:space-x-2 rounded-full bg-white/70 backdrop-blur-2xl p-1">
            {(["upvotes", "comments", "views"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
                  sortBy === key
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Top {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={refreshLeaderboard}
            className="flex items-center justify-center gap-2 rounded-full bg-black font-semibold text-white shadow-sm transition hover:bg-black/70 p-2.5 sm:px-4 sm:py-2"
            aria-label="Refresh Leaderboard"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline text-sm">Refresh</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="hidden sm:table-header-group bg-white border-b">
              <tr>
                <th
                  scope="col"
                  className="w-20 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Collab
                </th>
                <th
                  scope="col"
                  className="w-32 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Upvotes
                </th>
                <th
                  scope="col"
                  className="w-32 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Comments
                </th>
                <th
                  scope="col"
                  className="w-32 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  Views
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {! (rankedList.length === 0) ? rankedList.map((item) => (
                <tr
                  key={item.id}
                  className="block sm:table-row border-b sm:border-b-0 last:border-b-0 even:bg-gray-50/50 sm:even:bg-white sm:hover:bg-gray-50"
                >
                  <td className="w-full sm:w-20 px-4 pt-3 pb-1 sm:px-6 sm:py-4 whitespace-nowrap align-top sm:table-cell">
                      <span className="text-xl font-bold text-gray-700">
                        {item.rank}
                      </span>
                  </td>

                  <td className="block sm:table-cell w-full sm:w-32 px-4 pb-3 pt-1 sm:px-6 sm:py-4 whitespace-nowrap align-middle">
                        <Link
                          href={`/collabs/${item.slug}`}
                          className="font-semibold text-gray-800 hover:text-yellow-700"
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 ">
                          {item.authorName}
                        </p>
                  </td>

                  <td className="block sm:table-cell w-full sm:w-32 px-4 pb-3 pt-1 sm:px-6 sm:py-4 whitespace-nowrap align-middle">
                    <div className="flex justify-between sm:justify-start">
                      <span className="text-sm font-semibold text-gray-600 sm:hidden">
                        Upvotes
                      </span>
                      <span className="text-sm text-gray-800">
                        {item.upvotes.toLocaleString()}
                      </span>
                    </div>
                  </td>

                  <td className="block sm:table-cell w-full sm:w-32 px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap align-middle">
                    <div className="flex justify-between sm:justify-start">
                      <span className="text-sm font-semibold text-gray-600 sm:hidden">
                        Comments
                      </span>
                      <span className="text-sm text-gray-800">
                        {(item.comments).toLocaleString()}
                      </span>
                    </div>
                  </td>

                  <td className="block sm:table-cell w-full sm:w-32 px-4 pt-2 pb-3 sm:px-6 sm:py-4 whitespace-nowrap align-middle">
                    <div className="flex justify-between sm:justify-start">
                      <span className="text-sm font-semibold text-gray-600 sm:hidden">
                        Views
                      </span>
                      <span className="text-sm text-gray-800">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPage;
