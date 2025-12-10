import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Profile",
    description:
        "Manage your CILTS profile, view your pitched collaborations, track engagement, and connect with the creative community.",
    openGraph: {
        title: "My Profile | CILTS",
        description:
            "Manage your profile and view your pitched collaborations on CILTS.",
    },
};

type Props = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: Props) {
    return <>{children}</>;
}
