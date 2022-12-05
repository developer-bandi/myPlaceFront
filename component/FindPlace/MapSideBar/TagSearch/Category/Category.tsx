import styles from "./Category.module.scss";

interface CategoryProps {
  selectedCategory: string;
  dispatchCategory: (category: string) => void;
}

const Category = ({ selectedCategory, dispatchCategory }: CategoryProps) => {
  return (
    <div>
      <ul className={styles.mainBlock}>
        {["카페", "식당", "주점"].map((data: string, index: number) => {
          return (
            <li
              className={`${styles.category} ${
                selectedCategory === data ? styles.selected : ""
              }`}
              key={data}
              onClick={() => {
                dispatchCategory(data);
              }}
            >
              {data}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
