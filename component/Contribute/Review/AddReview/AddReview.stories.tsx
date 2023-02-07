import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddReview from "./AddReview";

export default {
  title: "Contribute/Reivew/AddReview",
  component: AddReview,
} as ComponentMeta<typeof AddReview>;

const Template: ComponentStory<typeof AddReview> = (arg) => (
  <AddReview {...arg} />
);

export const generalType = Template.bind({});
generalType.args = {
  storeInfo: {
    storeInfo: {
      id: 1,
      name: "테스트 스토어",
      tel: "051-1111-2222",
      openingHours: "testOpeningHours",
      address: "부산광역시 금정구 장전동 11-11",
      category: "testCategory",
      updatedAt: new Date(),
      latitude: "testLatitude",
      longitude: "testLongitude",
    },
    Reviews: [],
  },
  taglist: {
    content: {
      testCategory: {
        분위기: [
          ["따듯함", 1, 2],
          ["깔끔함", 1, 2],
          ["조용한", 1, 2],
        ],
      },
    },
    loading: false,
    error: false,
  },
  uploadImg: [],
  selectedHashtag: [],
};
