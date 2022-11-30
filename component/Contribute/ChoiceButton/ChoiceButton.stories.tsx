import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChoiceButton from "./ChoiceButton";

export default {
  title: "Contribute/ChoiceButton",
  component: ChoiceButton,
} as ComponentMeta<typeof ChoiceButton>;

const Template: ComponentStory<typeof ChoiceButton> = () => <ChoiceButton />;

export const generalType = Template.bind({});
