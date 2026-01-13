import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";
import { Hero } from "./component/hero/hero";
import Preloader from "./component/preloader/preloader";
import React, { Suspense, lazy } from "react";
import ScrollToTop from "./scrolltotop";

// Lazy load pages
const ContactUs = lazy(() => import("./pages/contactus"));
const Treks = lazy(() => import("./pages/treks"));
const ProductPage = lazy(() => import("./pages/trekproduct"));
const AboutUs = lazy(() => import("./pages/aboutus"));
const LoginPage = lazy(() => import("./component/auth/login"));
const Gallery = lazy(() => import("./pages/gallery"));
const Outings = lazy(() => import("./pages/outings"));
const OutingPage = lazy(() => import("./pages/OutingProduct"));
const PremiumPage = lazy(() => import("./pages/premium"));
const ClassicTrekBookingCart = lazy(() => import("./pages/cart"));
const RegistrationPage = lazy(() => import("./component/auth/resgistration"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Separate AppContent for conditional rendering
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {(location.pathname === "/" || location.pathname === "/home") && <Hero />}

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

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
     <Preloader/>// Show the preloader while loading
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