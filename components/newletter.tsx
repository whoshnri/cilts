"use client"
import { FC } from "react";

const NewsletterSignup: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with email:", event.currentTarget.email.value);
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
            placeholder="Enter your e-mail"
            className="w-full grow appearance-none border-none bg-transparent px-4 text-gray-700 placeholder-gray-400 outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-yellow-600 px-6 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
