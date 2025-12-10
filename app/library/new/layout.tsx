import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lab | Create a Pitch",
    description:
        "Pitch your dream collaboration on CILTS. Share your creative vision, connect with like-minded creators, and see what the community thinks.",
    openGraph: {
        title: "Lab | Create a Pitch",
        description:
            "Pitch your dream collaboration and share your creative vision.",
    },
};

type Props = {
    children: React.ReactNode;
};

export default function NewCollabLayout({ children }: Props) {
    return <>{children}</>;
}
