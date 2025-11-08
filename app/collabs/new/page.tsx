    // app/collab/new/page.tsx
import NewCollabForm from "@/app/collabs/components/NewCollab";
import { getCurrentUser } from "@/app/actions/authOps";
import { redirect } from "next/navigation";
import { Tiro_Devanagari_Marathi } from "next/font/google";

export const Tiro_Devanagari_MarathiFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});


export default async function NewCollabPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }
  
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className={`text-4xl ${Tiro_Devanagari_MarathiFont.className} font-bold text-gray-900 sm:text-5xl`}>Create a New Pitch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            This is your canvas. Pitch your dream collaboration and see what happens.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-white border shadow-sm">
          <NewCollabForm />
        </div>
      </div>
    </section>
  );
}