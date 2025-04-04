
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";
import SpiritualPoems from "@/pages/SpiritualPoems";
import FamousPoets from "@/pages/FamousPoets";
import PoetProfile from "@/pages/PoetProfile";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="kavyapath-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/spiritual-poems" element={<SpiritualPoems />} />
          <Route path="/famous-poets" element={<FamousPoets />} />
          <Route path="/poet/:id" element={<PoetProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
