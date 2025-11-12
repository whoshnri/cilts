// components/ContactForm.tsx
"use client";

import { useState, useTransition } from "react";
// import { sendContactMessage } from "@/app/actions/contactOps";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (formData.name.trim().length < 2)
      newErrors.name = "Please enter a valid name.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (formData.subject.trim().length < 3)
      newErrors.subject = "Subject is too short.";
    if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage(null);
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    startTransition(async () => {
      // const result = await sendContactMessage(data);
      const result = {
        status: "success",
        message: "Your message has been sent successfully!",
      }; // Mock result
      setServerMessage(
        result.message
          ? {
              status: result.status as "success" | "error",
              message: result.message,
            }
          : null
      );
      if (result.status === "success") {
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form on success
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 border focus:border-black focus:ring-black"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 border focus:border-black focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 border focus:border-black focus:ring-black"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 border focus:border-black focus:ring-black"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>
      <div>
        {serverMessage && (
          <p
            className={`text-sm mb-4 ${
              serverMessage.status === "success"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {serverMessage.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-10 py-3 rounded-full bg-black text-white font-semibold transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
