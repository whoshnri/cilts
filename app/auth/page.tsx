// components/AuthForm.tsx
"use client";

import { FC, useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import crown from "@/public/crown.svg"
import Image from "next/image";
import { createUser, loginUser } from "../actions/authOps";

const AuthForm: FC = () => {
  const [formMode, setFormMode] = useState<"login" | "signup">("login");
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setEmail("");
    setUserName("");
    setPassword("");
    setShowPassword(false);
  }, [formMode]);

  const toggleMode = () => {
    setFormMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formMode === "login") {
      // check format with regex to see if login is email or username
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
      const res = await loginUser(isEmail ? login : undefined, !isEmail ? login : undefined, password);
      // get the session token from res if successful
      if (res.status === "success") {
        alert("Login successful!");
      } else {
        alert(res.message);
      }
    } else {
      const res = await createUser(email, userName, password);
      if (res.status === "success") {
        setFormMode("login");
      }
      alert(res.message);
    }
  };

  const isLoginMode = formMode === "login";

  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4 md:mt-20">
      <div className="flex w-full max-w-4xl flex-col items-center gap-12">
        
        {/* Form Card */}
        <div className=" relative w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10 transition-all duration-200">
        <Image 
            src={crown}
            alt="CILTS Crown Logo"
            className="w-40 h-40 mb-4 mx-auto absolute -top-20 left-0 transform -translate-x-1/2"
          />
          {/* Header */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {isLoginMode ? "Sign in" : "Sign up"}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-black cursor-pointer hover:underline focus:outline-none"
              >
                {isLoginMode ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                { !isLoginMode ? "Email address" : "Username or Email address" }
              </label>
              <input
                id={!isLoginMode ? "email" : "usernameOrEmail"}
                name={!isLoginMode ? "email" : "usernameOrEmail"}
                type={!isLoginMode ? "email" : "text"}
                autoComplete={!isLoginMode ? "email" : "usernameOrEmail"}
                required
                value={!isLoginMode ? email : login}
                onChange={(e) => !isLoginMode ? setEmail(e.target.value) : setLogin(e.target.value)}
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            {/* User Name (Sign up only) */}
            {!isLoginMode && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isLoginMode ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 flex items-center pr-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                {isLoginMode ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>

          {/* Footer Text (Sign up only) */}
          {!isLoginMode && (
            <p className="mt-8 text-center text-xs text-gray-600">
              By signing up, you accept our{" "}
              <a href="/terms" className="font-medium text-black hover:underline">
                terms of service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="font-medium text-black hover:underline">
                privacy policy
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthForm;