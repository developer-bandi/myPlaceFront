import Image from "next/image";
import MyPageNavigation from "../Common/navigation/MyPageNavigation";
import styles from "./MyReview.module.scss";
import mypage from "../../../../lib/styles/mypage.module.scss";
import searchResultLoading from "../../../../public/searchResultLoading.gif";
import { useIsLabtop } from "../../../../lib/customHook/mediaQuery";

const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/imgs/${src}`;
};

interface MyReviewProps {
  myReviews: {
    content?:
      | {
          id: string;
          content: string;
          StoreName: string;
          Hashtags: [string, string];
          photo: [string];
        }[]
      | undefined;
    error: null | string;
    loading: boolean;
  };
  deleteReview: (id: string) => Promise<void>;
  moveReviewUpdatePage: (id: string) => void;
}

const MyReview = ({
  myReviews,
  deleteReview,
  moveReviewUpdatePage,
}: MyReviewProps) => {
  const isLabtop = useIsLabtop();
  if (myReviews.loading) {
    return (
      <div className={mypage.mainBlock}>
        {isLabtop ? null : <MyPageNavigation />}
        <div className={mypage.subBlock}>
          <h1 className={mypage.title}>작성 후기</h1>
          <div className={mypage.loading}>
            <Image src={searchResultLoading} alt="loading"></Image>
          </div>
        </div>
      </div>
    );
  } else {
    if (myReviews.content === undefined && myReviews.error !== null) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            <div className={mypage.error}>에러발생</div>
          </div>
        </div>
      );
    } else if (myReviews.content?.length === 0) {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            <div className={mypage.noResult}>리뷰 없음</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={mypage.mainBlock}>
          {isLabtop ? null : <MyPageNavigation />}
          <div className={mypage.subBlock}>
            <h1 className={mypage.title}>작성 후기</h1>
            {myReviews.content !== undefined &&
              myReviews.content.map((data) => {
                return (
                  <div className={styles.reviewBlock}>
                    <div className={styles.titleBlock}>
                      <div className={styles.title}>{data.StoreName}</div>
                      <div className={styles.titleRightBlock}>
                        <div
                          className={styles.button}
                          onClick={() => {
                            deleteReview(data.id);
                          }}
                        >
                          삭제
                        </div>
                        <div
                          className={styles.button}
                          onClick={() => {
                            moveReviewUpdatePage(data.id);
                          }}
                        >
                          수정
                        </div>
                      </div>
                    </div>
                    <div className={styles.content}>{data.content}</div>
                    <div className={styles.hashtagListBlock}>
                      {data.Hashtags.map((value) => {
                        return (
                          <div className={styles.hashtag}>#{value[1]}</div>
                        );
                      })}
                    </div>
                    <div className={styles.photoListBlock}>
                      {data.photo.map((src) => {
                        return (
                          <div className={styles.photoBlock}>
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
                  </div>
                );
              })}
            <div></div>
          </div>
        </div>
      );
    }
  }
};
const temp = [
  {
    name: "투썸플레이스",
    content:
      "안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요",
    hashtag: [
      "맛나는",
      "재미있는",
      "밥먹기 좋은",
      "친구랑 가기 좋은",
      "반가운",
      "화사한",
      "맛나는",
      "재미있는",
      "밥먹기 좋은",
      "친구랑 가기 좋은",
      "반가운",
      "화사한",
      "맛나는",
      "재미있는",
      "밥먹기 좋은",
      "친구랑 가기 좋은",
      "반가운",
      "화사한",
    ],
    photo: [
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
    ],
  },
  {
    name: "투썸플레이스",
    content:
      "안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요",
    hashtag: [
      "맛나는",
      "재미있는",
      "밥먹기 좋은",
      "친구랑 가기 좋은",
      "반가운",
      "화사한",
    ],
    photo: [
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
    ],
  },
  {
    name: "투썸플레이스",
    content:
      "안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요",
    hashtag: [
      "맛나는",
      "재미있는",
      "밥먹기 좋은",
      "친구랑 가기 좋은",
      "반가운",
      "화사한",
    ],
    photo: [
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
    ],
  },
  {
    name: "투썸플레이스",
    content:
      "안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요",
    hashtag: [
      "맛나는",
      "재미있는",
      "밥먹기 좋은",
      "친구랑 가기 좋은",
      "반가운",
      "화사한",
    ],
    photo: [
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
      "Annie1654438998515.png",
    ],
  },
];

export default MyReview;
