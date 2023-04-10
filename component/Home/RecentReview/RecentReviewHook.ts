import { useEffect, useRef, useState } from "react";
import { getReviewRecent } from "../../../api/home";
export interface recentReviewData {
  id: number;
  content: string;
  createdAt: string;
  storeName: string;
  storeAddress: string;
  storeLatitude: string;
  storeLongitude: string;
  nickname: string;
  hashtag: string[];
}

export interface reviewRecentState {
  count: number;
  rows: recentReviewData[];
}

const useRecentReview = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const checkBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();
  const [startNode, setStartNode] = useState(0);

  const [page, setPage] = useState(1);
  const [serverDataStatus, setServerDataStatus] = useState({
    loading: true,
    fetching: false,
    error: false,
  });
  const [serverData, setserverData] = useState<reviewRecentState>({
    count: 0,
    rows: [],
  });

  useEffect(() => {
    if (
      checkBoxRef.current !== null &&
      !serverDataStatus.loading &&
      containerRef.current !== null
    ) {
      const options = { root: containerRef.current };
      const callback = (
        entries: { isIntersecting: boolean; target: Element }[],
        observer: { unobserve: (target: Element) => void }
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServerDataStatus((prev) => {
              if (!prev.fetching) {
                setPage((page) => {
                  return page + 1;
                });
              }
              return prev;
            });

            setserverData(({ count, rows }) => {
              if (count - rows.length < 10) {
                observer.unobserve(entry.target);
              }
              return { count, rows };
            });
          }
        });
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(checkBoxRef.current);
      return () => observer.disconnect();
    }
  }, [serverDataStatus.loading]);

  useEffect(() => {
    const virtualInfinityScroll = () => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          if (containerRef.current !== null && visibleRef.current !== null) {
            const scroll = containerRef.current.scrollTop;
            const startNode = Math.floor(scroll / 192.5);
            setStartNode(startNode);
          }
          timer.current = undefined;
        }, 50);
      }
    };

    if (containerRef.current !== null) {
      containerRef.current.addEventListener("scroll", virtualInfinityScroll);
    }
  });

  useEffect(() => {
    if (visibleRef.current !== null) {
      const offsetY = startNode * 192.5;
      visibleRef.current.style.transform = `translateY(${offsetY}px)`;
    }
  }, [startNode]);

  const delay = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(1), 5000);
    });

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        if (listRef.current !== null) {
          listRef.current.style.height = `${192.5 * (page - 1) * 10 + 50}px`;
        }
        setServerDataStatus({
          loading: serverData.count !== 0 ? false : true,
          fetching: serverData.count !== 0 ? true : false,
          error: false,
        });
        const [_, { data }] = await Promise.all([delay, getReviewRecent(page)]);
        setserverData({
          count: data.count,
          rows: [...serverData.rows, ...data.rows],
        });
        if (listRef.current !== null) {
          console.log(listRef.current.style.height);
          listRef.current.style.height = `${
            192.5 * ((page - 1) * 10 + data.rows.length)
          }px`;
          console.log(listRef.current.style.height);
        }
        setServerDataStatus({
          loading: false,
          fetching: false,
          error: false,
        });
      } catch (e) {
        setServerDataStatus({
          loading: false,
          fetching: false,
          error: true,
        });
      }
    };
    asyncWrapFn();
  }, [page]);

  return {
    serverDataStatus,
    serverData,
    setPage,
    listRef,
    checkBoxRef,
    containerRef,
    visibleRef,
    startNode,
  };
};

export default useRecentReview;
