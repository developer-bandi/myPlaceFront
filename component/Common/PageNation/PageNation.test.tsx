import { renderHook } from "@testing-library/react";
import usePageNation from "./PageNationHook";

describe("Pagenation Hook 테스트", () => {
  describe("allowPrevPageSet 함수 테스트", () => {
    it("활성화 된 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const allowResult = result.current.allowPrevPageSet({
        page: 6,
        pageUnit: 5,
      });

      expect(allowResult).toBe(true);
    });

    it("비활성화 된 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const allowResult = result.current.allowPrevPageSet({
        page: 1,
        pageUnit: 5,
      });

      expect(allowResult).toBe(false);
    });
  });

  describe("makePrevSetPage 함수 테스트", () => {
    it("페이지셋의 처음인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const prevPage = result.current.makePrevSetPage({
        page: 6,
        pageUnit: 5,
      });

      expect(prevPage).toBe(1);
    });

    it("페이지셋의 중간인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const prevPage = result.current.makePrevSetPage({
        page: 8,
        pageUnit: 5,
      });

      expect(prevPage).toBe(1);
    });

    it("페이지셋의 마지막인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const prevPage = result.current.makePrevSetPage({
        page: 10,
        pageUnit: 5,
      });

      expect(prevPage).toBe(1);
    });
  });

  describe("makePages 함수 테스트", () => {
    it("페이지가 일부만 존재하는 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const pages = result.current.makePages({
        page: 1,
        totalAmount: 20,
        contentUnit: 10,
        pageUnit: 5,
      });
      expect(pages).toEqual([1, 2]);
    });

    it("마지막 컨텐츠페이지 인경우", () => {
      const { result } = renderHook(() => usePageNation());
      const pages = result.current.makePages({
        page: 1,
        totalAmount: 50,
        contentUnit: 10,
        pageUnit: 5,
      });
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });

    it("두번째 페이지 뭉치 인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const pages = result.current.makePages({
        page: 6,
        totalAmount: 120,
        contentUnit: 10,
        pageUnit: 5,
      });
      expect(pages).toEqual([6, 7, 8, 9, 10]);
    });

    it("두번째 페이지 뭉치 가 일부만 존재하는 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const pages = result.current.makePages({
        page: 6,
        totalAmount: 55,
        contentUnit: 10,
        pageUnit: 5,
      });
      expect(pages).toEqual([6]);
    });
  });

  describe("allowNextPageSet 함수 테스트", () => {
    it("활성화 된 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const allowResult = result.current.allowNextPageSet({
        page: 1,
        totalAmount: 100,
        contentUnit: 10,
        pageUnit: 5,
      });

      expect(allowResult).toBe(true);
    });

    it("비활성화 된 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const allowResult = result.current.allowNextPageSet({
        page: 1,
        totalAmount: 40,
        contentUnit: 10,
        pageUnit: 5,
      });
      expect(allowResult).toBe(false);
    });
  });

  describe("makeNextSetPage 함수 테스트", () => {
    it("페이지셋의 처음인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const prevPage = result.current.makeNextSetPage({
        page: 1,
        pageUnit: 5,
      });

      expect(prevPage).toBe(6);
    });

    it("페이지셋의 중간인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const prevPage = result.current.makeNextSetPage({
        page: 3,
        pageUnit: 5,
      });

      expect(prevPage).toBe(6);
    });

    it("페이지셋의 마지막인 경우", () => {
      const { result } = renderHook(() => usePageNation());
      const prevPage = result.current.makeNextSetPage({
        page: 5,
        pageUnit: 5,
      });

      expect(prevPage).toBe(6);
    });
  });
});
