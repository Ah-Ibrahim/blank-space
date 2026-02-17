import Navbar from "./_components/navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
export default MarketingLayout;
