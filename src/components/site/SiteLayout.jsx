import { Outlet } from "react-router-dom";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <main className="pt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}