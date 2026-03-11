import ModalProvider from "@/providers/modal-provider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import SearchCommand from "./_components/search-command";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) redirect("/");

  return (
    <ModalProvider>
      <div className="h-full flex">
        <Navigation />
        <SearchCommand />
        <main className="h-full flex-1 overflow-y-auto">{children}</main>
      </div>
    </ModalProvider>
  );
}
export default MainLayout;
