import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { TagRecord, tagTable } from "@/db/schema";

import { Tag } from "./types";

function toTag(record: Pick<TagRecord, "id" | "name">): Tag {
  return {
    id: record.id,
    name: record.name,
  };
}

export async function fetchTags() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const records = await db
    .select({
      id: tagTable.id,
      name: tagTable.name,
    })
    .from(tagTable)
    .where(eq(tagTable.userId, userId))
    .orderBy(tagTable.name);

  return records.map(toTag);
}
