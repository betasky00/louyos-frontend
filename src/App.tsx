import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Academy from "./pages/Academy";
import Consulting from "./pages/Consulting";
import Contact from "./pages/Contact";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/consulting" element={<Consulting />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
