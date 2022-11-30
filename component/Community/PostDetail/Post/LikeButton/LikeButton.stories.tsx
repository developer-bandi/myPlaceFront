import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LikeButton from "./LikeButton";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/PostDetail/Post/LikeButton",
  component: LikeButton,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = (arg) => (
  <LikeButton {...arg} />
);

export const islike = Template.bind({});
islike.args = {
  liked: "up",
  likedLength: 10,
  dispatchUpdateLike: action("dispatchUpdateLike"),
};

export const isNotLike = Template.bind({});
isNotLike.args = {
  liked: "down",
  likedLength: 10,
  dispatchUpdateLike: action("dispatchUpdateLike"),
};
