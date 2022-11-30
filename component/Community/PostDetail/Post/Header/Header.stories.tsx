import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./Header";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/PostDetail/Post/Header",
  component: Header,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (arg) => (
  <div style={{ maxWidth: "1000px" }}>
    <Header {...arg} />
  </div>
);

export const myPost = Template.bind({});
myPost.args = {
  id: "1",
  title: "테스트 제목",
  nickname: "me",
  date: new Date("2022-11-10").toDateString(),
  viewCount: 100,
  dispatchDeletePost: action("dispatchDeletePost"),
  isMyPost: true,
};

export const otherPost = Template.bind({});
otherPost.args = {
  id: "1",
  title: "테스트 제목",
  nickname: "me",
  date: new Date("2022-11-10").toDateString(),
  viewCount: 100,
  dispatchDeletePost: action("dispatchDeletePost"),
  isMyPost: false,
};
