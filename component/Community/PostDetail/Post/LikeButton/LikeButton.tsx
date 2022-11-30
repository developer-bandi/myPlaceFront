import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import styles from "./LikeButton.module.scss";

interface LikeButtonProps {
  dispatchUpdateLike: () => void;
  liked: string;
  likedLength: number;
}

const LikeButton = ({
  dispatchUpdateLike,
  liked,
  likedLength,
}: LikeButtonProps) => {
  return (
    <button
      className={styles.mainBlock}
      onClick={dispatchUpdateLike}
      data-testid="deleteOrPostLikecount"
    >
      {liked === "up" ? (
        <FcLike className={styles.icon} />
      ) : (
        <AiOutlineHeart className={styles.icon} />
      )}
      {likedLength}
    </button>
  );
};

export default LikeButton;
