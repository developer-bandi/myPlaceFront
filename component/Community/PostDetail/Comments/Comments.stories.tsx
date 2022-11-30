import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Comments from "./Comments";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

export default {
  title: "Community/PostDetail/Comments",
  component: Comments,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Comments>;

const Template: ComponentStory<typeof Comments> = (arg) => (
  <div style={{ maxWidth: "1000px" }}>
    <Provider
      store={configureMockStore()({
        userLogin: {
          content: { id: 1, nickname: "test" },
          loading: false,
          error: false,
        },
      })}
    >
      <Comments {...arg} />
    </Provider>
  </div>
);

export const generalType = Template.bind({});
generalType.args = {
  comments: [
    {
      PostId: 1,
      id: 1,
      User: {
        id: 1,
        nickname: "test",
      },
      UserId: 1,
      content: "너무 재미있는 포스트입니다",
      createdAt: new Date("2022-11-10").toDateString(),
      updatedAt: new Date("2022-11-10").toDateString(),
    },
    {
      PostId: 1,
      id: 2,
      User: {
        id: 2,
        nickname: "other",
      },
      UserId: 2,
      content: "많은 도움이 되었습니다 하트 누르고 갑니다",
      createdAt: new Date("2022-11-10").toDateString(),
      updatedAt: new Date("2022-11-10").toDateString(),
    },
  ],
};
