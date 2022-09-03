import {useIsLabtopOrTabletOrMobile} from "../../../../lib/customHook/mediaQuery";
import useMoveTargetStore from "../../../../lib/customHook/moveTargetStore";
import useMypage from "../../../../lib/customHook/mypage";
import MyPageBookMark from "./MyBookMark";

export interface bookMarkState {
  content?: {
    count: number;
    rows: {
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
    }[];
  };
  loading: boolean;
  error: boolean;
}

const MyBookMarkContainer = () => {
  const {serverData, changePage, page} = useMypage("bookmark");
  const {moveTargetStore} = useMoveTargetStore();
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
