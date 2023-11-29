import { useLayoutEffect, useState } from "react";
    
export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = useState(
    () => window.innerWidth > window.innerHeight
  );
    
  useLayoutEffect(() => {
    function testIsLandscape() {
      setIsLandscape(window.innerWidth > window.innerHeight);
    }
        
    window.addEventListener("resize", testIsLandscape);
        
    return () => {
      window.removeEventListener("resize", testIsLandscape);
    };
  }, []);
    
  return isLandscape;
}

