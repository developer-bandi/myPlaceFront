import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CommentInput from "./CommentInput";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Community/PostDetail/CommentInput",
  component: CommentInput,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (arg) => (
  <div style={{ maxWidth: "1000px" }}>
    <CommentInput {...arg} />
  </div>
);

export const generalType = Template.bind({});
generalType.args = {
  dispatchPostComment: action("dispatchPostComment"),
};
