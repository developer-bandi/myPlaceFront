import { BiCommentDetail } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import textEdit from "../../../../lib/textedit";
import { post } from "../../../../type/post";
import styles from "./Post.module.scss";

interface PostProps {
  content: post;
  movePostDetailPage: (id: number) => void;
}

const Post = ({ content, movePostDetailPage }: PostProps) => {
  return (
    <article
      className={styles.mainBlock}
      onClick={() => movePostDetailPage(content.id)}
      key={content.id}
    >
      <div className={styles.topBlock}>
        <h2 className={styles.title}>{textEdit(content.title)}</h2>
        <div className={styles.user}>{content.nickname}</div>
        <div className={styles.writedAt}>{content.createdAt}</div>
      </div>
      <p className={styles.content}>
        {textEdit(content.content).map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <ul className={styles.bottomBlock}>
        <li className={styles.iconBlock}>
          <GrView className={styles.icon} />
          {content.viewCount}
        </li>
        <li className={styles.iconBlock}>
          <FcLike className={styles.icon} />
          {content.postlikecount}
        </li>
        <li className={styles.iconBlock}>
          <BiCommentDetail className={styles.icon} />
          {content.comment}
        </li>
      </ul>
    </article>
  );
};

export default Post;
