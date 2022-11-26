import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyPageModal from "./MyPageModal";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Common/MyPageModal",
  component: MyPageModal,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof MyPageModal>;

const Template: ComponentStory<typeof MyPageModal> = (arg) => (
  <MyPageModal {...arg} />
);

export const IsMobile = Template.bind({});
IsMobile.args = {
  isMobile: true,
  userLogout: action("userLogout"),
  modalActvieChange: action("modalActvieChange"),
};
IsMobile.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};

export const IsNotMobile = Template.bind({});
IsNotMobile.args = {
  isMobile: false,
  userLogout: action("userLogout"),
};
