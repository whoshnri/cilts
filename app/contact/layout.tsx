import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question, a proposal, or partnership inquiry? Get in touch with the CILTS team. We'd love to hear from you.",
  openGraph: {
    title: "Contact Us | CILTS",
    description:
      "Get in touch with the CILTS team for questions, proposals, or partnerships.",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | CILTS",
    description:
      "Get in touch with the CILTS team for questions, proposals, or partnerships.",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function ContactLayout({ children }: Props) {
  return <>{children}</>;
}

