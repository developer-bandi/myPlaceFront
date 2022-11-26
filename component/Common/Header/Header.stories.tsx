import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./Header";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Common/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (arg) => <Header {...arg} />;

export const IsLoginNotMobile = Template.bind({});
IsLoginNotMobile.args = {
  loginedUser: {
    content: { id: 1, nickname: "test" },
    loading: false,
    error: false,
  },
  serverData: {
    content: [
      {
        id: 1,
        content: "testContent",
        check: true,
        createdAt: "testCreatedAt",
        updatedAt: "testUpdatedAt",
        PostId: 1,
        UserId: 1,
      },
    ],
    loading: true,
    error: false,
  },
  modalStatus: {
    mypage: false,
    notice: false,
  },
  isMobile: false,
  changePageModal: action("changePageModal"),
  changeNoticeModal: action("changeNoticeModal"),
};

export const IsNotLoginNotMoble = Template.bind({});
IsNotLoginNotMoble.args = {
  loginedUser: {
    loading: false,
    error: false,
  },
  serverData: { loading: true, error: false },
  modalStatus: {
    mypage: false,
    notice: false,
  },
  isMobile: false,
};

export const IsLoginMobile = Template.bind({});
IsLoginMobile.args = {
  loginedUser: {
    content: { id: 1, nickname: "test" },
    loading: false,
    error: false,
  },
  serverData: {
    content: [
      {
        id: 1,
        content: "testContent",
        check: true,
        createdAt: "testCreatedAt",
        updatedAt: "testUpdatedAt",
        PostId: 1,
        UserId: 1,
      },
    ],
    loading: true,
    error: false,
  },
  modalStatus: {
    mypage: false,
    notice: false,
  },
  isMobile: true,
  changePageModal: action("changePageModal"),
  changeNoticeModal: action("changeNoticeModal"),
};
IsLoginMobile.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};

export const IsNotLoginMobile = Template.bind({});
IsNotLoginMobile.args = {
  loginedUser: {
    loading: false,
    error: false,
  },
  serverData: { loading: true, error: false },
  modalStatus: {
    mypage: false,
    notice: false,
  },
  isMobile: true,
};
IsNotLoginMobile.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};
