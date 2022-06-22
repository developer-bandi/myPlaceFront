import styles from "./PostDetail.module.scss";
import { BiCommentDetail } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { RefObject } from "react";
import { signupState } from "../../../store/reducers/userLogin/userLoginReducer";
import { setDateLatest } from "../../../lib/commonFn/date";
import { postDetailType } from "../../../lib/apitype/post";

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
      <h3 className={styles.hidden}>{serverSideData.title}</h3>
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
            {loginedUser.userInfo.id == serverSideData.UserId ? (
              <button
                className={styles.deletePostButton}
                onClick={() =>
                  deletePost(serverSideData.id, serverSideData.UserId)
                }
              >
                삭제하기
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.photoListBlock}>
        {serverSideData.Photos.map((srcObj: { filename: string }) => {
          return (
            <div className={styles.photoBlock}>
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/imgs/${srcObj.filename}`}
                className={styles.img}
              />
            </div>
          );
        })}
      </div>
      <p className={styles.content}>{serverSideData.content}</p>
      <button className={styles.likeCount} onClick={deleteOrPostLikecount}>
        {likelist.indexOf(loginedUser.userInfo.id || -1) !== -1 ? (
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
            <div className={styles.commentBlock}>
              <ul className={styles.commentInfoBlock}>
                <li className={styles.commentUser}>{comment.User.nickname}</li>

                <li className={styles.commentDate}>
                  {setDateLatest(comment.createdAt)}
                </li>
                {loginedUser.userInfo.id == comment.UserId ? (
                  <button
                    className={styles.deleteCommentButton}
                    onClick={() => deleteComment(comment.id, comment.UserId)}
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
        <textarea className={styles.commentInput} ref={textareaRef} />
        <button className={styles.commentSubmitButton} onClick={postComment}>
          등록
        </button>
      </div>
    </main>
  );
};

export default PostDetail;
