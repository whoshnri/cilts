import type { Metadata } from "next";
import { fetchCollabById } from "@/app/actions/collabsOps";

type Props = {
    params: Promise<{ collabSlug: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { collabSlug } = await params;
    const collabData = await fetchCollabById(collabSlug);

    if (!collabData || collabData.status === "error" || !collabData.data) {
        return {
            title: "Collab Not Found",
            description: "The collaboration you are looking for does not exist.",
        };
    }

    const collab = collabData.data;
    const title = collab.title;
    const description =
        collab.subtitle || collab.description || "View this collaboration on CILTS";

    return {
        title,
        description,
        openGraph: {
            title: `${title} | CILTS`,
            description,
            images: collab.imageUrl ? [{ url: collab.imageUrl }] : undefined,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | CILTS`,
            description,
            images: collab.imageUrl ? [collab.imageUrl] : undefined,
        },
    };
}

export default function CollabSlugLayout({ children }: Props) {
    return <>{children}</>;
}
