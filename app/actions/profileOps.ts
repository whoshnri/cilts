"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";
import { getCurrentUser } from "./authOps"; 
import { CollabTag, Tag } from "@prisma/client";


export const updateUserProfile = async (formData: FormData) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { status: "error", message: "You must be logged in to update your profile." };
  }

  const rawUsername = formData.get("username");
  const rawImage = formData.get("image");


  if (typeof rawUsername !== 'string' || typeof rawImage !== 'string') {
    return { status: "error", message: "Invalid form data provided." };
  }
  
  const username = rawUsername.trim();
  const image = rawImage.trim();


  if (username.length < 3) {
    return { status: "error", message: "Username must be at least 3 characters." };
  }
  


  if (image && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(image)) {
    return { status: "error", message: "Please enter a valid URL for the image." };
  }


  if (username !== currentUser.username) {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return { status: "error", message: "That username is already taken." };
    }
  }

  try {
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        username,
        image: image || null,
      },
    });

    revalidatePath("/account");
    return { status: "success", message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { status: "error", message: "Failed to update profile." };
  }
};


// --- DELETE COLLAB ACTION (No changes needed) ---
export const deleteCollab = async (collabId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { status: "error", message: "Authentication required." };
  }

  try {
    const collabToDelete = await prisma.collab.findUnique({
      where: { id: collabId },
    });

    if (!collabToDelete) {
      return { status: "error", message: "Collaboration not found." };
    }

    // CRITICAL SECURITY CHECK: Ensure the user owns this collab
    if (collabToDelete.authorId !== currentUser.id) {
      return { status: "error", message: "You are not authorized to delete this collaboration." };
    }

    await prisma.collab.delete({
      where: { id: collabId },
    });
    
    revalidatePath("/account");
    return { status: "success", message: "Collaboration deleted." };
  } catch (error) {
    console.error("Delete collab error:", error);
    return { status: "error", message: "Failed to delete collaboration." };
  }
};


export async function updateCollab(collabId: string, data: {
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
}) {
  const collab = await prisma.collab.findUnique({ where: { id: collabId } });

  const user = await getCurrentUser()

  if (!collab) {
    return { status: "error", message: "Collaboration not found." };
  }
  if (collab.authorId !== user?.id) {
    return { status: "error", message: "You are not authorized to update this collaboration." };
  }

  const validTags = ["DESIGN" , "DEVELOPMENT" , "AI" , "EDUCATION" , "PRODUCT" , "ART" , "RESEARCH" , "MUSIC" , "WRITING" , "BUSINESS"];

  const tags: CollabTag[] = data.tags ? data.tags.map(tagName => (validTags.includes(tagName) ? { name: tagName as Tag , collabId: collab.id, id : `tags-${tagName}-${collab.id}-${Date.now()}` } : null)).filter(tag => tag !== null) : [];

  try {
    await prisma.collab.update({ 
      where: { id: collab.id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageUrl: data.imageUrl,
        tags: {
          deleteMany: {},
          createMany: {
            data: tags.map((tag) => ({ name: tag.name})),
          },
        },
      },
    });
    return { status: "success", message: "Collaboration updated successfully." };
  }catch (error) {
    console.error("Update collab error:", error);
    return { status: "error", message: "Failed to update collaboration." };
  }

}

