import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) redirect("/");

  return (
    <div className="h-full flex">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
export default MainLayout;
