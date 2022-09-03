import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {
  setAdress,
  setKeyword,
} from "../../store/reducers/hashtagSearchCondition/Reducer";
import {searchStore} from "../../store/reducers/searchResult/Reducer";
import {setSearchType} from "../../store/reducers/searhType/Reducer";
import {getStoreInfo} from "../../store/reducers/storeInfo/Reducer";

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
      setAdress({
        adress: address,
        longitude,
        latitude,
      })
    );
    dispatch(setKeyword(name));
    dispatch(setSearchType({type: "name", hashtag: "search"}));
    router.push("/findplace");
  };
  return {moveTargetStore};
};

export default useMoveTargetStore;
