import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface hashtagSearchConditionState {
  category: string;
  adress: {
    content: string;
    mapClick: boolean;
    longitude: string;
    latitude: string;
  };
  hashtag: string[];
  keyword: string;
}

const initialState: hashtagSearchConditionState = {
  category: "카페",
  adress: {content: "", mapClick: false, longitude: "", latitude: ""},
  hashtag: [],
  keyword: "",
};

const hashtagSearchConditionSlice = createSlice({
  name: "hashtagSearchCondition",
  initialState,

  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.hashtag = [];
    },

    setAdress(
      state,
      action: PayloadAction<{
        adress?: string;
        longitude?: string;
        latitude?: string;
      }>
    ) {
      if (action.payload.adress !== undefined)
        state.adress.content = action.payload.adress;
      if (action.payload.longitude !== undefined)
        state.adress.longitude = action.payload.longitude;
      if (action.payload.latitude !== undefined)
        state.adress.latitude = action.payload.latitude;
    },

    setMarkerClickStatus(state, action: PayloadAction<boolean>) {
      state.adress.mapClick = action.payload;
    },

    addHashTag(state, action: PayloadAction<string>) {
      state.hashtag.push(action.payload);
    },
    deleteHashTag(state, action: PayloadAction<string>) {
      state.hashtag.splice(state.hashtag.indexOf(action.payload), 1);
    },
    initializeCondition(state) {
      state.category = initialState.category;
      state.adress = initialState.adress;
      state.hashtag = initialState.hashtag;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state;
    },
  },
});

export const {
  setCategory,
  setAdress,
  setMarkerClickStatus,
  addHashTag,
  deleteHashTag,
  initializeCondition,
  setKeyword,
} = hashtagSearchConditionSlice.actions;

export default hashtagSearchConditionSlice.reducer;
