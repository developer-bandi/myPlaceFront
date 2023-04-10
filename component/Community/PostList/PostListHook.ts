import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getPostList, getSearchPostList } from "../../../api/post";
import { RootReducer } from "../../../store";
import { getPostListRes } from "../../../type/post";
export interface postListState {
  content?: getPostListRes;
  loading: boolean;
  error: boolean;
}

const usePostList = (serverSideData: getPostListRes) => {
  const loginedUser = useSelector(
    (state: RootReducer) => state.userLogin.content
  );
  const [keyword, setKeyword] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [postList, setPostList] = useState<postListState>({
    content: serverSideData,
    loading: false,
    error: false,
  });
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
          ? await getPostList({ page: 1, order: sort })
          : await getSearchPostList({ keyword, page: 1, order: sort });
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
          ? await getPostList({ page, order: selectedSort })
          : await getSearchPostList({ keyword, page, order: selectedSort });
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

  const searchPost = async (e: { key?: string; type: string }) => {
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
        const postListData = await getSearchPostList({
          keyword: searchKeyword,
          page: 1,
          order: "createdAt",
        });
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
    setPostList({
      content: serverSideData,
      loading: false,
      error: false,
    });
    setSelectedSort("createdAt");
    setPage(1);
  };

  const moveWritePage = () => {
    if (loginedUser) {
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
