import styles from "./Hashtags.module.scss";

interface HashtagsProps {
  hashtags?: {
    [index: string]: number;
  };
}

const Hashtags = ({ hashtags }: HashtagsProps) => {
  return (
    <div className={styles.tagListBlock}>
      {hashtags !== undefined
        ? Object.keys(hashtags)
            .sort(function (a, b) {
              if (hashtags !== undefined) {
                return hashtags[b] - hashtags[a];
              } else {
                return 0;
              }
            })
            .map((tag) => {
              return (
                <div className={styles.tag}>
                  #{tag}
                  <span className={styles.tagCount}>
                    {hashtags !== undefined ? hashtags[tag] : null}
                  </span>
                </div>
              );
            })
        : null}
    </div>
  );
};

export default Hashtags;
