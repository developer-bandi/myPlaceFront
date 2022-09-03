import React from "react";
import styles from "./Footer.module.scss";
import {AiFillGithub} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.mainBlock}>
      <div className={styles.subBlock}>
        <h6 className={styles.title}>MyPlace</h6>
        <div className={styles.contentBlock}>
          <div>
            <p>Copyright 2022. 김상두 all right reserved</p>
            <p>E-mail:puki4416@gmail.com</p>
          </div>
          <a href="https://github.com/puki4416" target="_blank">
            <AiFillGithub size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
