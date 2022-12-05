import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Buttons from "./Buttons";

export default {
  title: "FindPlace/StoreInfo/Buttons",
  component: Buttons,
} as ComponentMeta<typeof Buttons>;

const Template: ComponentStory<typeof Buttons> = (arg) => {
  return <Buttons {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  id: 1,
};
