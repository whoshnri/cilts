import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard",
    description:
        "Discover the top-ranked collaborative pitches on CILTS. See which ideas are trending by views, upvotes, and community engagement.",
    keywords: ["leaderboard", "top collabs", "trending", "popular pitches"],
    openGraph: {
        title: "Leaderboard | CILTS",
        description:
            "Discover top-ranked collaborative pitches by views, upvotes, and engagement.",
    },
};

type Props = {
    children: React.ReactNode;
};

export default function LeaderboardLayout({ children }: Props) {
    return <>{children}</>;
}
