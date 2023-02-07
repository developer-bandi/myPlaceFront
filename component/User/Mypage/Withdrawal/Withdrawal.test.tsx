import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import Withdrawal from "./Withdrawal";
import useWithdrawal from "./WithdrawalHook";

jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  pathname: "",
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Withdrawal Hook 테스트", () => {
  describe("withdrawalButton 함수 테스트", () => {
    it("정상적으로 삭제된경우", async () => {
      mockedAxios.delete.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "data",
        })
      );
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
      mockedAxios.delete.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "error",
        })
      );
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
