import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PostList from "./PostList";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export default {
  title: "Community/PostList",
  component: PostList,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof PostList>;

const Template: ComponentStory<typeof PostList> = (arg) => (
  <PostList {...arg} />
);

const content = {
  count: 10,
  rows: new Array(10).fill(0).map((_, index) => {
    return {
      id: index + 1,
      title: "테스트 제목",
      content: "테스트 내용입니다",
      viewCount: 10,
      createdAt: new Date("2022-11-11").toDateString(),
      nickname: "place",
      comment: 0,
      postlikecount: 1,
    };
  }),
};

export const isLoading = Template.bind({});
isLoading.args = {
  postList: {
    loading: true,
    error: false,
  },
};

export const isError = Template.bind({});
isError.args = {
  postList: {
    loading: false,
    error: true,
  },
};

export const isNoResult = Template.bind({});
isNoResult.args = {
  postList: {
    content: { count: 0, rows: [] },
    loading: false,
    error: false,
  },
};

export const isNormal = Template.bind({});
isNormal.args = {
  postList: {
    content,
    loading: false,
    error: false,
  },
  page: 1,
};
