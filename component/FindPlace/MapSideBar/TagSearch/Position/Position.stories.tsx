import { ComponentStory, ComponentMeta } from "@storybook/react";
import Position from "./Position";

export default {
  title: "FindPlace/MapSideBar/TagSearch/Position",
  component: Position,
} as ComponentMeta<typeof Position>;

const Template: ComponentStory<typeof Position> = (arg) => {
  return (
    <div style={{ width: 400, position: "relative" }}>
      <Position {...arg} />
    </div>
  );
};

export const generalType = Template.bind({});
