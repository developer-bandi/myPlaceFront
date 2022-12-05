import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import Category from "./Category";

export default {
  title: "FindPlace/MapSideBar/TagSearch/Category",
  component: Category,
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = (arg) => {
  const [selectedCategory, setSelectedCategory] = useState("카페");
  return (
    <div style={{ width: 340, position: "relative" }}>
      <Category
        selectedCategory={selectedCategory}
        dispatchCategory={(keyword) => setSelectedCategory(keyword)}
      />
    </div>
  );
};

export const generalType = Template.bind({});
