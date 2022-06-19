import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosGetMyBookMark } from "../../../../lib/commonFn/api";
import {
  setAdress,
  setKeyword,
} from "../../../../store/reducers/hashtagSearchCondition/hashtagSearchConditionReducer";
import { searchStore } from "../../../../store/reducers/searchResult/searchResultReducer";
import { setSearchType } from "../../../../store/reducers/SetSearhType/SearchTypeReducer";
import { getStoreInfo } from "../../../../store/reducers/storeInfo/storeInfoReducer";
import MyPageBookMark from "./MyBookMark";

const MyBookMarkContainer = () => {
  const [bookMarkData, setBookMarkData] = useState<{
    content?: {
      id: string;
      name: string;
      latitude: string;
      longitude: string;
      address: string;
      category: string;
    }[];
    loading: boolean;
    error: string | null;
  }>({ loading: true, error: null });
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    axiosGetMyBookMark()
      .then((res) => {
        setBookMarkData({ content: res.data, loading: false, error: null });
      })
      .catch((error) => {
        setBookMarkData({ loading: false, error });
      });
  }, []);

  const searchStoreInfo = (
    id: string,
    name: string,
    latitude: string,
    longitude: string,
    address: string
  ) => {
    dispatch(
      searchStore({
        latitude,
        longitude,
        searchKeyword: name,
      })
    );
    dispatch(getStoreInfo(id));
    dispatch(
      setAdress({
        adress: address,
        longitude,
        latitude,
      })
    );
    dispatch(setKeyword(name));
    dispatch(setSearchType({ type: "name", hashtag: "search" }));
    router.push("/findplace");
  };

  return (
    <MyPageBookMark
      userBookMark={bookMarkData}
      searchStoreInfo={searchStoreInfo}
    ></MyPageBookMark>
  );
};

export default MyBookMarkContainer;
