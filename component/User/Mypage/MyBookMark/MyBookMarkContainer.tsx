import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import useMoveTargetStore from "../../../../hooks/moveTargetStore";
import useMypage from "../../../../hooks/mypage";
import MyPageBookMark from "./MyBookMark";

export interface bookMarkContentRow {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  category: string;
  photo?: string;
  viewCount: number;
  bookmark: number;
  review: number;
}

export interface bookMarkState {
  content?: {
    count: number;
    rows: bookMarkContentRow[];
  };
  loading: boolean;
  error: boolean;
}

const MyBookMarkContainer = () => {
  const { serverData, changePage, page } = useMypage("bookmark");
  const { moveTargetStore } = useMoveTargetStore();
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();

  return (
    <MyPageBookMark
      bookMarkState={serverData as bookMarkState}
      moveTargetStore={moveTargetStore}
      page={page}
      changePage={changePage}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    ></MyPageBookMark>
  );
};

export default MyBookMarkContainer;
