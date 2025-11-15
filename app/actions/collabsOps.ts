// app/actions/collabOps.ts
"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma"; // Adjust path if needed
import { getCurrentUser } from "./authOps"; // Adjust path if needed
import { randomBytes } from "crypto";
import { $Enums, Comment, Prisma, Tag,  } from "@prisma/client";


// Helper to generate a unique slug
const generateSlug = async (title: string): Promise<string> => {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  while (true) {
    const existing = await prisma.collab.findUnique({ where: { slug } });
    if (!existing) break;
    slug = `${slug}-${randomBytes(2).toString("hex")}`;
  }
  return slug;
};

// --- CREATE COLLAB ACTION (No Zod) ---
export const createCollab = async (formData: FormData) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { status: "error" as const, message: "Authentication required." };
  }

  // --- Manual Validation ---
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const link = formData.get("link") as string;
  const tags = formData.getAll("tags") as Tag[];
  const connectLink = formData.get("connectLink") as string;
  const type = formData.get("userType") as $Enums.UserTypes;

  if (!title || typeof title !== "string" || title.trim().length < 5) {
    return {
      status: "error" as const,
      message: "Title must be at least 5 characters long.",
    };
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 20
  ) {
    return {
      status: "error" as const,
      message: "Description must be at least 20 characters long.",
    };
  }
  if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
    return {
      status: "error" as const,
      message: "Image URL must be a valid link.",
    };
  }
  if (link && !/^https?:\/\//.test(link)) {
    return {
      status: "error" as const,
      message: "Project link must be a valid link.",
    };
  }
  if (!tags || tags.length < 1) {
    return {
      status: "error" as const,
      message: "Please select at least one tag.",
    };
  }
  // --- End of Manual Validation ---

  try {
    const slug = await generateSlug(title);

    const newCollab = await prisma.collab.create({
      data: {
        title: title.trim(),
        slug,
        type,
        connectLink: connectLink ? connectLink.trim() : currentUser.email!,
        subtitle: subtitle?.trim() || null,
        description: description.trim(),
        imageUrl: imageUrl?.trim() || null,
        link: link?.trim() || null,
        authorId: currentUser.id,
        tags: {
          createMany: {
            data: tags.map((tagName) => ({ name: tagName })),
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/account");

    return {
      status: "success" as const,
      message: "Collaboration created!",
      data: { slug: newCollab.slug },
    };
  } catch (error) {
    console.error("Create collab error:", error);
    return {
      status: "error" as const,
      message: "Failed to create collaboration.",
    };
  }
};

export async function deleteCollab(slug: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { status: "error" as const, message: "Authentication required." };
  }

  try {
    const collab = await prisma.collab.findUnique({ where: { slug } });
    if (!collab) {
      return { status: "error" as const, message: "Collaboration not found." };
    }

    if (collab.authorId !== currentUser.id) {
      return {
        status: "error" as const,
        message: "You are not authorized to delete this collaboration.",
      };
    }

    await prisma.collab.delete({ where: { id: collab.id } });
    revalidatePath("/");
    revalidatePath("/account");

    return {
      status: "success" as const,
      message: "Collaboration deleted successfully.",
    };
  } catch (error) {
    console.error("Delete collab error:", error);
    return {
      status: "error" as const,
      message: "Failed to delete collaboration.",
    };
  }
}

// add a comment
export async function addComment(
  collabId: string,
  comment: {
    content: string;
    authorId: string;
  }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { status: "error" as const, message: "Authentication required." };
  }

  try {
    const data = await prisma.comment.create({
      data: {
        content: comment.content,
        collabId,
        authorId: comment.authorId,
      },
      include: {
        author: true,
      },
    });
    return {
      status: "success" as const,
      message: "Comment added successfully.",
      metadata: data,
    };
  } catch (error) {
    console.error("Add comment error:", error);
    return { status: "error" as const, message: "Failed to add comment." };
  }
}

const collabForCard = Prisma.validator<Prisma.CollabDefaultArgs>()({
  select: {
    id: true,
    slug: true,
    title: true,
    imageUrl: true,
    type: true,
    authorId: true,
    upvotes: true,
    views: true,
    author: { select: { username: true, image: true } },
    tags: { select: { name: true } }, // Correctly select just the name from the relation
  }
});


export type CollabForCard = Prisma.CollabGetPayload<typeof collabForCard>;

export async function fetchCollabs() {
  try {
    const collabs: CollabForCard[] = await prisma.collab.findMany({
      include: {
        tags: {select: { name: true } },
        author: { select: { username: true, image: true } },
      },
    });
    return {
      status: "success" as const,
      data: collabs,
    };
  } catch (error) {
    console.error("Fetch collabs error:", error);
    return {
      status: "error" as const,
      message: "Failed to fetch collaborations.",
    };
  }
}


export async function fetchFeaturedCollabs() {
  try {
    const collabs = await prisma.collab.findMany({
      where: { AND : {
        isFeatured: true,
      }},
      include: {
        tags: { select: { name: true } },
        author: { select: { username: true, image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return {
      status: "success" as const,
      data: collabs,
    };
  } catch (error) {
    console.error("Fetch featured collabs error:", error);
    return {
      status: "error" as const,
      message: "Failed to fetch featured collaborations.",
    };
  } 
}

export async function fetchCollabById(slug: string) {
  try {
    const collabData = await prisma.collab.findUnique({
      where: { slug },
      include: {
        author: true,
        tags: true,
        bookmarkedBy: true,
        upVotedBy: true,
        comments: {
          include: {
            author: true,
            
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return { status: "success" as const, data: collabData };
  } catch (error) {
    console.error("Fetch collab by ID error:", error);
    return {
      status: "error" as const,
      message: "Failed to fetch collaboration.",
    };
  }
}



export async function upVoteCollab(collabId: string, userId: string) {
  try{
    const collab = await prisma.collab.update({
      where: { id: collabId },
      data: {
        upvotes: {
          increment: 1,
        },
        upVotedBy: {
          connect: { id: userId },
        },
      },
    });
    return true
  } catch (error) {
    console.error("Upvote collab error:", error);
    return false
  }
}


export async function addView(collabId: string) {
  try{
    const collab = await prisma.collab.update({
      where: { id: collabId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    console.log("Collab views incremented:", collab.id);
    return true
  } catch (error) {
    console.error("Add view error:", error);
    return false
  }
}


export async function bookmarkCollab(collabId: string, userId: string) {
  try{
    const collab = await prisma.collab.update({
      where: { id: collabId },
      data: {
        bookmarkedBy: {
          connect: { id: userId },
        },
      },
    });
    return true
  } catch (error) {
    console.error("Bookmark collab error:", error);
    return false
  }
}


export async function removeBookmarkCollab(collabId: string, userId: string) {
  try{
    const collab = await prisma.collab.update({
      where: { id: collabId },
      data: {
        bookmarkedBy: {
          disconnect: { id: userId },
        },
      },
    });
    return true
  } catch (error) {
    console.error("Remove bookmark collab error:", error);
    return false
  }
}

