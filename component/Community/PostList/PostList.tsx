import styles from "./PostList.module.scss";
import {FcLike} from "react-icons/fc";
import {GrView} from "react-icons/gr";
import {BiCommentDetail, BiSearchAlt2} from "react-icons/bi";
import {RefObject, SetStateAction} from "react";
import Image from "next/image";
import {setDateLatest} from "../../../lib/commonFn/date";
import PageNation from "../../Common/PageNation/PageNation";
import {postListState} from "./PostListHook";

interface PostListProps {
  page: number;
  postList: postListState;
  changeSort: (sort: string) => Promise<void>;
  changePage: (page: number) => Promise<void>;
  selectedSort: string;
  searchRef: RefObject<HTMLInputElement>;
  searchPost: (e: {key?: string; type: string}) => Promise<void>;
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
          <ul className={styles.sortList}>
            {[
              {kr: "최신순", en: "createdAt"},
              {kr: "좋아요순", en: "likeCount"},
              {kr: "조회수순", en: "viewCount"},
            ].map((sortNameObj) => {
              return (
                <li
                  className={
                    selectedSort === sortNameObj.en
                      ? styles.selectedSortName
                      : styles.sortName
                  }
                  onClick={() => {
                    changeSort(sortNameObj.en);
                  }}
                  key={sortNameObj.kr}
                  data-testid={`${sortNameObj.en}sortButton`}
                >
                  {sortNameObj.kr}
                </li>
              );
            })}
          </ul>
          <div className={styles.rightBlock}>
            <div className={styles.searchBlock}>
              <button className={styles.searchButton} onClick={searchPost}>
                <BiSearchAlt2 size={"20"} />
              </button>
              <input
                className={styles.searchInput}
                ref={searchRef}
                onKeyPress={searchPost}
              />
            </div>
            <button
              onClick={initializeSearch}
              className={styles.initializeSearch}
            >
              초기화
            </button>
            <button
              className={styles.writeButton}
              onClick={moveWritePage}
              data-testid="writeButton"
            >
              글쓰기
            </button>
          </div>
        </div>
        <div className={styles.loadingBlock}>
          <Image
            src="/searchResultLoading.gif"
            alt="searchImg"
            layout="fill"
            objectFit="contain"
            priority={true}
            data-testid="loading"
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
          <ul className={styles.sortList}>
            {[
              {kr: "최신순", en: "createdAt"},
              {kr: "좋아요순", en: "likeCount"},
              {kr: "조회수순", en: "viewCount"},
            ].map((sortNameObj) => {
              return (
                <li
                  className={
                    selectedSort === sortNameObj.en
                      ? styles.selectedSortName
                      : styles.sortName
                  }
                  onClick={() => {
                    changeSort(sortNameObj.en);
                  }}
                  key={sortNameObj.kr}
                  data-testid={`${sortNameObj.en}sortButton`}
                >
                  {sortNameObj.kr}
                </li>
              );
            })}
          </ul>
          <div className={styles.rightBlock}>
            <div className={styles.searchBlock}>
              <button className={styles.searchButton} onClick={searchPost}>
                <BiSearchAlt2 size={"20"} />
              </button>
              <input
                className={styles.searchInput}
                ref={searchRef}
                onKeyPress={searchPost}
              />
            </div>
            <button
              onClick={initializeSearch}
              className={styles.initializeSearch}
            >
              초기화
            </button>
            <button
              className={styles.writeButton}
              onClick={moveWritePage}
              data-testid="writeButton"
            >
              글쓰기
            </button>
          </div>
        </div>
        <p className={styles.message}>포스트가 존재하지 않습니다</p>
      </main>
    );
  } else {
    return (
      <main className={styles.mainBlock}>
        <h1 className={styles.title}>커뮤니티</h1>
        <div className={styles.sortBlock}>
          <ul className={styles.sortList}>
            {[
              {kr: "최신순", en: "createdAt"},
              {kr: "좋아요순", en: "likeCount"},
              {kr: "조회수순", en: "viewCount"},
            ].map((sortNameObj) => {
              return (
                <li
                  className={
                    selectedSort === sortNameObj.en
                      ? styles.selectedSortName
                      : styles.sortName
                  }
                  onClick={() => {
                    changeSort(sortNameObj.en);
                  }}
                  key={sortNameObj.kr}
                  data-testid={`${sortNameObj.en}sortButton`}
                >
                  {sortNameObj.kr}
                </li>
              );
            })}
          </ul>
          <div className={styles.rightBlock}>
            <div className={styles.searchBlock}>
              <button
                className={styles.searchButton}
                onClick={searchPost}
                data-testid="searchButton"
              >
                <BiSearchAlt2 size={"20"} />
              </button>
              <input
                className={styles.searchInput}
                ref={searchRef}
                onKeyPress={searchPost}
              />
            </div>
            <button
              onClick={initializeSearch}
              className={styles.initializeSearch}
              data-testid="initializeButton"
            >
              초기화
            </button>
            <button
              className={styles.writeButton}
              onClick={moveWritePage}
              data-testid="writeButton"
            >
              글쓰기
            </button>
          </div>
        </div>

        <div className={styles.postListBlock}>
          {postList.content !== undefined &&
            postList.content.rows.map((post, index) => {
              return (
                <article
                  className={styles.postBlock}
                  onClick={() => movePostDetailPage(post.id)}
                  data-testid={`articleButton${index}`}
                  key={index}
                >
                  <div className={styles.postTopBlock}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <div className={styles.postUser}>{post.nickname}</div>
                    <div className={styles.postWritedAt}>
                      {setDateLatest(post.createdAt)}
                    </div>
                  </div>
                  <p className={styles.postContent}>{post.content}</p>
                  <ul className={styles.postBottomBlock}>
                    <li className={styles.postBottomInfo}>
                      <GrView className={styles.postIcon} />
                      {post.viewCount}
                    </li>
                    <li className={styles.postBottomInfo}>
                      <FcLike className={styles.postIcon} />
                      {post.postlikecount}
                    </li>
                    <li className={styles.postBottomInfo}>
                      <BiCommentDetail className={styles.postIcon} />
                      {post.comment}
                    </li>
                  </ul>
                </article>
              );
            })}
        </div>
        <PageNation
          page={page}
          changePage={changePage}
          totalCount={postList.content?.count as number}
          addStyle={"margin"}
        />
      </main>
    );
  }
};

export default PostList;
