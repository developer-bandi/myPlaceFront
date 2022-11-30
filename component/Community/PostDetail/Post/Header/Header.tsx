import { GrView } from "react-icons/gr";
import { setDateLatest } from "../../../../../lib/commonFn/date";
import styles from "./Header.module.scss";

interface HeaderProps {
  id: string;
  title: string;
  nickname: string;
  date: string;
  viewCount: number;
  userId: number | undefined;
  dispatchDeletePost: ({
    postId,
    userId,
  }: {
    postId: string;
    userId: number;
  }) => void;
  isMyPost: boolean;
}

const Header = ({
  id,
  title,
  nickname,
  date,
  viewCount,
  userId,
  dispatchDeletePost,
  isMyPost,
}: HeaderProps) => {
  return (
    <div className={styles.mainBlock}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.infoBlock}>
        <ul className={styles.leftBlock}>
          <li className={styles.nickname}>{nickname}</li>
          <li className={styles.date}>{date}</li>
          <li className={styles.viewCount}>
            <GrView className={styles.icon} />
            {viewCount}
          </li>
        </ul>
        <div className={styles.rightBlock}>
          {isMyPost && (
            <button
              className={styles.button}
              onClick={() =>
                dispatchDeletePost({ postId: id, userId: userId as number })
              }
              data-testid="deletePost"
            >
              삭제하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
