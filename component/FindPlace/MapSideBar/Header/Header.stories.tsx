import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./Header";
import { useState } from "react";

export default {
  title: "FindPlace/MapSideBar/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (arg) => {
  const [searchType, setSearchType] = useState("hashtagSearch");
  return (
    <Header
      searchType={searchType}
      changeSidebarStatus={(keyword) => setSearchType(keyword)}
    />
  );
};

export const generalType = Template.bind({});
