import styles from "./StoreInfo.module.scss";
import {BsFillTelephoneFill} from "react-icons/bs";
import {GiPositionMarker} from "react-icons/gi";
import {BiTimeFive} from "react-icons/bi";
import {FaRegBookmark} from "react-icons/fa";
import {BsBookmarkFill} from "react-icons/bs";
import {AiOutlineLeft} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import {setDateLatest} from "../../../lib/commonFn/date";
import {storeInfoState} from "../../../store/reducers/storeInfo/Reducer";
import {SideBarFoldState} from "../../../store/reducers/sideBarFold/Reducer";

interface StoreInfoProps {
  store: storeInfoState;
  postBookMark: (StoreId: number) => Promise<void>;
  deleteBookMark: (StoreId: number) => Promise<void>;
  deleteStoreTab: () => void;
  modalStatus: SideBarFoldState;
  isMobile: boolean;
}

const mainLoader = ({src}: {src: string}) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_740,h_300${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
};

const miniLoader = ({src}: {src: string}) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/w_200,h_200${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
};

const StoreInfo = ({
  store,
  postBookMark,
  deleteBookMark,
  deleteStoreTab,
  modalStatus,
  isMobile,
}: StoreInfoProps) => {
  if (store.error) {
    return (
      <section
        className={`${styles.mainBlock} ${
          modalStatus.mobile.searchStoreInfo ? styles.fold : styles.full
        }`}
        data-testid="error"
      >
        <div className={styles.message}>에러가 발생하였습니다</div>
      </section>
    );
  } else if (store.loading) {
    return (
      <section
        className={`${styles.mainBlock} ${
          modalStatus ? styles.fold : styles.full
        }`}
        data-testid="loading"
      >
        <div className={styles.loadingBlock}>
          <Image
            src="/searchResultLoading.gif"
            alt="searchImg"
            layout="fill"
            objectFit="contain"
            priority={true}
          ></Image>
        </div>
      </section>
    );
  } else if (store.content === undefined || modalStatus.desktop.search) {
    return null;
  } else if (store.content?.storeInfo !== undefined) {
    return (
      <section
        className={`${styles.mainBlock} ${
          modalStatus ? styles.fold : styles.full
        }`}
        data-testid="result"
      >
        {store.content.mainPhoto !== undefined ? (
          <div className={styles.mainImgBlock}>
            <Image
              loader={mainLoader}
              src={`/${store.content.mainPhoto}`}
              layout="fill"
              object-fit="cover"
            />
          </div>
        ) : null}
        <div className={styles.titleBlock}>
          {isMobile ? (
            <button
              onClick={deleteStoreTab}
              className={styles.moveList}
              data-testid="deleteStoreTab"
            >
              <AiOutlineLeft size={"25"} />
            </button>
          ) : null}
          <h3 className={styles.storeName}>{store.content.storeInfo.name}</h3>
          <p className={styles.category}>{store.content.storeInfo.category}</p>
          {store.content.bookmark ? (
            <BsBookmarkFill
              className={styles.bookmarkIcon}
              onClick={() => {
                if (store.content?.storeInfo !== undefined) {
                  deleteBookMark(store.content.storeInfo.id);
                }
              }}
            />
          ) : (
            <FaRegBookmark
              className={styles.bookmarkIcon}
              onClick={() => {
                if (store.content?.storeInfo !== undefined) {
                  postBookMark(store.content.storeInfo.id);
                }
              }}
              data-testid="postBookMark"
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
          <div className={styles.infoContentBlock}>
            <div>
              <BiTimeFive size={20} className={styles.icon} />
            </div>
            {store.content.storeInfo.openingHours === "" ||
            store.content.storeInfo.openingHours === null ? (
              <p>정보없음</p>
            ) : (
              <p className={styles.openingHours}>
                {store.content.storeInfo.openingHours}
              </p>
            )}
          </div>
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
                          loader={miniLoader}
                          src={`/${src}`}
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
                    if (store.content?.hashtags !== undefined) {
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
                        <span className={styles.tagCount}>
                          {store.content?.hashtags !== undefined
                            ? store.content.hashtags[tag]
                            : null}
                        </span>
                      </div>
                    );
                  })
              : null}
          </div>
          <div className={styles.commentListBlock}>
            {store.content.Reviews?.length !== 0 ? (
              store.content.Reviews?.map((review, index) => {
                return (
                  <div
                    className={styles.commentBlock}
                    key={`${review.content}${index}`}
                  >
                    <div className={styles.commentInfo}>
                      <div className={styles.nickname}>{review.user}</div>
                      <div className={styles.date}>
                        {setDateLatest(review.date)}
                      </div>
                    </div>
                    {review.photos.length !== 0 ? (
                      <div className={styles.imgBlock}>
                        {review.photos.map((src) => {
                          return (
                            <div className={styles.imgs}>
                              <Image
                                loader={miniLoader}
                                src={`/${src}`}
                                width="100px"
                                height="100px"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

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
    );
  } else {
    return null;
  }
};

export default StoreInfo;
