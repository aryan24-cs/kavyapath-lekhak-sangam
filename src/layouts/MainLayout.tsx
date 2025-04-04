
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-background to-background/80">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-kavya-purple/50 via-kavya-lavender/30 to-kavya-pink/40"></div>
      <div className="fixed inset-0 -z-10 bg-noise opacity-[0.015]"></div>
      <Navbar />
      <main className="flex-1 text-foreground">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
