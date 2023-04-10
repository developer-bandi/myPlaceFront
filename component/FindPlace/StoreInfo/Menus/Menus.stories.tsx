import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menus from "./Menus";
import { loader } from "../../../../lib/loader";

export default {
  title: "FindPlace/StoreInfo/Menus",
  component: Menus,
} as ComponentMeta<typeof Menus>;

const Template: ComponentStory<typeof Menus> = (arg) => {
  return (
    <div style={{ width: 340, position: "relative" }}>
      <Menus {...arg} />
    </div>
  );
};

const makeUrl = loader({ width: 740, height: 300 });

export const isContent = Template.bind({});
isContent.args = {
  menus: [],
};

export const isNoContent = Template.bind({});
isNoContent.args = {
  menus: [
    makeUrl({ src: "/place/16625346494021491388606" }),
    makeUrl({ src: "/place/16625346494021491388606" }),
    makeUrl({ src: "/place/16625346494021491388606" }),
  ],
};
