import NameSearch from "./NameSearch";
import useNameSearch from "./NameSearchHook";

const NameSearchContainer = () => {
  const {
    dispatchAddress,
    addressInputRef,
    searchKeywordInputRef,
    dispatchSearchStore,
  } = useNameSearch();

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
