import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface AddStorePositionState {
  address: string;
  longitude: string;
  latitude: string;
}

const initialState: AddStorePositionState = {
  address: "",
  longitude: "",
  latitude: "",
};

const AddStorePositionSlice = createSlice({
  name: "addStorePosition",
  initialState,

  reducers: {
    setPosition(state, action: PayloadAction<AddStorePositionState>) {
      state.address = action.payload.address;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const { setPosition } = AddStorePositionSlice.actions;

export default AddStorePositionSlice.reducer;
