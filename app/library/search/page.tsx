import type { Metadata } from "next";
import SearchResultsClient from "./SearchResultsClient";

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { query } = await searchParams;

  if (query && query.trim()) {
    return {
      title: `Search: "${query}"`,
      description: `Search results for "${query}" on CILTS. Discover collaborative pitch decks matching your interests.`,
      openGraph: {
        title: `Search: "${query}" | CILTS`,
        description: `Find collaborative pitches related to "${query}".`,
      },
    };
  }

  return {
    title: "Explore Collabs",
    description:
      "Explore and discover collaborative pitch decks from the CILTS community. Browse the latest creative ideas and collaborations.",
    openGraph: {
      title: "Explore Collabs | CILTS",
      description: "Browse the latest creative ideas and collaborations.",
    },
  };
}

export default function SearchResultsPage() {
  return <SearchResultsClient />;
}
