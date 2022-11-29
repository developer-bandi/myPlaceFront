import { act, renderHook } from "@testing-library/react";
import useBannerHook from "./BannerHook";

describe("Banner Hook 테스트", () => {
  jest.useFakeTimers();
  jest.spyOn(window, "setInterval");
  jest.spyOn(window, "clearInterval");

  it("setInterval test", () => {
    const { result } = renderHook(() => useBannerHook());
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(result.current.carouselNumber).toBe(1);
  });
});
