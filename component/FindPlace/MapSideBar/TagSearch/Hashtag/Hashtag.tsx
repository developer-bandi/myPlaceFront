import React from "react";
import styles from "./Hashtag.module.scss";

interface HashtagProps {
  hashtag:
    | {
        [index: string]: {
          [index: string]: [string, number, number][];
        };
      }
    | undefined;
  selectedCategory: string;
  selectedHashtag: string[];
  dispatchHashtag: (hashtag: string) => void;
}

const Hashtag = ({
  hashtag,
  selectedCategory,
  selectedHashtag,
  dispatchHashtag,
}: HashtagProps) => {
  return (
    <section className={styles.tagscontainer} key={"tagscontainer"}>
      {Object.keys(hashtag !== undefined ? hashtag[selectedCategory] : {}).map(
        (subject, index: number) => {
          return (
            <React.Fragment key={subject}>
              <div className={styles.title}>{subject}</div>
              <ul className={styles.hashtagListBlock} key={index}>
                {(hashtag !== undefined ? hashtag[selectedCategory] : {})[
                  subject
                ].map((data, index) => {
                  return (
                    <li
                      className={`${styles.hashtag} ${
                        selectedHashtag.indexOf(data[0]) !== -1
                          ? styles.selected
                          : ""
                      }`}
                      key={data[0]}
                      onClick={() => {
                        dispatchHashtag(data[0]);
                      }}
                    >
                      #{data[0]}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        }
      )}
    </section>
  );
};

export default Hashtag;
