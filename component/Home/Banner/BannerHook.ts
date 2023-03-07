import { useEffect, useRef, useState } from "react";

const useBannerHook = () => {
  const [carouselNumber, setCarouselNumber] = useState(0);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     moveRight();
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  const moveLeft = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
      setCarouselNumber((order) => makeLeft(order));
    }
    setCarouselNumber((order) => {
      setLeft(makeLeft(order));
      return order;
    });
    if (wrapRef.current !== null) {
      wrapRef.current.style.transition = "none";
      wrapRef.current.style.transform = "translateX(-50%)";
    }
    setTimeout(() => {
      if (wrapRef.current !== null) {
        wrapRef.current.style.transition = "transform 0.3s";
        wrapRef.current.style.transform = "translateX(0)";
      }
    });
    timer.current = setTimeout(() => {
      setLeft(null);
      setCarouselNumber((order) => makeLeft(order));
      timer.current = undefined;
    }, 300);
  };

  const moveRight = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
      setCarouselNumber((order) => makeRight(order));
    }
    setCarouselNumber((order) => {
      setRight(makeRight(order));
      return order;
    });
    if (wrapRef.current !== null) {
      wrapRef.current.style.transition = "none";
      wrapRef.current.style.transform = "translateX(0)";
    }
    setTimeout(() => {
      if (wrapRef.current !== null) {
        wrapRef.current.style.transition = "transform 0.3s";
        wrapRef.current.style.transform = "translateX(-50%)";
      }
    });
    timer.current = setTimeout(() => {
      setCarouselNumber((order) => makeRight(order));
      timer.current = undefined;
    }, 300);
  };

  useEffect(() => {
    if (carouselNumber === right) {
      if (wrapRef.current !== null) {
        wrapRef.current.style.transition = "none";
        wrapRef.current.style.transform = "translateX(0)";
      }
      setRight(null);
    }
  }, [carouselNumber, right]);

  const makeLeft = (order: number) => (order === 0 ? 2 : order - 1);
  const makeRight = (order: number) => (order === 2 ? 0 : order + 1);

  return {
    left,
    right,
    wrapRef,
    carouselNumber,
    moveLeft,
    moveRight,
  };
};

export default useBannerHook;
