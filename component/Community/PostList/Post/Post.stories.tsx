import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Post from "./Post";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/PostList/Post",
  component: Post,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (arg) => <Post {...arg} />;

const content = {
  id: 1,
  title: "테스트 제목",
  content: "테스트용 본문 입니다",
  viewCount: 10,
  createdAt: "2022-11-11",
  nickname: "place",
  comment: 0,
  postlikecount: 1,
};

export const generalType = Template.bind({});
generalType.args = {
  content,
  movePostDetailPage: action("movePostDetailPage"),
};
