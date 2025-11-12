// app/contact/page.tsx
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./components/ContactForm"; // Adjust path if needed
import { Tiro_Devanagari_Marathi } from "next/font/google";

const TiroFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

const ContactPage = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl ${TiroFont.className} font-bold text-gray-900 sm:text-5xl`}>
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Have a question, a proposal, or just want to say hello? We’d love to
            hear from you.
          </p>
        </div>

        <div className="grid mx-auto max-w-xl">
          <div className="p-8 rounded-2xl bg-white border shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
