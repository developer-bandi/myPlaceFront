import TagSearch from "./TagSearch";
import useTagSearch from "./TagSearchHook";

const TagSearchContainer = () => {
  const {
    hashtag,
    selectedHashtag,
    selectedCategory,
    dispatchCategory,
    dispatchAddress,
    dispatchHashtag,
    inputRef,
    dispatchSearchStore,
  } = useTagSearch();
  return (
    <TagSearch
      hashtag={hashtag}
      selectedHashtag={selectedHashtag as string[]}
      selectedCategory={selectedCategory as string}
      dispatchCategory={dispatchCategory}
      dispatchAddress={dispatchAddress}
      dispatchHashtag={dispatchHashtag}
      inputRef={inputRef}
      dispatchSearchStore={dispatchSearchStore}
    ></TagSearch>
  );
};

export default TagSearchContainer;
