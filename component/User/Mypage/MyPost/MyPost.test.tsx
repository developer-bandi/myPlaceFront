import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import useMyPost from "./MyPostHook";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const routerMock = {
  pathname: "",
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(routerMock);

describe("MyPost Hook 테스트", () => {
  it("movePostDetailPage 함수 테스트", () => {
    const { result } = renderHook(() => useMyPost());
    act(() => {
      result.current.movePostDetailPage(1);
    });
    expect(routerMock.push).toBeCalledWith("/community/postdetail/1");
  });
});
