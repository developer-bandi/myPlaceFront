import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../../../store";
import {setPosition} from "../../../../../store/reducers/searchCondition/Reducer";
import {searchStore} from "../../../../../store/reducers/searchResult/Reducer";

const useNameSearch = () => {
  const dispatch = useDispatch();
  const searchKeywordInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const settedPosition = useSelector(
    (state: RootReducer) => state.searchCondition.position
  );
  const settedKeyWord = useSelector(
    (state: RootReducer) => state.searchCondition.keyword
  );

  useEffect(() => {
    if (
      addressInputRef.current !== null &&
      settedPosition.address !== undefined
    )
      addressInputRef.current.value = settedPosition.address;
  }, [settedPosition.address]);

  useEffect(() => {
    if (searchKeywordInputRef.current !== null && settedKeyWord !== undefined) {
      searchKeywordInputRef.current.value = settedKeyWord;
    }
  }, []);

  const dispatchAddress = () => {
    if (addressInputRef.current !== null) {
      dispatch(setPosition({address: addressInputRef.current.value}));
    }
  };

  const dispatchSearchStore = () => {
    if (
      searchKeywordInputRef.current !== null &&
      settedPosition.latitude !== undefined &&
      settedPosition.longitude !== undefined
    ) {
      dispatch(
        searchStore({
          latitude: settedPosition.latitude,
          longitude: settedPosition.longitude,
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
