import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description:
        "Join CILTS to pitch dream collaborations, upvote creative ideas, and shape culture. Sign in or create an account to get started.",
    openGraph: {
        title: "Sign In | CILTS",
        description:
            "Join CILTS to pitch dream collaborations and shape culture.",
    },
};

type Props = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
    return <>{children}</>;
}
