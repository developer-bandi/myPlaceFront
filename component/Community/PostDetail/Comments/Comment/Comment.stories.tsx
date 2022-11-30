import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Comment from "./Comment";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/PostDetail/Comments/Comment",
  component: Comment,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (arg) => (
  <div style={{ maxWidth: "1000px" }}>
    <Comment {...arg} />
  </div>
);

export const myComment = Template.bind({});
myComment.args = {
  id: 1,
  nickname: "test",
  date: new Date("2022-11-10").toDateString(),
  userId: 1,
  content: "테스트 중인 내용입니다",
  dispatchDeleteComment: action("dispatchDeleteComment"),
  isMyComment: true,
};

export const otherComment = Template.bind({});
otherComment.args = {
  id: 1,
  nickname: "test",
  date: new Date("2022-11-10").toDateString(),
  userId: 1,
  content: "테스트 중인 내용입니다",
  isMyComment: false,
};
