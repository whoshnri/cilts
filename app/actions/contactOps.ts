"use server";

import prisma from "@/prisma/prisma";

export type ContactResult = {
    status: "success" | "error";
    message: string;
};

export async function sendContactMessage(
    name: string,
    email: string,
    subject: string,
    message: string
): Promise<ContactResult> {
    try {
        // Validate inputs
        if (!name || name.trim().length < 2) {
            return {
                status: "error",
                message: "Please enter a valid name.",
            };
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return {
                status: "error",
                message: "Please enter a valid email address.",
            };
        }

        if (!subject || subject.trim().length < 3) {
            return {
                status: "error",
                message: "Subject is too short.",
            };
        }

        if (!message || message.trim().length < 10) {
            return {
                status: "error",
                message: "Message must be at least 10 characters long.",
            };
        }

        // Save to database
        await prisma.contact.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                subject: subject.trim(),
                message: message.trim(),
            },
        });

        return {
            status: "success",
            message: "Your message has been sent successfully! We'll get back to you soon.",
        };
    } catch (error) {
        console.error("Contact form submission error:", error);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}
