import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {type: "hashtagSearch"};

const searchTypeSlice = createSlice({
  name: "searchType",
  initialState,
  reducers: {
    setSearchType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state) => {
      return state;
    },
  },
});

export const {setSearchType} = searchTypeSlice.actions;

export default searchTypeSlice.reducer;
