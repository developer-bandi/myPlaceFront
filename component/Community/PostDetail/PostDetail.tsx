import styles from "./PostDetail.module.scss";
import {BiCommentDetail} from "react-icons/bi";
import {FcLike} from "react-icons/fc";
import {GrView} from "react-icons/gr";
import {AiOutlineHeart} from "react-icons/ai";
import {RefObject} from "react";
import {signupState} from "../../../store/reducers/userLogin/Reducer";
import {setDateLatest} from "../../../lib/commonFn/date";
import {postDetailType} from "../../../lib/apitype/post";
import Image from "next/image";

interface PostDetailProps {
  serverSideData: postDetailType;
  textareaRef: RefObject<HTMLTextAreaElement>;
  comments: {
    PostId: number;
    User: {
      id: number;
      nickname: string;
    };
    UserId: number;
    content: string;
    createdAt: string;
    id: number;
    updatedAt: string;
  }[];
  likelist: number[];
  postComment: () => Promise<void>;
  loginedUser: signupState;
  deleteOrPostLikecount: () => Promise<void>;
  deleteComment: (CommentId: number, UserId: number) => Promise<void>;
  deletePost: (PostId: number, UserId: number) => Promise<void>;
}

const myLoader = ({src}: {src: string}) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_1000,h_1000${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
};

const PostDetail = ({
  serverSideData,
  textareaRef,
  comments,
  likelist,
  postComment,
  loginedUser,
  deleteOrPostLikecount,
  deleteComment,
  deletePost,
}: PostDetailProps) => {
  return (
    <main className={styles.mainBlock}>
      <div className={styles.titleBlock}>
        <h3 className={styles.title}>{serverSideData.title}</h3>
        <div className={styles.titleInfoBlock}>
          <ul className={styles.leftBlock}>
            <li className={styles.nickname}>{serverSideData.User.nickname}</li>
            <li className={styles.date}>
              {setDateLatest(serverSideData.createdAt)}
            </li>
            <li className={styles.viewCount}>
              <GrView className={styles.icon} />
              {serverSideData.viewCount}
            </li>
          </ul>
          <div className={styles.rightBlock}>
            {loginedUser.content?.id == serverSideData.UserId ? (
              <button
                className={styles.deletePostButton}
                onClick={() =>
                  deletePost(serverSideData.id, serverSideData.UserId)
                }
                data-testid="deletePost"
              >
                삭제하기
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.photoListBlock}>
        {serverSideData.Photos.map((srcObj: {filename: string}) => {
          return (
            <div className={styles.photoBlock}>
              <Image
                loader={myLoader}
                src={`/${srcObj.filename}`}
                alt="searchImg"
                layout="fill"
              />
            </div>
          );
        })}
      </div>
      <p className={styles.content}>{serverSideData.content}</p>
      <button
        className={styles.likeCount}
        onClick={deleteOrPostLikecount}
        data-testid="deleteOrPostLikecount"
      >
        {likelist.indexOf(loginedUser.content?.id || -1) !== -1 ? (
          <FcLike className={styles.icon} />
        ) : (
          <AiOutlineHeart className={styles.icon} />
        )}
        {likelist.length}
      </button>
      <div className={styles.commentTitle}>
        <BiCommentDetail className={styles.icon} />
        댓글 {comments.length}개
      </div>
      <div className={styles.commentListBlock}>
        {comments.map((comment) => {
          return (
            <div className={styles.commentBlock} key={comment.id}>
              <ul className={styles.commentInfoBlock}>
                <li className={styles.commentUser}>{comment.User.nickname}</li>

                <li className={styles.commentDate}>
                  {setDateLatest(comment.createdAt)}
                </li>
                {loginedUser.content?.id == comment.UserId ? (
                  <button
                    className={styles.deleteCommentButton}
                    onClick={() => deleteComment(comment.id, comment.UserId)}
                    data-testid="deleteComment"
                  >
                    삭제
                  </button>
                ) : null}
              </ul>
              <p className={styles.commentContent}>{comment.content}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.commentInputBlock}>
        <textarea
          className={styles.commentInput}
          ref={textareaRef}
          aria-label="commentTextarea"
        />
        <button
          className={styles.commentSubmitButton}
          onClick={postComment}
          data-testid="postComment"
        >
          등록
        </button>
      </div>
    </main>
  );
};

export default PostDetail;
