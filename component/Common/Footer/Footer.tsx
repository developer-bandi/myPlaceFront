import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.MainBlock}>
      <div className={styles.subBlock}>
        <h6 className={styles.title}>MyPlace</h6>
        <p className={styles.content}>
          Copyright 2022. 김상두 all right reserved | email:puki4416@gmail.com |
          github:https://github.com/puki4416
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
