"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import Image from "next/image";

export function UserArea() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mt-auto flex items-center justify-between border-t p-4">
      <div className="flex items-center gap-3">
        {user.imageUrl && (
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={user.imageUrl}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user.fullName || "名前未設定"}
          </span>
          <span className="text-sm text-slate-500">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </div>
      <SignOutButton>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-500 hover:text-slate-900"
        >
          <IconLogout size={20} />
        </Button>
      </SignOutButton>
    </div>
  );
}
