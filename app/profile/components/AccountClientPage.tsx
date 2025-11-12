// components/AccountClientPage.tsx
"use client";

import { FC, useEffect, useState, useTransition } from "react";
import {
  Pen,
  Trash2,
  Heart,
  MessageCircle,
  Eye,
  BookMarked,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import {
  updateUserProfile,
  deleteCollab,
  updateCollab,
} from "@/app/actions/profileOps";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import { logoutUser } from "@/app/actions/authOps";
import { CompactCollab } from "@/components/collabsdetailpage";
import { UserCollabs } from "../page";
import { Tag } from "@prisma/client";
import { toastError, toastSuccess } from "@/lib/toast";

export const Tiro_Devanagari_MarathiFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

interface UserData {
  id: string;
  username: string | null;
  email: string | null;
  image: string | null;
}

interface AccountClientPageProps {
  initialUser: UserData;
  initialCollabs: UserCollabs[];
}

const AccountClientPage: FC<AccountClientPageProps> = ({
  initialUser,
  initialCollabs,
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "collabs">("profile");
  const [isPending, startTransition] = useTransition();
  const [editingCollabId, setEditingCollabId] = useState<UserCollabs | null>(
    null
  );
  const [showEditCollabModal, setShowEditCollabModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [username, setUsername] = useState(initialUser.username || "");
  const [image, setImage] = useState(initialUser.image || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCollabId, setDeletingCollabId] = useState<string | null>(null);

  // --- State for form errors and server messages ---
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    image?: string;
  }>({});
  const [serverMessage, setServerMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleValidation = () => {
    const errors: { username?: string; image?: string } = {};
    if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters.";
    }
    // A simple regex to check for a basic URL format
    if (image.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(image)) {
      errors.image = "Must be a valid URL starting with http:// or https://";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage(null);

    const isValid = handleValidation();
    if (!isValid) {
      return; // Stop if there are client-side validation errors
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", image);

    startTransition(async () => {
      const result = await updateUserProfile(formData);
      if (result.status === "error") {
        setServerMessage({ type: "error", text: result.message });
      } else {
        setServerMessage({ type: "success", text: result.message });
      }
    });
  };

  const handleDelete = async (collabId: string) => {
    setShowDeleteModal(true);
    setDeletingCollabId(collabId);
  };

  useEffect(() => {
    setHasChanges(
      username !== (initialUser.username || "") ||
        image !== (initialUser.image || "")
    );
  }, [username, image]);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.status !== "success") {
      toastError("Logout Failed", "Unable to log out. Please try again.");
    } else {
      toastSuccess("Logged Out", "You have been logged out successfully.");
      window.location.href = "/";
    }
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h1
            className={`text-4xl .stack-sans-notch  text-gray-900 sm:text-5xl`}
          >
            {initialUser.username?.toLocaleUpperCase()}&apos;s
            <span className={`${Tiro_Devanagari_MarathiFont.className}`}>
              {" "}
              Profile
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage your profile and contributions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <nav className="flex md:flex-col gap-2 p-2 rounded-xl bg-white">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left font-semibold p-3 rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-gray-100 shadow-sm text-black"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("collabs")}
                className={`w-full text-left font-semibold p-3 rounded-lg transition-colors ${
                  activeTab === "collabs"
                    ? "bg-gray-100 shadow-sm text-black"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                My Collaborations
              </button>
              <button
                onClick={handleLogout}
                className={`w-full hidden sm:block text-left bg-red-500 text-white hover:bg-red-600 cursor-pointer font-semibold p-2 rounded-lg transition-colors `}
              >
                Log Out
              </button>
            </nav>
          </aside>

          <main className="md:w-3/4">
            {activeTab === "profile" && (
              <div className="p-8 rounded-2xl bg-white border shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 p-1"
                    />
                    {formErrors.username && (
                      <p className="text-red-500 text-xs mt-1 py-1">
                        {formErrors.username}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Profile Image URL
                    </label>
                    <input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://..."
                      className="mt-1 block w-full rounded-md border-gray-300 p-1"
                    />
                    {formErrors.image && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.image}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Email Address
                    </label>
                    <p className="mt-1 text-gray-500">
                      {initialUser.email} (cannot be changed)
                    </p>
                  </div>
                  {serverMessage && (
                    <p
                      className={`${
                        serverMessage.type === "error"
                          ? "text-red-500"
                          : "text-green-600"
                      } text-sm`}
                    >
                      {serverMessage.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isPending || !hasChanges}
                    className="px-6 py-2 rounded-full bg-black text-white font-semibold disabled:opacity-50"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "collabs" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-2">My Collaborations</h2>
                {initialCollabs.length > 0 ? (
                  initialCollabs.map((collab) => (
                    <div
                      key={collab.id}
                      className="p-4 rounded-xl border bg-white flex items-center justify-between gap-4"
                    >
                      <div className="grow min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {collab.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Heart size={14} /> {collab.upvotes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle size={14} /> {collab._count.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} /> {collab.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bookmark size={14} /> {collab._count.bookmarkedBy}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setShowEditCollabModal(true);
                            setEditingCollabId(collab);
                          }}
                          className="p-2 text-gray-500 bg-gray-100 hover:bg-gray-300 rounded-full"
                          aria-label="Edit"
                        >
                          <Pen size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(collab.title)}
                          disabled={isPending}
                          className="p-2 text-red-500 bg-red-50 hover:bg-red-300 rounded-full disabled:opacity-50"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl">
                    You haven't posted any collaborations yet.
                  </p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {editingCollabId && (
        <EditCollabModal
          collab={editingCollabId}
          isOpen={showEditCollabModal}
          setIsOpen={setShowEditCollabModal}
        />
      )}
      {deletingCollabId && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          name={deletingCollabId}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </section>
  );
};

export default AccountClientPage;

const EditCollabModal: FC<{
  collab: UserCollabs;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ collab, isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: collab.title,
    description: collab.description ? collab.description : "",
    subtitle: collab.subtitle ? collab.subtitle : "",
    tags: collab.tags.map((tag) => tag.name),
    imageUrl: collab.imageUrl ? collab.imageUrl : "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateCollab(collab.id, formData);
    if (res.status === "success") {
      setIsOpen(false);
      toastSuccess("Collaboration Updated", "Your collaboration has been updated successfully.");
      window.location.reload();
    } else {
      setIsSaving(false);
      toastError("Update Failed", res.message);
      return;
    }
    setIsSaving(false);
  };

  const validTags: Tag[] = [
    "DESIGN",
    "DEVELOPMENT",
    "AI",
    "EDUCATION",
    "PRODUCT",
    "ART",
    "RESEARCH",
    "MUSIC",
    "WRITING",
    "BUSINESS",
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-100">
      <div className="max-w-2xl flex justify-center gap-1">
        <div className="bg-white rounded-lg p-6 max-w-sm md:min-w-sm w-[80vw] space-y-5">
          <div className="">
            <h2 className="text-lg font-semibold">Edit Collaboration</h2>
            <p className="text-sm">"{collab.title}"</p>
          </div>
          {/* Form fields for editing would go here */}
          <div
            className="overflow-y-auto max-h-[50vh]"
            style={{
              scrollbarWidth: "none",
            }}
          >
            <div className="gap-2">
              <label className="" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="gap-2">
              <label className="" htmlFor="title">
                Subtitle
              </label>
              <input
                type="text"
                name="title"
                value={formData.subtitle || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subtitle: e.target.value || "",
                  }))
                }
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="gap-2">
              <label className="" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value || "",
                  }))
                }
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* image URL */}
            <div className="gap-2 mb-2">
              <label className="" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    imageUrl: e.target.value || "",
                  }))
                }
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            {/* tags */}
            <div className="gap-2">
              <label className="" htmlFor="tags">
                Tags
              </label>
              <div>
                {validTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`m-1 px-3 py-1 rounded-full border ${
                      formData.tags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => {
                      if (formData.tags.includes(tag as Tag)) {
                        setFormData((prev) => ({
                          ...prev,
                          tags: prev.tags.filter((t) => t !== tag),
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          tags: [...prev.tags, tag],
                        }));
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center w-full gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-black hover:bg-black/80 cursor-pointer text-white rounded-lg"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
        <div className="hidden md:w-full md:block border p-2 rounded-lg max-w-sm min-w-sm">
          {formData.imageUrl?.endsWith(".mp4") ? (
              <video
                src={formData.imageUrl}
                autoPlay
                muted
                loop
                className="transition-transform duration-300 ease-in-out h-full aspect-video w-full object-cover mb-10 rounded-2xl"
              />
            ) : (
              <img
                src={formData.imageUrl || "/images/main.jpg"}
                alt={formData.title}
                className="transition-transform max-h-96 duration-300 ease-in-out h-full w-full object-cover mb-10 rounded-2xl"
              />
            )}
        </div>
      </div>
    </div>
  );
};

const ConfirmDeleteModal: FC<{
  isOpen: boolean;
  name: string;
  onCancel: () => void;
}> = ({ isOpen, name, onCancel }) => {
  if (!isOpen) return null;

  async function onConfirm() {
    const res = await deleteCollab(name);
    if (res.status === "success") {
      toastSuccess("Collaboration Deleted", "Your collaboration has been deleted successfully.");
      window.location.reload();
    } else {
      toastError("Delete Failed", res.message);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-100">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Delete "{name}"?</h2>
        <p className="mb-4 text-sm opacity-85">
          Are you sure you want to delete the collaboration This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
