import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Infos from "./Infos";

export default {
  title: "FindPlace/StoreInfo/Infos",
  component: Infos,
} as ComponentMeta<typeof Infos>;

const Template: ComponentStory<typeof Infos> = (arg) => {
  return <Infos {...arg} />;
};

export const isContent = Template.bind({});
isContent.args = {
  tel: "051-123-456",
  address: "부산광역시 금정구 장전동",
  openingHours:
    "월 : 휴무\n화 : 10:00~19:00\n수 : 10:00~19:00\n목 : 10:00~19:00\n금 : 10:00~19:00\n토 : 10:00~19:00\n일 : 10:00~19:00",
};

export const isNoContent = Template.bind({});
isNoContent.args = {
  tel: null,
  address: undefined,
  openingHours: null,
};
