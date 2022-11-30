import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Search from "./Search";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/PostList/Search",
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (arg) => <Search {...arg} />;

export const generalType = Template.bind({});
generalType.args = {
  searchPost: () =>
    new Promise((resolve) => {
      action("searchPost")();
      resolve();
    }),
  initializeSearch: action("initializeSearch"),
  moveWritePage: action("moveWritePage"),
};
