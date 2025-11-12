import React from "react";

export const metadata = {
  title: "Contact",
  description:
    "Contact page layout — reach out with questions, feedback, or partnership inquiries.",
};

type Props = {
  children: React.ReactNode;
};

export default function ContactLayout({ children }: Props) {
  return <>{children}</>;
}
