import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { Hero } from "./components/hero/hero";
import { Newsletter } from "./components/newsletter/newsletter";

// Pages
import ContactUs from "./pages/contactus";
import { Treks } from "./pages/treks";
import { ProductPage } from "./pages/product";
import { AboutUs } from "./pages/aboutus";
import { Login } from "./components/loginpage/login";
import { Gallery } from "./pages/gallery";
import { Outings } from "./pages/outings";

// Separate AppContent for conditional rendering
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {/* Show Hero component on "/" or "/home" */}
      {(location.pathname === "/" || location.pathname === "/home") && <Hero />}

      {/* Define all routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} /> {/* Redirect root to home */}
        <Route path="/home" element={<Treks />} />
        <Route path="/outings" element={<Outings />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/treks/:productId" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} /> {/* Handle unknown routes */}
      </Routes>

      <Newsletter />
      <Footer />
    </>
  );
};

// Main App Component
function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

 export default App;