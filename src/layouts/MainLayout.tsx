
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1 text-foreground">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
