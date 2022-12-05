import { ComponentStory, ComponentMeta } from "@storybook/react";
import NameSearch from "./NameSearch";
import { action } from "@storybook/addon-actions";

export default {
  title: "FindPlace/MapSideBar/NameSearch",
  component: NameSearch,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NameSearch>;

const Template: ComponentStory<typeof NameSearch> = (arg) => (
  <div style={{ width: 380, position: "relative" }}>
    <NameSearch {...arg} />
  </div>
);

export const generalType = Template.bind({});
generalType.args = {
  dispatchAddress: action("dispatchAddress"),
  dispatchSearchStore: action("dispatchSearchStore"),
};
