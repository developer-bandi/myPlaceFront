import { HYDRATE } from "next-redux-wrapper";
import AddStorePositionSlice, { setPosition } from "./Reducer";

describe("리듀서 검증", () => {
  const initialState = {
    address: "",
    longitude: "",
    latitude: "",
  };

  it("initial state 테스트", () => {
    expect(AddStorePositionSlice(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("setPosition 테스트", () => {
    const actual = AddStorePositionSlice(
      initialState,
      setPosition({ address: "test", longitude: "test", latitude: "test" })
    );
    expect(actual.address).toEqual("test");
    expect(actual.latitude).toEqual("test");
    expect(actual.longitude).toEqual("test");
  });
  it("HYDRATE 테스트", () => {
    const actual = AddStorePositionSlice(initialState, { type: HYDRATE });
    expect(actual.address).toEqual("");
    expect(actual.latitude).toEqual("");
    expect(actual.longitude).toEqual("");
  });
});
