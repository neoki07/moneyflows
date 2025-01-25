import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { SignInForm } from "./_components/sign-in-form";

export default async function SignInPage() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return <SignInForm />;
}
