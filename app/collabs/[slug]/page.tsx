import CollabDetailsPage from "@/components/collabsdetailpage";
import { type Collab } from "@/types";

import projectImage from "@/public/images/main.jpg";
import authorAvatar from "@/public/images/main.jpg";

const dummyCollabData: Collab = {
  id: "cllab_12345",
  slug: "ai-powered-album-art-generator",
  title: "AI-Powered Album Art Generator",
  subtitle: "A collaboration between generative artists and music producers.",
  description: "This project explores the intersection of artificial intelligence and music culture. By training a GAN on thousands of classic album covers, our tool can generate unique, high-resolution artwork that responds to the mood and genre of a track. We are seeking feedback from musicians to refine the algorithm.",
  imageUrl: projectImage,
  link: "https://github.com/example/ai-album-art",
  tags: [
    { name: "AI" },
    { name: "MUSIC" },
    { name: "DESIGN" },
    { name: "ART" },
  ],
  upvotes: 1247,
  views: 15800,
  comments: [
    {
      id: "comment_1",
      content: "This is an incredible idea! I'm a producer and would love to test this out.",
      author: { id: "user_1", username: "Alicia", image: null },
      createdAt: new Date("2025-10-26T10:00:00Z"),
    },
     {
      id: "comment_2",
      content: "What model are you using for the generation? The results look amazing.",
      author: { id: "user_2", username: "John", image: null },
      createdAt: new Date("2025-10-26T11:30:00Z"),
    },
  ],
  author: {
    id: "user_author",
    username: "JaneDev",
    image: authorAvatar,
  },
  createdAt: new Date("2025-10-26T09:00:00Z"),
};

export default function Page({ params }: { params: { slug: string } }) {

  console.log("Fetching data for slug:", params.slug);

  return <CollabDetailsPage initialCollabData={dummyCollabData} />;
}