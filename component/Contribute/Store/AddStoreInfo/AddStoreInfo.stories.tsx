import React, { useEffect, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddStoreInfo from "./AddStoreInfo";

export default {
  title: "Contribute/Store/AddStoreInfo",
  component: AddStoreInfo,
} as ComponentMeta<typeof AddStoreInfo>;

const Template: ComponentStory<typeof AddStoreInfo> = (arg) => {
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

  return <AddStoreInfo {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  uploadMainImg: [],
  uploadMenuImg: [],
};
