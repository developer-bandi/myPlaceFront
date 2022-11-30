import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Hashtag from "./Hashtag";
import { action } from "@storybook/addon-actions";

export default {
  title: "Contribute/Reivew/AddReview/Hashtag",
  component: Hashtag,
} as ComponentMeta<typeof Hashtag>;

const Template: ComponentStory<typeof Hashtag> = (arg) => <Hashtag {...arg} />;

export const generalType = Template.bind({});
generalType.args = {
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
  category: "testCategory",
  selectedHashtag: ["따듯함"],
  changeHashtag: action("changeHashtag"),
};
