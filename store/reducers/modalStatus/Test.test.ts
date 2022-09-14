import mypageModalSlice, {setMypage, setNotice} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    mypage: false,
    notice: false,
  };

  it("initial state을 설정한 경우", () => {
    expect(mypageModalSlice(undefined, {type: "unknown"})).toEqual(
      initialState
    );
  });
  it("setMypage 액션이 발생한 경우", () => {
    const actual = mypageModalSlice(initialState, setMypage());
    expect(actual.mypage).toBe(true);
  });
  it("setNotice 액션이 발생한 경우", () => {
    const actual = mypageModalSlice(initialState, setNotice());
    expect(actual.notice).toBe(true);
  });
  it("HYDRATE 테스트", () => {
    expect(mypageModalSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
