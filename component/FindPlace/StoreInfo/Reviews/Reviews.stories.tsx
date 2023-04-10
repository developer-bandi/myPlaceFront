import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Reviews from "./Reviews";
import { loader } from "../../../../lib/loader";

export default {
  title: "FindPlace/StoreInfo/Reviews",
  component: Reviews,
} as ComponentMeta<typeof Reviews>;

const Template: ComponentStory<typeof Reviews> = (arg) => {
  return (
    <div style={{ width: 340 }}>
      <Reviews {...arg} />
    </div>
  );
};

const makeUrl = loader({ width: 740, height: 300 });

export const generalType = Template.bind({});
generalType.args = {
  reviews: [
    {
      content: "테스트 댓글 입니다",
      user: "place",
      date: "2022-11-11",
      Hashtags: ["깨끗한", "깔끔한"],
      photos: [
        makeUrl({
          src: "/place/16625346494021491388606",
        }),
      ],
    },
    {
      content: "테스트 댓글 입니다",
      user: "place",
      date: "2022-11-11",
      Hashtags: ["깨끗한", "깔끔한"],
      photos: [
        makeUrl({
          src: "/place/16625346494021491388606",
        }),
      ],
    },
    {
      content: "테스트 댓글 입니다",
      user: "place",
      date: "2022-11-11",
      Hashtags: ["깨끗한", "깔끔한"],
      photos: [
        makeUrl({
          src: "/place/16625346494021491388606",
        }),
      ],
    },
  ],
};
