import { redirect } from "next/navigation";
import AccountClientPage from "./components/AccountClientPage";
import { getCurrentUser } from "@/app/actions/authOps";
import prisma from "@/prisma/prisma";
import { $Enums} from "@prisma/client";

export type UserCollabs = {
    tags: {
        id: string;
        name: $Enums.Tag;
        collabId: string;
    }[];
    _count: {
        comments: number;
        bookmarkedBy: number;
    };
} & {
    id: string;
    createdAt: Date;
    authorId: string | null;
    slug: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    imageUrl: string | null;
    link: string | null;
    upvotes: number;
    views: number;
    updatedAt: Date;
    isFeatured: boolean | null;
}


const AccountPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }
  
  const userCollabs = await prisma.collab.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
        _count : {
          select : {comments: true, bookmarkedBy: true}
        },
        tags : true
    },
  });

  // Note: Prisma returns _count, which we should map to a friendlier name
  const collabsWithCounts = userCollabs.map((c) => ({
    ...c,
    upvotes: c.upvotes,
    comments: c._count.comments,
  }));

  return (
    <AccountClientPage initialUser={user} initialCollabs={collabsWithCounts} />
  );
};

export default AccountPage;
