import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../../../store";
import {setAdress} from "../../../../../store/reducers/hashtagSearchCondition/Reducer";
import {searchStore} from "../../../../../store/reducers/searchResult/Reducer";

const useNameSearch = () => {
  const dispatch = useDispatch();
  const searchKeywordInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const settedAdress = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.adress
  );
  const settedKeyWord = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.keyword
  );

  useEffect(() => {
    if (addressInputRef.current !== null)
      addressInputRef.current.value = settedAdress.content;
  }, [settedAdress]);

  useEffect(() => {
    if (searchKeywordInputRef.current !== null) {
      searchKeywordInputRef.current.value = settedKeyWord;
    }
  }, []);

  const dispatchAddress = () => {
    if (addressInputRef.current !== null) {
      dispatch(setAdress({adress: addressInputRef.current.value}));
    }
  };

  const dispatchSearchStore = () => {
    if (searchKeywordInputRef.current !== null) {
      dispatch(
        searchStore({
          latitude: settedAdress.latitude,
          longitude: settedAdress.longitude,
          searchKeyword: searchKeywordInputRef.current.value,
        })
      );
    }
  };

  return {
    dispatchAddress,
    addressInputRef,
    searchKeywordInputRef,
    dispatchSearchStore,
  };
};

export default useNameSearch;
