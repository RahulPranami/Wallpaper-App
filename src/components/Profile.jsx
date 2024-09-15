"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <Loader className="text-blue-500 animate-spin" />;
  }

  return (
    <div className="flex items-center space-x-2">
      {isSignedIn ? (
        <>
          <span className="text-sm font-medium text-gray-300">
            Welcome, {user.fullName}
          </span>
          <UserButton />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
