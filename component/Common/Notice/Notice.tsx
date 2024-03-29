import { noticeListState } from "./NoticeContainer";
import styles from "./Notice.module.scss";
import { GoPrimitiveDot } from "react-icons/go";
import { setDateLatest } from "../../../lib/date";
import Image from "next/image";
import loadingImg from "../../../public/searchResultLoading.gif";
interface NoticeProps {
  serverData: noticeListState;
  checkNotice: (noticeId: number, postId: number) => Promise<void>;
  movePost: (postId: number) => void;
}

const Notice = ({ serverData, checkNotice, movePost }: NoticeProps) => {
  if (serverData.loading) {
    return (
      <div className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <div className={styles.loading}>
            <Image src={loadingImg} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else if (serverData.error) {
    return (
      <div className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <div className={styles.error}>에러가 발생 하였습니다</div>
        </div>
      </div>
    );
  } else if (serverData.content?.length === 0) {
    return (
      <div className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <div className={styles.noContent}>받은 알림이 없습니다</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainBlock}>
        <div className={styles.subBlock}>
          <div className={styles.title}>
            읽지 않은 알림
            <span className={styles.count}>
              {
                serverData.content?.filter((notion) => {
                  if (notion.check) {
                    return false;
                  } else {
                    return true;
                  }
                }).length
              }
            </span>
            개
          </div>
          {serverData.content?.map((notion) => {
            return (
              <div
                className={`${styles.noticeBlock} ${
                  notion.check ? null : styles.check
                }`}
                onClick={() => {
                  notion.check
                    ? movePost(notion.PostId)
                    : checkNotice(notion.id, notion.PostId);
                }}
                key={notion.content}
              >
                <GoPrimitiveDot
                  color={notion.check ? "gray" : "red"}
                  className={styles.dot}
                />
                <div
                  className={`${styles.content} ${
                    notion.check ? null : styles.check
                  }`}
                >
                  {notion.content}
                </div>
                <div
                  className={`${styles.date} ${
                    notion.check ? null : styles.check
                  }`}
                >
                  {setDateLatest(notion.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Notice;
