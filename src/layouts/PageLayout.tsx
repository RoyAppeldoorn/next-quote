import Navbar from "../components/Navbar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen p-8">
      <Navbar />
      {children}
    </div>
  );
}
