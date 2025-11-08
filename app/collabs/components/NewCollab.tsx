// components/NewCollabForm.tsx
"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "@prisma/client";
import { createCollab } from "@/app/actions/collabsOps";

// A list of the available tags from your schema enum
const tagValues = Object.values(Tag);

// A simple interface for managing form error state
interface FormErrors {
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  tags?: string;
}

const NewCollabForm: FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // State for each form input
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  // State for client-side and server-side errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // --- Handlers ---
  const handleTagChange = (tag: Tag) => {
    // This allows toggling tags on and off
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    if (description.trim().length < 20)
      newErrors.description = "Description must be at least 20 characters.";
    if (imageUrl.trim() && !/^https?:\/\//.test(imageUrl))
      newErrors.imageUrl = "Please enter a valid URL.";
    if (link.trim() && !/^https?:\/\//.test(link))
      newErrors.link = "Please enter a valid URL.";
    if (tags.length < 1) newErrors.tags = "You must select at least one tag.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null); // Clear previous server errors on a new submission
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);
    formData.append("link", link);
    tags.forEach((tag) => formData.append("tags", tag));

    startTransition(async () => {
      const result = await createCollab(formData);
      if (result.status === "error") {
        setServerError(result.message);
      } else {
        router.push(`/collabs/${result.data.id}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* --- Section 1: The Pitch --- */}
      <div className="p-6 border rounded-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">The Pitch</h2>
          <p className="text-sm text-gray-500 mt-1">
            This is the core of your idea. Make it clear and compelling.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium">Title*</label>
          <p className="text-xs text-gray-500 mt-1">
            Give your project a short, catchy name.
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., AI-Powered Music Video Generator"
            className="mt-2 p-2 block w-full border rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.title && title.trim().length < 5 && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Subtitle</label>
          <p className="text-xs text-gray-500 mt-1">
            A one-line elevator pitch for your idea.
          </p>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-2 p-2 block w-full border rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description*</label>
          <p className="text-xs text-gray-500 mt-1">
            Explain the core idea, the goals, and who you're looking to
            collaborate with.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="mt-2 p-2 block w-full border rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.description && description.trim().length < 20 && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
      </div>

      {/* --- Section 2: Tags --- */}
      <div className="p-6 border rounded-xl">
        <h2 className="text-xl font-bold text-gray-800">Tags*</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select all tags that best describe your project.
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {tagValues.map((tag) => (
            <div key={tag}>
              <input
                type="checkbox"
                id={tag}
                value={tag}
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="hidden peer"
              />
              <label
                htmlFor={tag}
                className="block cursor-pointer select-none rounded-full border px-4 py-2 text-center text-sm font-medium transition-colors peer-checked:bg-black peer-checked:text-gray-300 hover:bg-gray-100"
              >
                {tag.charAt(0) + tag.slice(1).toLowerCase()}
              </label>
            </div>
          ))}
        </div>
        {errors.tags && tags.length === 0 && (
          <p className="text-red-500 text-xs mt-2">{errors.tags}</p>
        )}
      </div>

      {/* --- Section 3: Additional Details --- */}
      <div className="p-6 border rounded-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Additional Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add links to provide more context for your idea.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Banner URL</label>
            <p className="text-xs text-gray-500 mt-1">
            Optionally, add an image URL to visually represent your project.
          </p>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Project Link</label>
          <p className="text-xs text-gray-500 mt-1">
            Add a link to the project repository, project social media or website, if available.
          </p>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://github.com/..."
            className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.link && (
            <p className="text-red-500 text-xs mt-1">{errors.link}</p>
          )}
        </div>
      </div>

      {/* --- Submission Area --- */}
      <div className="flex flex-col items-start gap-4">
        {serverError && (
          <p className="font-semibold text-red-500">{serverError}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-10 py-3 rounded-full bg-black text-white font-semibold transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting Pitch..." : "Submit Pitch"}
        </button>
      </div>
    </form>
  );
};

export default NewCollabForm;
