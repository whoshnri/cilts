// components/CollabDetailsPage.tsx
"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Bookmark,
  MessageCircle,
  Eye,
  ExternalLink,
  Share2Icon,
} from "lucide-react";
import { Collab, Comment, User, CollabTag } from "@prisma/client";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import { Button } from "./ui/button";
import SharePopup from "./share-popup";
import {
  addComment,
  addView,
  bookmarkCollab,
  removeBookmarkCollab,
  upVoteCollab,
} from "@/app/actions/collabsOps";

const TiroFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

export type CompactCollab = {
  id: string;
  createdAt: Date;
  authorId: string | null;
  slug: string;
  title: string;
  tags: CollabTag[];
  bookmarkedBy: User[];
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  link: string | null;
  upvotes: number;
  views: number;
  updatedAt: Date;
} & {
  author: {
    id: string;
    username: string;
    email: string | null;
    password: string;
    image: string | null;
    createdAt: Date;
  } | null;
  comments: ({
    id: string;
    createdAt: Date;
    content: string;
    collabId: string;
    authorId: string | null;
  } & {
    author: {
      id: string;
      username: string;
      email: string | null;
      password: string;
      image: string | null;
      createdAt: Date;
    } | null;
  })[];
};

interface CollabDetailsPageProps {
  initialCollabData: CompactCollab;
  currentUser: Omit<User, "password"> | null;
}

const CollabDetailsPage: FC<CollabDetailsPageProps> = ({
  initialCollabData,
  currentUser,
}) => {
  const [collab, setCollab] = useState(initialCollabData);
  const [newComment, setNewComment] = useState("");
  const [isUpvoted, setIsUpvoted] = useState(
    initialCollabData.comments.some(
      (comment) => comment.authorId === currentUser?.id
    )
  );
  const [isBookmarked, setIsBookmarked] = useState(
    initialCollabData.bookmarkedBy.some((user) => user.id === currentUser?.id)
  );
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Dummy upvote handler
  const handleUpvote = async () => {
    if (!currentUser) {
      alert("You must be logged in to upvote.");
      return;
    }
    if (isUpvoted) {
      return;
    } else {
      const res = await upVoteCollab(collab.id, currentUser.id);
      if (res) {
        setCollab((prev) => ({
          ...prev,
          upvotes: prev.upvotes + 1,
        }));
        setIsUpvoted(true);
      }
    }
  };

  async function markView() {
    return await addView(collab.id);
  }

  useEffect(() => {
    localStorage.getItem(`viewed_${collab.id}`) !== "true"
      ? (async () => {
          const res = await markView();
          if (res) {
            localStorage.setItem(`viewed_${collab.id}`, "true");
            setCollab((prev) => ({
              ...prev,
              views: prev.views + 1,
            }));
          }
        })()
      : null;
  }, []);

  // Dummy bookmark handler
  const handleBookmark = async () => {
    if (isBookmarked) {
      const res = await removeBookmarkCollab(collab.id, currentUser!.id);
      if (res) {
        setIsBookmarked(false);
      }
    } else {
      const res = await bookmarkCollab(collab.id, currentUser!.id);
      if (res) {
        setIsBookmarked(true);
      } else {
        alert("Failed to bookmark. Please try again.");
      }
    }
  };

  // Dummy comment submission handler
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!currentUser) {
      alert("You must be logged in to post a comment.");
      return;
    }

    const comment = {
      content: newComment,
      authorId: currentUser.id,
    };

    try {
      const res = await addComment(collab.id, comment);
      if (res.status === "success") {
        const addedComment = res.metadata;
        setCollab((prev) => ({
          ...prev,
          comments: [addedComment, ...prev.comments],
        }));
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <section className=" py-24 sm:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content (Left Column) */}
          <main className="lg:col-span-2">
            {collab.imageUrl?.endsWith(".mp4") ? (
              <video
                src={collab.imageUrl}
                autoPlay
                muted
                loop
                className="transition-transform duration-300 ease-in-out h-full aspect-video max-h-96 w-full object-cover mb-10 rounded-2xl"
              />
            ) : (
              <img
                src={collab.imageUrl || "/images/main.jpg"}
                alt={collab.title}
                className="transition-transform max-h-96 duration-300 ease-in-out h-full w-full object-cover mb-10 rounded-2xl"
              />
            )}
            <h1
              className={`${TiroFont.className} text-4xl font-bold text-gray-900 xs:text-5xl`}
            >
              {collab.title}
            </h1>
            {collab.subtitle && (
              <p className="mt-2 text-xl text-gray-600">{collab.subtitle}</p>
            )}
            <div className="prose prose-lg mt-8 max-w-none text-gray-700">
              <p>{collab.description}</p>
            </div>

            {/* Comments Section */}
            <div className="mt-16 bg-white/30 backdrop-blur-2xl  p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                Discussion ({collab.comments.length})
              </h2>
              <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-lg border-gray-800 p-4 shadow-xs focus:border-gray-500 focus:ring-black"
                  rows={4}
                />
                <button
                  type="submit"
                  className="mt-4 rounded-full bg-black px-6 py-2 font-semibold text-white transition hover:bg-black disabled:opacity-50"
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </button>
              </form>
              <div className="mt-8 space-y-6">
                {collab.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4">
                    <img
                      src={
                        comment.author?.image ||
                        "/images/avatar-placeholder.png"
                      }
                      alt={comment.author?.username || "User Avatar"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {comment.author?.username || "Unknown User"}
                      </p>
                      <p className="text-gray-600">{comment.content}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar (Right Column) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-2xl  bg-white/30 backdrop-blur-2xl p-6 shadow-xs">
                <div className="flex items-center space-x-3 border-b pb-4">
                  <img
                    src={
                      collab.author?.image || "/images/avatar-placeholder.png"
                    }
                    alt={collab.author?.username || "User Avatar"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {collab.author?.username || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-500">Creator</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-around text-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye size={18} />
                    <span>{collab.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageCircle size={18} />
                    <span>{collab.comments.length}</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleUpvote}
                    className={`flex w-full items-center justify-center gap-2 rounded-full border-2 py-3 font-bold transition ${
                      isUpvoted
                        ? "border-black bg-black text-white"
                        : "border-black bg-black/10 text-black hover:bg-white/40"
                    }`}
                  >
                    <ArrowUp size={20} />
                    {collab.upvotes.toLocaleString()}
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`flex w-full items-center justify-center gap-2 rounded-full  py-3 font-bold transition-all duration-150 ${
                      isBookmarked
                        ? " bg-gray-800 text-white"
                        : "border-gray-800 border-2 bg-transparent text-gray-800 hover:bg-white"
                    }`}
                  >
                    <Bookmark size={18} />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
                {collab.link && (
                  <Button
                    onClick={() => {
                      setShowSharePopup(true);
                    }}
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black py-3 font-semibold text-white transition hover:bg-black"
                  >
                    <Share2Icon size={18} />
                    Share Collab
                  </Button>
                )}
              </div>
              <div className="rounded-2xl  bg-white/30 backdrop-blur-2xl p-6 shadow-xs">
                <h3 className="text-lg font-semibold">Tags</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collab.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="capitalize rounded-full bg-gray-100/10 backdrop-blur-2xl px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {tag.name.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <SharePopup
        collab={collab}
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
      />
    </section>
  );
};

export default CollabDetailsPage;
