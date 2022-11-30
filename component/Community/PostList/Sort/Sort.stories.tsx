import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Sort from "./Sort";

export default {
  title: "Community/PostList/Sort",
  component: Sort,
} as ComponentMeta<typeof Sort>;

const Template: ComponentStory<typeof Sort> = () => {
  const [selectedSort, setSelectedSort] = useState("createdAt");
  return (
    <Sort
      selectedSort={selectedSort}
      changeSort={(v) =>
        new Promise((resolve) => {
          setSelectedSort(v);
          resolve();
        })
      }
    />
  );
};

export const generalType = Template.bind({});
