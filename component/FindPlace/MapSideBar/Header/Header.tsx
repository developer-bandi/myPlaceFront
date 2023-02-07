import styles from "./Header.module.scss";

interface HeaderProps {
  changeSidebarStatus: (status: string) => void;
  searchType: string;
}

const Header = ({ searchType, changeSidebarStatus }: HeaderProps) => {
  return (
    <div className={styles.mainBlock}>
      {[
        { en: "hashtag", kr: "해시태그로 검색하기" },
        { en: "keyword", kr: "키워드로 검색하기" },
      ].map((type) => {
        return (
          <div
            className={`${styles.button} ${
              searchType.indexOf(type.en) > -1 ? styles.selected : ""
            }`}
            onClick={() => {
              changeSidebarStatus(`${type.en}Search`);
            }}
            key={type.kr}
          >
            {type.kr}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
