import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setPosition,
  setKeyword,
} from "../store/reducers/searchCondition/Reducer";

import { setSearchType } from "../store/reducers/searhType/Reducer";
import { getStoreInfo } from "../store/reducers/storeInfo/Reducer";
import { searchStore } from "../store/reducers/searchResult/Reducer";

const useMoveTargetStore = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const moveTargetStore = (
    id: number,
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
      setPosition({
        address,
        longitude,
        latitude,
      })
    );
    dispatch(setKeyword(name));
    dispatch(setSearchType("keywordSearch"));
    router.push("/findplace");
  };
  return { moveTargetStore };
};

export default useMoveTargetStore;
