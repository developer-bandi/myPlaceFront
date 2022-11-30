import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HashTag from "./HashTag";

export default {
  title: "Contribute/Reivew/UpdateReview/HashTag",
  component: HashTag,
} as ComponentMeta<typeof HashTag>;

const Template: ComponentStory<typeof HashTag> = (arg) => {
  const [selectedHashtag, setSelectedHashtag] = useState<string[]>(["따듯함"]);
  return (
    <HashTag
      {...arg}
      selectedHashtag={selectedHashtag}
      changeHashtag={(hashtag) => {
        setSelectedHashtag([...selectedHashtag, hashtag]);
      }}
    />
  );
};

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
  storeInfo: {
    category: "testCategory",
    name: "test",
    address: "test",
  },
};
