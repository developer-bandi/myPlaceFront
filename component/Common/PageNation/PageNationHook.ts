const usePageNation = () => {
  const allowPrevPageSet = ({
    page,
    pageUnit,
  }: {
    page: number;
    pageUnit: number;
  }) => {
    if (page < pageUnit) return false;
    return true;
  };

  const makePrevSetPage = ({
    page,
    pageUnit,
  }: {
    page: number;
    pageUnit: number;
  }) => (Math.floor((page - 1) / pageUnit) - 1) * pageUnit + 1;

  const makePages = ({
    page,
    totalAmount,
    contentUnit,
    pageUnit,
  }: {
    page: number;
    totalAmount: number;
    contentUnit: number;
    pageUnit: number;
  }) => {
    const pageSetOrder = Math.ceil(page / pageUnit) - 1;
    const pageCount = Math.ceil(
      Math.min(
        (totalAmount - pageSetOrder * pageUnit * contentUnit) / contentUnit,
        pageUnit
      )
    );
    const pages = new Array(pageCount)
      .fill(0)
      .map((_, index) => index + 1 + pageSetOrder * 5);

    return pages;
  };

  const allowNextPageSet = ({
    page,
    contentUnit,
    totalAmount,
    pageUnit,
  }: {
    page: number;
    totalAmount: number;
    contentUnit: number;
    pageUnit: number;
  }) => {
    if (Math.ceil(page / pageUnit) * contentUnit * pageUnit < totalAmount)
      return true;
    return false;
  };

  const makeNextSetPage = ({
    page,
    pageUnit,
  }: {
    page: number;
    pageUnit: number;
  }) => Math.ceil(page / pageUnit) * pageUnit + 1;

  return {
    allowPrevPageSet,
    makePrevSetPage,
    makePages,
    allowNextPageSet,
    makeNextSetPage,
  };
};

export default usePageNation;
