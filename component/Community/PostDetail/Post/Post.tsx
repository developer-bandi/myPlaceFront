import styles from "./Post.module.scss";
import LikeButtonContainer from "./LikeButton/LikeButtonContainer";
import Images from "./Images/Images";
import HeaderContainer from "./Header/HeaderContainer";
import textEdit from "../../../../lib/textEdit";

interface PostProps {
  images: { filename: string }[];
  content: string;
}

const Post = ({ images, content }: PostProps) => {
  return (
    <div>
      <HeaderContainer />
      <Images images={images} />
      <p className={styles.content}>
        {textEdit(content).map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <LikeButtonContainer />
    </div>
  );
};

export default Post;
