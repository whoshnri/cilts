"use client"
import { FC, useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletterOps";
import { toastSuccess, toastError } from "@/lib/toast";

const NewsletterSignup: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;

    if (!email) return;

    setIsLoading(true);
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        toastSuccess("Subscribed!", result.message);
        form.reset();
      } else {
        toastError("Subscription failed", result.message);
      }
    } catch (error) {
      toastError("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        {/* Main Heading */}
        <h2 className={`font-serif text-4xl font-medium text-gray-800 sm:text-5xl md:text-6xl`}>
          Stay in the mix of things.
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Get notified when new stuff on CILTS happens.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-md items-center justify-between rounded-full bg-white p-2 shadow-sm"
        >
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isLoading}
            placeholder="Enter your e-mail"
            className="w-full grow appearance-none border-none bg-transparent px-4 text-gray-700 placeholder-gray-400 outline-none focus:ring-0 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="shrink-0 rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-black/90 focus:outline-none focus:ring-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;

