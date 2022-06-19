import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width:767px)" });
  useEffect(() => {
    setIsMobile(mobile), [mobile];
  });
  return isMobile;
}

export function useIsTablet() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width:1023px)" });
  useEffect(() => {
    setIsMobile(mobile), [mobile];
  });
  return isMobile;
}

export function useIsLabtop() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width:1201px)" });
  useEffect(() => {
    setIsMobile(mobile), [mobile];
  });
  return isMobile;
}
