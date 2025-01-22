"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import Image from "next/image";

export function UserArea() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  return (
    <div className="p-4 border-t mt-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        {user.imageUrl && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image src={user.imageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {user.fullName || "名前未設定"}
          </span>
          <span className="text-sm text-slate-500">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => signOut()}
        className="text-slate-500 hover:text-slate-900"
      >
        <IconLogout size={20} />
      </Button>
    </div>
  );
}
