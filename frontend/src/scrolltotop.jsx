import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto' // for smooth scrolling, use 'auto' for instant jump
    });
  }, [pathname]);

  return null;
}
export default ScrollToTop 