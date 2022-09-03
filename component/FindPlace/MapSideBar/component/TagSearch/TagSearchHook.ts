import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../../../store";
import {
  setCategory,
  addHashTag,
  deleteHashTag,
  setAdress,
} from "../../../../../store/reducers/hashtagSearchCondition/Reducer";
import {searchStore} from "../../../../../store/reducers/searchResult/Reducer";
import {setSearchType} from "../../../../../store/reducers/searhType/Reducer";

const useTagSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const hashtag = useSelector((state: RootReducer) => state.hashtagAll.content);
  const selectedHashtag = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.hashtag
  );
  const selectedCategory = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.category
  );
  const settedAdress = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.adress
  );

  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.value = settedAdress.content;
  }, [settedAdress]);

  const dispatchHashtag = (hashtag: string) => {
    if (selectedHashtag.indexOf(hashtag) == -1) {
      dispatch(addHashTag(hashtag));
    } else {
      dispatch(deleteHashTag(hashtag));
    }
  };

  const dispatchCategory = (category: string) => {
    dispatch(setCategory(category));
  };

  const dispatchAddress = () => {
    if (inputRef.current !== null) {
      dispatch(setAdress({adress: inputRef.current.value}));
    }
  };

  const dispatchSearchStore = () => {
    dispatch(
      searchStore({
        latitude: settedAdress.latitude,
        longitude: settedAdress.longitude,
        selectedHashtag,
      })
    );
    dispatch(setSearchType({type: "hashtag", hashtag: "result"}));
  };

  return {
    hashtag,
    selectedHashtag,
    selectedCategory,
    dispatchCategory,
    dispatchAddress,
    dispatchHashtag,
    inputRef,
    dispatchSearchStore,
  };
};

export default useTagSearch;
