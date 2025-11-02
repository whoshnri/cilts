// components/CollabDetailsPage.tsx
"use client";

import { FC, useState } from "react";
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
import { type Collab, type Comment } from "@/types/index";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import { Button } from "./ui/button";
import SharePopup from "./share-popup";

const TiroFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

// Dummy current user for posting comments
const currentUser = {
  id: "user_current",
  username: "You",
  image: "/images/avatar-placeholder.png",
};

interface CollabDetailsPageProps {
  initialCollabData: Collab;
}

const CollabDetailsPage: FC<CollabDetailsPageProps> = ({
  initialCollabData,
}) => {
  const [collab, setCollab] = useState(initialCollabData);
  const [newComment, setNewComment] = useState("");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Dummy upvote handler
  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    setCollab((prev) => ({
      ...prev,
      upvotes: isUpvoted ? prev.upvotes - 1 : prev.upvotes + 1,
    }));
    console.log("Upvote toggled!");
  };

  // Dummy bookmark handler
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log("Bookmark toggled!");
  };

  // Dummy comment submission handler
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      content: newComment,
      author: currentUser,
      createdAt: new Date(),
    };

    setCollab((prev) => ({ ...prev, comments: [comment, ...prev.comments] }));
    setNewComment("");
  };

  return (
    <section className=" py-24 sm:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content (Left Column) */}
          <main className="lg:col-span-2">
            {collab.imageUrl && (
              <div className="relative mb-8 h-80 w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={collab.imageUrl}
                  alt={collab.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            )}
            <h1 className={`${TiroFont.className} text-4xl font-bold text-gray-900 xs:text-5xl`}>
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
                  className="w-full rounded-lg border-gray-800 p-4 shadow-xs focus:border-gray-500 focus:ring-yellow-500"
                  rows={4}
                />
                <button
                  type="submit"
                  className="mt-4 rounded-full bg-yellow-600 px-6 py-2 font-semibold text-white transition hover:bg-yellow-700 disabled:opacity-50"
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </button>
              </form>
              <div className="mt-8 space-y-6">
                {collab.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4">
                    <Image
                      src={
                        comment.author.image || "/images/avatar-placeholder.png"
                      }
                      alt={comment.author.username}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {comment.author.username}
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
                  <Image
                    src={
                      collab.author.image || "/images/avatar-placeholder.png"
                    }
                    alt={collab.author.username}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {collab.author.username}
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
                        ? "border-yellow-600 bg-yellow-600 text-white"
                        : "border-yellow-600 bg-yellow-100/50 text-yellow-700 hover:bg-yellow-100"
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
                    className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-600 py-3 font-semibold text-white transition hover:bg-yellow-800"
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



