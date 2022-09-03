import {useEffect, useState} from "react";

const useBannerHook = () => {
  const [carouselNumber, setCarouselNumber] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselNumber((prev) => (prev === 2 ? 0 : prev + 1));
    }, 7000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return {
    carouselNumber,
  };
};

export default useBannerHook;
