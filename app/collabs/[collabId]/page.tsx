import { getCurrentUser } from "@/app/actions/authOps";
import { fetchCollabById } from "@/app/actions/collabsOps";
import CollabDetailsPage from "@/components/collabsdetailpage";

export default async function Page(props: { params: Promise<{ collabId: string }> }) {
  const { collabId } = await props.params; 

  console.log("Fetching data for collabId:", collabId);

  const collabData = await fetchCollabById(collabId);
  const currentUser = await getCurrentUser();

  if (!collabData || collabData.status === "error" || !collabData.data) {
    return (
      <div className="container mx-auto py-24 sm:py-32 px-4">
        <h1 className="text-3xl font-bold text-gray-900">Collaboration Not Found</h1>
        <p className="mt-4 text-gray-600">
          The collaboration you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <CollabDetailsPage
      initialCollabData={collabData.data}
      currentUser={currentUser ?? null}
    />
  );
}
