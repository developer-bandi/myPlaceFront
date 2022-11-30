import Image from "next/image";
import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  position: string;
  image: string;
  title: string;
  content: string;
  linkPath: string;
  linkContent: string;
}

const Button = ({
  position,
  image,
  title,
  content,
  linkPath,
  linkContent,
}: ButtonProps) => {
  return (
    <div
      className={`${styles.mainBlock} ${
        position === "left" ? styles.left : ""
      }`}
    >
      <div className={styles.image}>
        <Image src={image} alt="searchImg" layout="fill" priority={true} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
      <div className={styles.buttonBlock}>
        <Link className={styles.button} href={linkPath}>
          <button className={styles.button}>{linkContent}</button>
        </Link>
      </div>
    </div>
  );
};

export default Button;
