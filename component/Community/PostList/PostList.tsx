import styles from "./PostList.module.scss";
import { FcLike } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { RefObject, SetStateAction } from "react";
import Image from "next/image";
import searchResultLoading from "../../../public/searchResultLoading.gif";
import { setDateLatest } from "../../../lib/commonFn/date";
import { postListType } from "../../../lib/apitype/post";

interface PostListProps {
  postList: {
    content?: postListType | undefined;
    loading: boolean;
    error: boolean;
  };

  changeSort: (sort: string) => Promise<void>;
  changePage: (page: number) => Promise<void>;
  selectedSort: string;
  pageBlock: number;
  setPageButton: React.Dispatch<SetStateAction<number>>;
  searchRef: RefObject<HTMLInputElement>;
  searchPost: () => Promise<void>;
  initializeSearch: () => void;
  moveWritePage: () => void;
  movePostDetailPage: (id: number) => void;
}

const PostList = ({
  postList,
  changeSort,
  changePage,
  selectedSort,
  pageBlock,
  setPageButton,
  searchRef,
  searchPost,
  initializeSearch,
  moveWritePage,
  movePostDetailPage,
}: PostListProps) => {
  return (
    <main className={styles.mainBlock}>
      <div className={styles.searchBlock}>
        <input className={styles.searchInput} ref={searchRef} />
        <button className={styles.searchButton} onClick={searchPost}>
          검색
        </button>
        <button onClick={initializeSearch} className={styles.initializeSearch}>
          초기화
        </button>
      </div>
      <div className={styles.sortBlock}>
        <ul className={styles.sortList}>
          {[
            { kr: "최신순", en: "createdAt" },
            { kr: "좋아요순", en: "likeCount" },
            { kr: "조회수순", en: "viewCount" },
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
              >
                {sortNameObj.kr}
              </li>
            );
          })}
        </ul>
        <button className={styles.writeButton} onClick={moveWritePage}>
          글쓰기
        </button>
      </div>
      <div className={styles.postListBlock}>
        {postList.loading ? (
          <div className={styles.loading}>
            <Image src={searchResultLoading} alt="loading" />
          </div>
        ) : !postList.error && postList.content !== undefined ? (
          postList.content.postList.map((data) => {
            return (
              <article
                className={styles.postBlock}
                onClick={() => movePostDetailPage(data.id)}
              >
                <h3 className={styles.postHiddenTitle}>{data.title}</h3>
                <div className={styles.postTopBlock}>
                  <h3 className={styles.postTitle}>{data.title}</h3>
                  <div className={styles.postUser}>
                    {data.User ? data.User.nickname : "test"}
                  </div>
                  <div className={styles.postWritedAt}>
                    {setDateLatest(data.createdAt)}
                  </div>
                </div>
                <p className={styles.postContent}>{data.content}</p>
                <ul className={styles.postBottomBlock}>
                  <li className={styles.postBottomInfo}>
                    <GrView className={styles.postIcon} />
                    {data.viewCount}
                  </li>
                  <li className={styles.postBottomInfo}>
                    <FcLike className={styles.postIcon} />
                    {data.likelist.length}
                  </li>
                  <li className={styles.postBottomInfo}>
                    <BiCommentDetail className={styles.postIcon} />
                    {data.Comments}
                  </li>
                </ul>
              </article>
            );
          })
        ) : (
          <p className={styles.error}>
            서버에 에러가 발생하였습니다 다시 시도해주세요
          </p>
        )}
      </div>
      <div className={styles.pageBlock}>
        {pageBlock === 1 ? null : (
          <button
            className={styles.pageButton}
            onClick={() => setPageButton(pageBlock - 1)}
          >
            <AiOutlineLeft />
          </button>
        )}
        {postList.content === undefined || postList.error
          ? []
          : (postList.content.count <= pageBlock * 50
              ? new Array(
                  Math.ceil(
                    (postList.content.count - (pageBlock - 1) * 50) / 10
                  )
                ).fill(5 * (pageBlock - 1))
              : new Array(5).fill(5 * (pageBlock - 1))
            ).map((value: number, index: number) => {
              return (
                <button
                  key={value + index + 1}
                  className={styles.pageButton}
                  onClick={() => changePage(value + index + 1)}
                >
                  {value + index + 1}
                </button>
              );
            })}
        {(postList.content !== undefined &&
          postList.content.count <= pageBlock * 50) ||
        postList.error ? null : (
          <button
            className={styles.pageButton}
            onClick={() => setPageButton(pageBlock + 1)}
          >
            <AiOutlineRight />
          </button>
        )}
      </div>
    </main>
  );
};

export default PostList;
