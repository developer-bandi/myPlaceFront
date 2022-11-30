import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PostDetail from "./PostDetail";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

export default {
  title: "Community/PostDetail",
  component: PostDetail,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof PostDetail>;

const Template: ComponentStory<typeof PostDetail> = () => (
  <Provider
    store={configureMockStore()({
      userLogin: {
        content: { id: 1, nickname: "test" },
        loading: false,
        error: false,
      },
      postDetail: {
        content: {
          Comments: [
            {
              PostId: 1,
              User: {
                id: 1,
                nickname: "test",
              },
              UserId: 1,
              content: "test댓글",
              createdAt: new Date(),
              id: 1,
              updatedAt: new Date(),
            },
          ],
          User: { id: 1, nickname: "test" },
          UserId: 1,
          content: "테스트용 컨텐츠",
          createdAt: new Date("2022-11-11").toDateString(),
          id: "1",
          likelist: [1, 2, 3],
          title: "테스트용 제목",
          updatedAt: new Date("2022-11-11").toDateString(),
          viewCount: 100,
          Photos: [{ filename: "aaaaa" }],
        },
      },
    })}
  >
    <PostDetail />
  </Provider>
);

export const generalType = Template.bind({});
