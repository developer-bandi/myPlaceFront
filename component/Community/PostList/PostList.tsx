import styles from "./PostList.module.scss";
import { RefObject } from "react";
import Image from "next/image";
import { setDateLatest } from "../../../lib/date";
import { postListState } from "./PostListHook";
import searchResultLoading from "../../../public/searchResultLoading.gif";
import PageNationContainer from "../../Common/PageNation/PageNationContainer";
import Post from "./Post/Post";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";

interface PostListProps {
  page: number;
  postList: postListState;
  changeSort: (sort: string) => Promise<void>;
  selectedSort: string;
  changePage: (page: number) => Promise<void>;
  searchRef: RefObject<HTMLInputElement>;
  searchPost: (e: { key?: string; type: string }) => Promise<void>;
  initializeSearch: () => void;
  moveWritePage: () => void;
  movePostDetailPage: (id: number) => void;
}

const PostList = ({
  page,
  postList,
  changeSort,
  changePage,
  selectedSort,
  searchRef,
  searchPost,
  initializeSearch,
  moveWritePage,
  movePostDetailPage,
}: PostListProps) => {
  if (postList.loading) {
    return (
      <main className={styles.mainBlock}>
        <h1 className={styles.title}>커뮤니티</h1>
        <div className={styles.sortBlock}>
          <Sort selectedSort={selectedSort} changeSort={changeSort} />
          <Search
            searchPost={searchPost}
            searchRef={searchRef}
            initializeSearch={initializeSearch}
            moveWritePage={moveWritePage}
          />
        </div>
        <div className={styles.loadingBlock}>
          <Image
            src={searchResultLoading}
            alt="loading"
            layout="fill"
            objectFit="contain"
            priority={true}
          ></Image>
        </div>
      </main>
    );
  } else if (postList.error) {
    return (
      <main className={styles.mainBlock}>
        <h1>커뮤니티</h1>
        <p className={styles.message}>서버에 에러가 발생하였습니다</p>
      </main>
    );
  } else if (postList.content?.count === 0) {
    return (
      <main className={styles.mainBlock}>
        <h1>커뮤니티</h1>
        <div className={styles.sortBlock}>
          <Sort selectedSort={selectedSort} changeSort={changeSort} />
          <Search
            searchPost={searchPost}
            searchRef={searchRef}
            initializeSearch={initializeSearch}
            moveWritePage={moveWritePage}
          />
        </div>
        <p className={styles.message}>포스트가 존재하지 않습니다</p>
      </main>
    );
  } else {
    return (
      <main className={styles.mainBlock}>
        <h1 className={styles.title}>커뮤니티</h1>
        <div className={styles.sortBlock}>
          <Sort selectedSort={selectedSort} changeSort={changeSort} />
          <Search
            searchPost={searchPost}
            searchRef={searchRef}
            initializeSearch={initializeSearch}
            moveWritePage={moveWritePage}
          />
        </div>
        <div className={styles.postListBlock}>
          {postList.content !== undefined &&
            postList.content.rows.map((post, index) => {
              post.createdAt = setDateLatest(post.createdAt);
              return (
                <Post
                  content={post}
                  movePostDetailPage={movePostDetailPage}
                  key={index}
                />
              );
            })}
        </div>
        <PageNationContainer
          page={page}
          changePage={changePage}
          totalAmount={postList.content?.count as number}
          addStyle={"margin"}
          contentUnit={10}
          pageUnit={5}
        />
      </main>
    );
  }
};

export default PostList;
