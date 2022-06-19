import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../../store";
import { setAdress } from "../../../../../store/reducers/hashtagSearchCondition/hashtagSearchConditionReducer";
import { searchStore } from "../../../../../store/reducers/searchResult/searchResultReducer";
import NameSearch from "./NameSearch";

const NameSearchContainer = () => {
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
      dispatch(setAdress({ adress: addressInputRef.current.value }));
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

  return (
    <NameSearch
      dispatchAddress={dispatchAddress}
      addressInputRef={addressInputRef}
      searchKeywordInputRef={searchKeywordInputRef}
      dispatchSearchStore={dispatchSearchStore}
    ></NameSearch>
  );
};

export default NameSearchContainer;
