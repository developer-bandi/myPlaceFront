import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../../../store";
import {
  setCategory,
  addHashTag,
  deleteHashTag,
  setPosition,
} from "../../../../../store/reducers/searchCondition/Reducer";
import {searchStore} from "../../../../../store/reducers/searchResult/Reducer";
import {setSearchType} from "../../../../../store/reducers/searhType/Reducer";

const useTagSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const hashtag = useSelector((state: RootReducer) => state.hashtagAll.content);
  const selectedHashtag = useSelector(
    (state: RootReducer) => state.searchCondition.hashtag
  );
  const selectedCategory = useSelector(
    (state: RootReducer) => state.searchCondition.category
  );
  const settedPosition = useSelector(
    (state: RootReducer) => state.searchCondition.position
  );

  useEffect(() => {
    if (inputRef.current !== null && settedPosition.address !== undefined)
      inputRef.current.value = settedPosition.address;
  }, [settedPosition.address]);

  const dispatchHashtag = (hashtag: string) => {
    if (selectedHashtag?.indexOf(hashtag) == -1) {
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
      dispatch(setPosition({address: inputRef.current.value}));
    }
  };

  const dispatchSearchStore = () => {
    if (
      settedPosition.latitude !== undefined &&
      settedPosition.longitude !== undefined
    ) {
      dispatch(
        searchStore({
          latitude: settedPosition.latitude,
          longitude: settedPosition.longitude,
          selectedHashtag,
        })
      );
      dispatch(setSearchType("hashtagResult"));
    }
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
