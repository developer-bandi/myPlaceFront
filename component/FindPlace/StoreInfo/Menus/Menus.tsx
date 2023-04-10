import Image from "next/image";
import { loader } from "../../../../lib/loader";
import styles from "./Menus.module.scss";

interface MenusProps {
  menus?: string[];
}

const Menus = ({ menus }: MenusProps) => {
  if (menus === undefined || menus.length === 0) return null;
  return (
    <div className={styles.mainBlock}>
      <h4 className={styles.title}>메뉴</h4>
      <div className={styles.menuBlock}>
        {menus.map((src) => {
          return (
            <div className={styles.menuImgBlock} key={src}>
              <Image
                loader={loader({ width: 200, height: 200 })}
                src={src}
                width="105px"
                height="105px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menus;
