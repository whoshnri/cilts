// components/NewCollabForm.tsx
"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Tag, UserTypes } from "@prisma/client";
import { createCollab } from "@/app/actions/collabsOps";
import { toastSuccess, toastError } from "@/lib/toast";
import Link from "next/link";

const tagValues = Object.values(Tag);
const userTypeValues = Object.values(UserTypes);

interface FormErrors {
  title?: string;
  description?: string;
  connectLink?: string;
  tags?: string;
}

const NewCollabForm: FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // State for all form inputs
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Individual);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState(""); // "Describe the Idea"
  const [description, setDescription] = useState(""); // "Why It Should Exist"
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [connectLink, setConnectLink] = useState(""); // Your "Contact Info" link
  const [tags, setTags] = useState<Tag[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleTagChange = (tag: Tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (title.trim().length < 5)
      newErrors.title = "Please enter a clear title.";
    if (description.trim().length < 20)
      newErrors.description = "Please expand on why this idea is important.";
    if (tags.length < 1) newErrors.tags = "Please select at least one tag.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("userType", userType);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);
    formData.append("link", link);
    formData.append("connectLink", connectLink);
    tags.forEach((tag) => formData.append("tags", tag));

    startTransition(async () => {
      const result = await createCollab(formData);
      if (result.status === "error") {
        toastError("Submission Failed", result.message);
      } else {
        toastSuccess("Success!", "Your collab has been submitted.");
        router.push(`/collabs/${result.data.slug}`);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 p-8 sm:p-12 rounded-2xl bg-white border shadow-sm"
    >
      <div className="space-y-8">
        <div>
          <label className="block text-base font-semibold text-gray-800">
            1. Who are you?*
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserTypes)}
            className="mt-2 p-2 border block w-full rounded-md border-gray-300 focus:border-black focus:ring-black"
          >
            {userTypeValues.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            2. Collab Title*
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A short, catchy name for your idea"
            className="mt-2 p-2 border block w-full rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            3. Describe the Idea (in simple terms)
          </label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Your one-line elevator pitch"
            className="mt-2 p-2 border block w-full rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            4. Why It Should Exist*
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the core idea, the goals, and why it's compelling."
            rows={5}
            className="mt-2 p-2 border block w-full rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            5. Add Image or Video URL (Optional)
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="mt-2 p-2 border block w-full rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            6. Tags*
          </label>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tagValues.map((tag) => (
              <div key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="hidden peer border"
                />
                <label
                  htmlFor={tag}
                  className="block cursor-pointer select-none rounded-full border px-4 py-2 text-center text-sm font-medium transition-colors peer-checked:bg-black peer-checked:text-white hover:bg-gray-400"
                >
                  #{tag.charAt(0) + tag.slice(1).toLowerCase()}
                </label>
              </div>
            ))}
          </div>
          {errors.tags && (
            <p className="text-red-500 text-xs mt-2">{errors.tags}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            7. Link (Optional)
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Your portfolio, website, or brand page.
          </p>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className="mt-2 p-2 block w-full border rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800">
            8. Connect Link (Optional)
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Provide your primary social link (e.g., LinkedIn, Twitter/X) for
            potential collaborators to reach out. This field is set to your email if not provided.
          </p>
          <input
            value={connectLink}
            onChange={(e) => setConnectLink(e.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="mt-2 p-2 border block w-full rounded-md border-gray-300 focus:border-black focus:ring-black"
          />
          {errors.connectLink && (
            <p className="text-red-500 text-xs mt-1">{errors.connectLink}</p>
          )}
        </div>
      </div>

      <div className="pt-6 border-t">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-10 py-3 rounded-full bg-black text-white font-semibold text-lg transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Bring It to Life"}
        </button>
      </div>
      <p className="text-sm text-gray-500">
        By submitting, you agree that all ideas shared on <Link className="text-black underline" href="/">CILTS</Link> are conceptual.
        Intellectual property remains with their original creators. We promote
        originality, respect, and co-creation across every submission.
      </p>
    </form>
  );
};

export default NewCollabForm;
