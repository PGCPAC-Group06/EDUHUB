import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component has no visual output — it just listens for route
// changes and scrolls the window to the top every time the path changes.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}