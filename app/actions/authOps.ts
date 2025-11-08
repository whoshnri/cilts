// app/actions/auth.ts (or your file path)
"use server";

import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

// --- Bcrypt Hashing Functions (Replaced Argon2) ---
const saltRounds = 10;
const hashPassword = (password: string): string => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Failed to hash password");
  }
};

const comparePasswords = (password: string, hashedPassword: string): boolean => {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    return false;
  }
};


const createSession = async (userId: string) => {
  const token = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return session;
};

const createSessionCookie = async (token: string, expiresAt: Date) => {
  const cookieStore = await cookies();
  try {
    cookieStore.set({
      name: "sessionToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      sameSite: "lax",
      expires: expiresAt,
    });
    return true;
  } catch (error) {
    console.error("Failed to set session cookie:", error);
    return false;
  }
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;

  if (!token) return null;

  const user = await validateSession(token);
  return user || null;
};

export const createUser = async (
  email: string,
  username: string,
  password: string,
) => {
  email = email.toLowerCase().trim();
  username = username.trim();

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      return { message: "An account with that email or username already exists.", status: "error" };
    }

    const hashedPassword = hashPassword(password.trim());

    await prisma.user.create({
      data: {
        id: `usr_${randomBytes(8).toString("hex")}-${username}`,
        email,
        username,
        password: hashedPassword,
      },
    });

    return { message: "User created successfully. Please sign in.", status: "success" };
  } catch (error) {
    console.error("Create user error:", error);
    return { message: "An unexpected error occurred during user creation.", status: "error" };
  }
};

export const loginUser = async (
  email: string | undefined,
  username: string | undefined,
  password: string
) => {
  try {
    if (!email && !username) {
      return { message: "Email or username is required.", status: "error" };
    }

    const identifier = email
      ? { email: email.toLowerCase().trim() }
      : { username: username!.trim() };

    const user = await prisma.user.findFirst({ where: identifier });

    if (!user || !user.password) {
      return { message: "Invalid credentials.", status: "error" };
    }

    const validPassword = comparePasswords(password, user.password);
    if (!validPassword) {
      return { message: "Invalid credentials.", status: "error" };
    }

    const session = await createSession(user.id);
    const cookie = await createSessionCookie(session.token, session.expiresAt);

    const { password: _, ...safeUser } = user;

    if (cookie) {
      return {
        message: "Login successful.",
        status: "success",
        user: safeUser,
      };
    } else {
      return { message: "Login failed: Could not create session.", status: "error" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { message: "An unexpected error occurred during login.", status: "error" };
  }
};

export const validateSession = async (token: string) => {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      // Clean up expired session
      await prisma.session.delete({ where: { token } });
    }
    return null;
  }
  
  // Exclude password from the returned user object
  const { password, ...safeUser } = session.user;
  return safeUser;
};

export const logoutUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;

  if (token) {
    try {
      // Delete session from DB
      await prisma.session.deleteMany({ where: { token } });
      // Delete cookie
      cookieStore.set("sessionToken", "", { expires: new Date(0) });
      return { message: "Logout successful.", status: "success" };
    } catch (error) {
      console.error("Logout error:", error);
      return { message: "Logout failed.", status: "error" };
    }
  }
  return { message: "No active session.", status: "info" };
};