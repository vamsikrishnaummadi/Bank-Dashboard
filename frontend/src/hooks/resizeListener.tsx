import { useEffect, useState } from "react";

const useResizeListener = () => {
  const getSize = () => ({
    width: window?.innerWidth || null,
    height: window?.innerHeight || null,
  });

  if (typeof window === "undefined") {
    return getSize();
  }

  const [windowSize, setWindowSize] = useState(getSize);

  const handleResize = () => {
    setWindowSize(getSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useResizeListener;
