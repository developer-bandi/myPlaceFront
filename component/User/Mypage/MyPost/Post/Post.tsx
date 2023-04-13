import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import textEdit from "../../../../../lib/textedit";
import { postListcontent } from "../MyPostContainer";
import styles from "./Post.module.scss";

interface PostProps {
  content: postListcontent;
  movePostDetailPage: (id: number) => void;
}

const Post = ({ content, movePostDetailPage }: PostProps) => {
  return (
    <div
      className={styles.postBlock}
      onClick={() => movePostDetailPage(content.id)}
      key={content.id}
    >
      <div className={styles.topBlock}>
        <div className={styles.user}>{content.nickname}</div>
        <div className={styles.date}>{content.createdAt}</div>
      </div>
      <div className={styles.title}>{textEdit(content.title)}</div>
      <p className={styles.content}>{textEdit(content.content)}</p>
      <div className={styles.bottomBlock}>
        <FaRegComment size="20" className={styles.bottomIcon} />
        <div className={styles.bottomInfo}>{content.comment}</div>
        <BiLike size="20" className={styles.bottomIcon} />
        <div className={styles.bottomInfo}>{content.postlikecount}</div>
        <GrView size="20" className={styles.bottomIcon} />
        <div className={styles.bottomInfo}>{content.viewCount}</div>
      </div>
    </div>
  );
};

export default Post;
