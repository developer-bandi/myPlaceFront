import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MapClickButton from "./MapClickButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "FindPlace/MapClickButton",
  component: MapClickButton,
} as ComponentMeta<typeof MapClickButton>;

const Template: ComponentStory<typeof MapClickButton> = (arg) => {
  return (
    <MapClickButton
      {...arg}
      changeClickPossible={action("changeClickPossible")}
    />
  );
};

export const activeType = Template.bind({});
activeType.args = {
  clickActive: false,
};

export const unActiveType = Template.bind({});
unActiveType.args = {
  clickActive: true,
};
