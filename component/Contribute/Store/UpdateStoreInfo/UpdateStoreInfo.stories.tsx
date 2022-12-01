import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UpdateStoreInfo from "./UpdateStoreInfo";

export default {
  title: "Contribute/Store/UpdateStoreInfo",
  component: UpdateStoreInfo,
} as ComponentMeta<typeof UpdateStoreInfo>;

const Template: ComponentStory<typeof UpdateStoreInfo> = (arg) => (
  <UpdateStoreInfo {...arg} />
);

export const generalType = Template.bind({});
generalType.args = {
  existInfo: {
    storeInfo: {
      id: 1,
      name: "테스트 스토어",
      tel: "051-123-456",
      openingHours: "연중 무휴",
      address: "부산광역시 금정구",
      category: "카페",
      updatedAt: new Date(),
      latitude: "test",
      longitude: "test",
    },
  },
  uploadMenuImg: [],
  uploadMainImg: [],
  existMenuImg: undefined,
  existMainImg: undefined,
  loading: false,
};
