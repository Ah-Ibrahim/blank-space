import Navbar from "./_components/navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
export default MarketingLayout;
