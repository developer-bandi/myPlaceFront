import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  axiosGetPostList,
  axiosGetSearchPostList,
} from "../../../lib/commonFn/api";
import { postListType } from "../../../lib/apitype/post";
import { RootReducer } from "../../../store";
import PostList from "./PostList";

const PostListContainer = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [postList, setPostList] = useState<{
    content?: postListType;
    loading: boolean;
    error: boolean;
  }>({ loading: true, error: false });
  const [pageBlock, setPageButton] = useState<number>(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const login = useSelector(
    (state: RootReducer) => state.userLogin.loginStatus
  );

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
    } catch (error) {
      setPostList({
        loading: false,
        error: true,
      });
    }
  };

  const searchPost = async () => {
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
        selectedSort
      );
      setKeyword(searchKeyword);
      setSelectedSort("createdAt");
      setPostList({
        content: postListData.data,
        loading: false,
        error: false,
      });
    } catch (error) {
      setPostList({
        loading: false,
        error: true,
      });
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

  return (
    <PostList
      postList={postList}
      changeSort={changeSort}
      changePage={changePage}
      selectedSort={selectedSort}
      pageBlock={pageBlock}
      setPageButton={setPageButton}
      searchRef={searchRef}
      searchPost={searchPost}
      initializeSearch={initializeSearch}
      moveWritePage={moveWritePage}
      movePostDetailPage={movePostDetailPage}
    />
  );
};

export default PostListContainer;
