import React, { useEffect, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddStorePosition from "./AddStorePosition";
import { action } from "@storybook/addon-actions";
import { useIsTabletOrMobile } from "../../../../lib/customHook/mediaQuery";

export default {
  title: "Contribute/Store/AddStorePosition",
  component: AddStorePosition,
} as ComponentMeta<typeof AddStorePosition>;

const Template: ComponentStory<typeof AddStorePosition> = (arg) => {
  const isTabletOrMobile = useIsTabletOrMobile();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (ref.current !== null) {
        const div = document.createElement("div");
        div.style.backgroundColor = "black";
        div.style.width = "100%";
        div.style.height = "100%";
        ref.current.appendChild(div);
      }
    }, 2000);
  });
  return (
    <AddStorePosition
      {...arg}
      isTabletOrMobile={isTabletOrMobile}
      mapref={ref}
    />
  );
};

export const generalType = Template.bind({});
generalType.args = {
  setAddress: action("setAddress"),
  moveSetpage: action("moveSetpage"),
};
