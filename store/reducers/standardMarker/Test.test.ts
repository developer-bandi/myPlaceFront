import mypageModalSlice, {setClickPossible, setClicked} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    clickPossible: true,
    clicked: false,
  };

  it("initial state을 설정한 경우", () => {
    expect(mypageModalSlice(undefined, {type: "unknown"})).toEqual(
      initialState
    );
  });

  it("setClickPossible 액션이 발생한 경우", () => {
    const actual = mypageModalSlice(initialState, setClickPossible(false));
    expect(actual.clickPossible).toBe(false);
  });

  it("setClicked 액션이 발생한 경우", () => {
    const actual = mypageModalSlice(initialState, setClicked(true));
    expect(actual.clickPossible).toBe(true);
  });

  it("HYDRATE 테스트", () => {
    expect(mypageModalSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
