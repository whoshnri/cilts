
import { StaticImageData } from "next/image";


export type Tag = 
  | "DESIGN" | "DEVELOPMENT" | "AI" | "EDUCATION" 
  | "PRODUCT" | "ART" | "RESEARCH" | "MUSIC" 
  | "WRITING" | "BUSINESS";

export interface User {
  id: string;
  username: string;
  email?: string | null;
  image?: string | StaticImageData | null;
}

export interface Comment {
  id: string;
  content: string;
  author: User; // Assuming author is always fetched
  createdAt: Date;
}

export interface Collab {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | StaticImageData | null;
  link?: string | null;
  tags: { name: Tag }[]; // Reflects the CollabTag model
  upvotes: number;
  views: number;
  comments: Comment[];
  author: User; // Assuming author is always fetched
  createdAt: Date;
}