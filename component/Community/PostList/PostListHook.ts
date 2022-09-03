import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {
  axiosGetPostList,
  axiosGetSearchPostList,
} from "../../../lib/commonFn/api";
import {RootReducer} from "../../../store";

export interface postListContent {
  count: number;
  rows: {
    id: number;
    title: string;
    content: string;
    viewCount: number;
    createdAt: string;
    nickname: string;
    comment: number;
    postlikecount: number;
  }[];
}

export interface postListState {
  content?: postListContent;
  loading: boolean;
  error: boolean;
}

const usePostList = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [postList, setPostList] = useState<postListState>({
    loading: true,
    error: false,
  });
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const login = useSelector((state: RootReducer) => state.userLogin.content);

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosPostList = await axiosGetPostList(1, "createdAt");
        setPostList({
          content: axiosPostList.data,
          loading: false,
          error: false,
        });
      } catch (e) {
        setPostList({
          loading: false,
          error: true,
        });
      }
    };
    asyncWrapFn();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });

  const changeSort = async (sort: string) => {
    try {
      setPostList({
        loading: true,
        error: false,
      });
      setSelectedSort(sort);
      const postListData =
        keyword === ""
          ? await axiosGetPostList(1, sort)
          : await axiosGetSearchPostList(keyword, 1, sort);
      setPostList({
        content: postListData.data,
        loading: false,
        error: false,
      });
      setPage(1);
    } catch (error) {
      setPostList({
        loading: false,
        error: true,
      });
    }
  };

  const changePage = async (page: number) => {
    try {
      setPostList({
        loading: true,
        error: false,
      });
      const postListData =
        keyword === ""
          ? await axiosGetPostList(page, selectedSort)
          : await axiosGetSearchPostList(keyword, page, selectedSort);
      setPostList({
        content: postListData.data,
        loading: false,
        error: false,
      });
      setPage(page);
    } catch (error) {
      setPostList({
        loading: false,
        error: true,
      });
    }
  };

  const searchPost = async (e: {key?: string; type: string}) => {
    if (
      (e.type === "click" && e.key === undefined) ||
      (e.type === "keypress" && e.key === "Enter")
    ) {
      try {
        const searchKeyword =
          searchRef.current !== null ? searchRef.current.value : "";
        setPostList({
          loading: true,
          error: false,
        });
        const postListData = await axiosGetSearchPostList(
          searchKeyword,
          1,
          "createdAt"
        );
        setKeyword(searchKeyword);
        setSelectedSort("createdAt");
        setPostList({
          content: postListData.data,
          loading: false,
          error: false,
        });
        setPage(1);
      } catch (error) {
        setPostList({
          loading: false,
          error: true,
        });
      }
    }
  };

  const initializeSearch = () => {
    setKeyword("");
    if (searchRef.current !== null) {
      searchRef.current.value = "";
    }
  };

  const moveWritePage = () => {
    if (login) {
      router.push("/community/writepost");
    } else {
      alert("로그인이 필요합니다.");
      router.push("/user/auth/signin");
    }
  };

  const movePostDetailPage = (id: number) => {
    router.push(`/community/postdetail/${id}`);
  };

  return {
    postList,
    changeSort,
    changePage,
    selectedSort,
    searchRef,
    searchPost,
    initializeSearch,
    moveWritePage,
    movePostDetailPage,
    setKeyword,
    keyword,
    page,
  };
};

export default usePostList;
