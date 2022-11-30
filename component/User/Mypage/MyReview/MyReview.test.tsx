import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import useMyReview from "./MyReviewHook";

jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const routerMock = {
  pathname: "",
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(routerMock);

const axiosMock = axios as jest.Mocked<typeof axios>;
const reviewListMock = {
  count: 1,
  rows: [
    {
      id: "1",
      content: "testContent",
      StoreName: "testStoreName",
      Hashtags: [[1, "test"]] as [number, string][],
      photo: ["test"] as [string],
      createdAt: "testCreatedAt",
    },
  ],
};

describe("MyReview Hook 테스트", () => {
  describe("deleteReview 함수 테스트", () => {
    window.confirm = jest.fn(() => {
      return true;
    });

    it("정상적으로 삭제된경우", async () => {
      axiosMock.delete.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "data",
        })
      );
      window.alert = jest.fn();
      const setServerDataMock = jest.fn();
      const { result } = renderHook(() =>
        useMyReview({
          serverData: { content: reviewListMock, loading: false, error: false },
          setServerData: setServerDataMock,
        })
      );
      await act(async () => {
        await result.current.deleteReview("1");
      });
      expect(window.alert).toBeCalledWith("삭제되었습니다");
      expect(setServerDataMock).toBeCalledWith({
        content: {
          count: 0,
          rows: [],
        },
        loading: false,
        error: false,
      });
    });

    it("에러가 발생한 경우", async () => {
      axiosMock.delete.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "error",
        })
      );
      window.alert = jest.fn();
      const { result } = renderHook(() =>
        useMyReview({
          serverData: { content: reviewListMock, loading: false, error: false },
          setServerData: jest.fn(),
        })
      );
      await act(async () => {
        await result.current.deleteReview("1");
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });

  it("moveReviewUpdatePage 함수 테스트", () => {
    const { result } = renderHook(() =>
      useMyReview({
        serverData: { content: reviewListMock, loading: false, error: false },
        setServerData: jest.fn(),
      })
    );
    act(() => {
      result.current.moveReviewUpdatePage("1");
    });
    expect(routerMock.push).toBeCalledWith("/contribute/updatereview/1");
  });
});
