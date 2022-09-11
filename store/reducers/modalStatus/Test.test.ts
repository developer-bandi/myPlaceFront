import mypageModalSlice, {setActive} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    active: false,
  };

  it("initial state을 설정한 경우", () => {
    expect(mypageModalSlice(undefined, {type: "unknown"})).toEqual(
      initialState
    );
  });
  it("setActive 액션이 발생한 경우", () => {
    const actual = mypageModalSlice(initialState, setActive());
    expect(actual.active).toBe(true);
  });
  it("HYDRATE 테스트", () => {
    expect(mypageModalSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
