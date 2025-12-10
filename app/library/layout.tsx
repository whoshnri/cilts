import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collab Library",
    description:
        "Explore a curated collection of collaborative pitch decks and creative ideas from the CILTS community. Discover, upvote, and get inspired.",
    keywords: ["collab library", "pitch decks", "creative ideas", "collaboration gallery"],
    openGraph: {
        title: "Collab Library | CILTS",
        description:
            "Explore curated collaborative pitch decks from the CILTS community.",
    },
};

type Props = {
    children: React.ReactNode;
};

export default function LibraryLayout({ children }: Props) {
    return <>{children}</>;
}
