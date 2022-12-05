import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideBarButton from "./SideBarButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "FindPlace/SideBarButton",
  component: SideBarButton,
} as ComponentMeta<typeof SideBarButton>;

const Template: ComponentStory<typeof SideBarButton> = (arg) => {
  return (
    <SideBarButton
      {...arg}
      mobileFoldChange={action("mobileFoldChange")}
      desktopFoldChange={action("desktopFoldChange")}
    />
  );
};

export const mobileType = Template.bind({});
mobileType.args = {
  isMobile: true,
};

export const foldType = Template.bind({});
foldType.args = {
  modalStatus: {
    search: true,
    storeInfo: false,
  },
  isMobile: false,
};

export const halfActiveType = Template.bind({});
halfActiveType.args = {
  modalStatus: {
    search: false,
    storeInfo: false,
  },
  isMobile: false,
};

export const activeType = Template.bind({});
activeType.args = {
  modalStatus: {
    search: false,
    storeInfo: true,
  },
  isMobile: false,
};
