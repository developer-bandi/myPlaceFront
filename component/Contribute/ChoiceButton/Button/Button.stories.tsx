import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";
import first from "../../../../public/placeRegistration.svg";

export default {
  title: "Contribute/ChoiceButton/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (arg) => <Button {...arg} />;

export const generalType = Template.bind({});
generalType.args = {
  position: "left",
  image: first,
  title: "장소 등록",
  content: "먼저 위치를 등록한후, 장소에 대한 정보를 추가해보세요",
  linkPath: "/contribute/addstoreposition",
  linkContent: "장소 등록하러 이동하기",
};
