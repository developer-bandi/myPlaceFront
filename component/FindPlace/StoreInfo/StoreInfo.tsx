import styles from "./StoreInfo.module.scss";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { storeInfoType } from "../../../lib/apitype/search";
import { useIsMobile } from "../../../lib/customHook/mediaQuery";

interface StoreInfoProps {
  store: { content: storeInfoType };
  postBookMark: (StoreId: number) => Promise<void>;
  deleteBookMark: (StoreId: number) => Promise<void>;
  deleteStoreTab: () => void;
}

const myLoader = ({ src }: { src: string }) => {
  return `http://localhost:8001/imgs/${src}`;
};

const StoreInfo = ({
  store,
  postBookMark,
  deleteBookMark,
  deleteStoreTab,
}: StoreInfoProps) => {
  const isMobile = useIsMobile();
  if (Object.keys(store.content).length === 0) {
    return null;
  } else if (store.content.storeInfo !== undefined) {
    return (
      <>
        <section className={styles.mainBlock}>
          <div className={styles.titleBlock}>
            {isMobile ? (
              <button onClick={deleteStoreTab} className={styles.moveList}>
                <AiOutlineLeft size={"25"} />
              </button>
            ) : null}
            <h3 className={styles.storeName}>{store.content.storeInfo.name}</h3>
            <p className={styles.category}>
              {store.content.storeInfo.category}
            </p>
            {store.content.bookmark ? (
              <BsBookmarkFill
                className={styles.bookmarkIcon}
                onClick={() => {
                  if (store.content.storeInfo !== undefined) {
                    deleteBookMark(store.content.storeInfo.id);
                  }
                }}
              />
            ) : (
              <FaRegBookmark
                className={styles.bookmarkIcon}
                onClick={() => {
                  if (store.content.storeInfo !== undefined) {
                    postBookMark(store.content.storeInfo.id);
                  }
                }}
              />
            )}
          </div>
          <div className={styles.buttonBlock}>
            <button className={styles.contributeButton}>
              <Link href={`/contribute/addreview`}>후기 등록</Link>
            </button>
            <button className={styles.contributeButton}>
              <Link
                href={`/contribute/updatestoreposition/${store.content.storeInfo.id}`}
              >
                위치 수정
              </Link>
            </button>
            <button className={styles.contributeButton}>
              <Link href={`/contribute/updatestoreinfo`}>정보 수정</Link>
            </button>
          </div>
          <div className={styles.infoBlock}>
            <h4 className={styles.subTitle}>정보</h4>
            <p className={styles.infoContentBlock}>
              <BsFillTelephoneFill size={18} className={styles.icon} />
              {store.content.storeInfo.tel === null ||
              store.content.storeInfo.tel === ""
                ? "정보없음"
                : store.content.storeInfo.tel}
            </p>
            <p className={styles.infoContentBlock}>
              <GiPositionMarker size={20} className={styles.icon} />
              {store.content.storeInfo.address === undefined
                ? "정보없음"
                : store.content.storeInfo.address}
            </p>
            <p className={styles.infoContentBlock}>
              <div>
                <BiTimeFive size={20} className={styles.icon} />
              </div>

              {store.content.storeInfo.openingHours === null ? (
                <p>정보없음</p>
              ) : (
                <pre>{store.content.storeInfo.openingHours}</pre>
              )}
            </p>
          </div>
          {store.content.Menus?.length !== 0 ? (
            <div className={styles.menuListBlock}>
              <h4 className={styles.subTitle}>메뉴</h4>
              <div className={styles.menuBlock}>
                {store.content.Menus !== undefined
                  ? store.content.Menus.map((src) => {
                      return (
                        <div className={styles.menuImgBlock}>
                          <Image
                            loader={myLoader}
                            src={`/${src}`}
                            className={styles.menuImg}
                            width="105px"
                            height="105px"
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : null}
          <div className={styles.reviewBlock}>
            <h4 className={styles.subTitle}>후기</h4>
            <div className={styles.tagListBlock}>
              {store.content.hashtags !== undefined
                ? Object.keys(store.content.hashtags)
                    .sort(function (a, b) {
                      if (store.content.hashtags !== undefined) {
                        return (
                          store.content.hashtags[b] - store.content.hashtags[a]
                        );
                      } else {
                        return 0;
                      }
                    })
                    .map((tag) => {
                      return (
                        <div className={styles.tag}>
                          #{tag}
                          {store.content.hashtags !== undefined
                            ? store.content.hashtags[tag]
                            : null}
                        </div>
                      );
                    })
                : null}
            </div>
            <div className={styles.commentListBlock}>
              {store.content.Reviews?.length !== 0 ? (
                store.content.Reviews?.map((review) => {
                  return (
                    <div className={styles.commentBlock} key={review.content}>
                      <div className={styles.commentInfo}>
                        <div className={styles.nickname}>{review.user}</div>
                        <div className={styles.date}>{review.date}</div>
                      </div>
                      <div className={styles.imgBlock}>
                        {review.photos.map((src) => {
                          return (
                            <div className={styles.imgs}>
                              <Image
                                loader={myLoader}
                                src={`/${src}`}
                                width="100px"
                                height="100px"
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className={styles.commentContent}>
                        {review.content}
                      </div>
                      <div className={styles.tagListBlock}>
                        {review.Hashtags.map((hashtagName: string) => {
                          return (
                            <div className={styles.commentTag}>
                              #{hashtagName}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className={styles.noReview}>첫 후기를 등록해 보세요!</p>
              )}
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return null;
  }
};

export default StoreInfo;
