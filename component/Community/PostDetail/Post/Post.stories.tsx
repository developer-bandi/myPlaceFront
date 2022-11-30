import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Post from "./Post";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

export default {
  title: "Community/PostDetail/Post",
  component: Post,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (arg) => (
  <Provider
    store={configureMockStore()({
      userLogin: {
        content: { id: 1, nickname: "test" },
        loading: false,
        error: false,
      },
      postDetail: {
        content: {
          User: { id: 1, nickname: "test" },
          UserId: 1,
          content: "테스트용 컨텐츠",
          createdAt: new Date("2022-11-11").toDateString(),
          id: "1",
          likelist: [1, 2, 3],
          title: "테스트용 제목",
          updatedAt: new Date("2022-11-11").toDateString(),
          viewCount: 100,
        },
      },
    })}
  >
    <Post {...arg} />
  </Provider>
);

export const generalType = Template.bind({});
generalType.args = {
  images: [{ filename: "aaaaa" }],
  content: "테스트용 게시글 입니다. 테스용 게시글 입니다",
};
