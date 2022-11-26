import PageNation from "./PageNation";
import usePageNation from "./PageNationHook";

export interface PageNationContainerProps {
  page: number;
  changePage: (page: number) => Promise<void>;
  totalAmount: number;
  addStyle?: string;
  pageUnit: number;
  contentUnit: number;
}

const PageNationContainer = ({
  page,
  changePage,
  totalAmount,
  addStyle,
  pageUnit,
  contentUnit,
}: PageNationContainerProps) => {
  const {
    allowPrevPageSet,
    makePrevSetPage,
    makePages,
    allowNextPageSet,
    makeNextSetPage,
  } = usePageNation();

  return (
    <PageNation
      allowPrevPageSet={allowPrevPageSet}
      makePrevSetPage={makePrevSetPage}
      makePages={makePages}
      allowNextPageSet={allowNextPageSet}
      makeNextSetPage={makeNextSetPage}
      page={page}
      changePage={changePage}
      totalAmount={totalAmount}
      addStyle={addStyle}
      pageUnit={pageUnit}
      contentUnit={contentUnit}
    />
  );
};

export default PageNationContainer;
