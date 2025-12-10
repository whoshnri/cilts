"use server";

import prisma from "@/prisma/prisma";

export type NewsletterResult = {
    success: boolean;
    message: string;
};

export async function subscribeToNewsletter(
    email: string
): Promise<NewsletterResult> {
    try {
        // Check if email already exists
        const existing = await prisma.newsletter.findUnique({
            where: { email },
        });

        if (existing) {
            if (existing.isActive) {
                return {
                    success: false,
                    message: "This email is already subscribed to our newsletter.",
                };
            } else {
                // Reactivate subscription
                await prisma.newsletter.update({
                    where: { email },
                    data: { isActive: true },
                });
                return {
                    success: true,
                    message: "Welcome back! Your subscription has been reactivated.",
                };
            }
        }

        // Create new subscription
        await prisma.newsletter.create({
            data: { email },
        });

        return {
            success: true,
            message: "Thank you for subscribing to our newsletter!",
        };
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function unsubscribeFromNewsletter(
    email: string
): Promise<NewsletterResult> {
    try {
        const existing = await prisma.newsletter.findUnique({
            where: { email },
        });

        if (!existing) {
            return {
                success: false,
                message: "This email is not subscribed to our newsletter.",
            };
        }

        await prisma.newsletter.update({
            where: { email },
            data: { isActive: false },
        });

        return {
            success: true,
            message: "You have been unsubscribed from our newsletter.",
        };
    } catch (error) {
        console.error("Newsletter unsubscribe error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    }
}
