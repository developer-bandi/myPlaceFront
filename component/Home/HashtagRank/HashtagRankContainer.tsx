import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import { getHashtagRank } from "../../../store/reducers/hashtagRank/hashtagRankReducer";
import HashtagRank from "./HashtagRank";

const HashtagRankContainer = () => {
  const dispatch = useDispatch();
  const hashtagRankData = useSelector(
    (state: RootReducer) => state.hashtagRank
  );

  useEffect(() => {
    dispatch(getHashtagRank());
  }, []);

  return <HashtagRank hashtagRankData={hashtagRankData}></HashtagRank>;
};

export default HashtagRankContainer;
