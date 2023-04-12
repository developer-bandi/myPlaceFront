import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import useWithdrawal from "./WithdrawalHook";

let status = {
  delete: 200,
};
jest.mock("axios", () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      delete: jest.fn(() => {
        if (status.delete === 200) {
          return Promise.resolve({
            status: 200,
            data: "data",
          });
        }
        if (status.delete === 500) {
          return Promise.reject({
            status: 500,
            data: "에러 발생",
          });
        }
      }),
    }),
  };
});

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  pathname: "",
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("Withdrawal Hook 테스트", () => {
  describe("withdrawalButton 함수 테스트", () => {
    it("정상적으로 삭제된경우", async () => {
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      const { result } = renderHook(() => useWithdrawal());
      await act(async () => {
        await result.current.withdrawalButton();
      });
      expect(window.alert).toBeCalledWith("회원탈퇴되었습니다");
      expect(mockRouter.push).toBeCalledWith("/");
    });

    it("에러가 발생한 경우", async () => {
      status.delete = 500;
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      const { result } = renderHook(() => useWithdrawal());
      await act(async () => {
        await result.current.withdrawalButton();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });

  it("disagreeButton 함수 테스트", () => {
    window.alert = jest.fn();
    const { result } = renderHook(() => useWithdrawal());
    act(() => {
      result.current.disagreeButton();
    });
    expect(mockRouter.push).toBeCalledWith("/");
  });
});
