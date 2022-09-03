import {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({query: "(max-width:767px)"});
  useEffect(() => {
    setIsMobile(mobile), [mobile];
  });
  return isMobile;
}

export function useIsTabletOrMobile() {
  const [isTablet, setIsTablet] = useState(false);
  const tablet = useMediaQuery({query: "(max-width:1023px)"});
  useEffect(() => {
    setIsTablet(tablet), [tablet];
  });
  return isTablet;
}

export function useIsLabtopOrTabletOrMobile() {
  const [isLabtop, setIsLabtop] = useState(false);
  const labtope = useMediaQuery({query: "(max-width:1201px)"});
  useEffect(() => {
    setIsLabtop(labtope), [labtope];
  });
  return isLabtop;
}
