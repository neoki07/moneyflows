import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "w-full",
          card: "shadow-none p-0",
          header: "hidden",
          footer: "hidden",
        },
      }}
    />
  );
}
