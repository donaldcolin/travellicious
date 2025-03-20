import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";
import { Hero } from "./component/hero/hero";

import Preloader from "./component/preloader/preloader";
import React from "react";
import ScrollToTop from "./scrolltotop";
// Pages
import ContactUs from "./pages/contactus";
import { Treks } from "./pages/treks";
import { ProductPage } from "./pages/trekproduct";
import { AboutUs } from "./pages/aboutus";
import LoginPage from "./component/auth/login";
import { Gallery } from "./pages/gallery";
import { Outings } from "./pages/outings";
import{ OutingPage }from "./pages/OutingProduct";
import PremiumPage from "./pages/premium";
import ClassicTrekBookingCart from "./pages/cart";
import RegistrationPage from "./component/auth/resgistration";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/cart" element={<ClassicTrekBookingCart />} />
        <Route path="/treks/:productId" element={<ProductPage />} />
        <Route path="/outing/:outingId" element={<OutingPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} /> {/* Handle unknown routes */}
      </Routes>

      <Footer />
    </>
  );
};

// Main App Component with Preloader
function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time or wait for actual resources to load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader /> // Show the preloader while loading
      ) : (
        <BrowserRouter>
        <ScrollToTop/>
          <AppContent />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;