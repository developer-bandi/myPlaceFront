import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Hashtags from "./Hashtags";

export default {
  title: "FindPlace/StoreInfo/Hashtags",
  component: Hashtags,
} as ComponentMeta<typeof Hashtags>;

const Template: ComponentStory<typeof Hashtags> = (arg) => {
  return (
    <div style={{ width: 340, position: "relative" }}>
      <Hashtags {...arg} />
    </div>
  );
};

export const generalType = Template.bind({});
generalType.args = {
  hashtags: { 맛있는: 4, 깔끔한: 5, 분위기가좋은: 6 },
};
