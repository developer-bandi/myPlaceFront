import React, { useEffect, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UpdateStorePosition from "./UpdateStorePosition";
import { action } from "@storybook/addon-actions";
import { useIsTabletOrMobile } from "../../../../hooks/mediaQuery";

export default {
  title: "Contribute/Store/UpdateStorePosition",
  component: UpdateStorePosition,
} as ComponentMeta<typeof UpdateStorePosition>;

const Template: ComponentStory<typeof UpdateStorePosition> = (arg) => {
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
    <UpdateStorePosition
      {...arg}
      isTabletOrMobile={isTabletOrMobile}
      mapref={ref}
    />
  );
};

export const generalType = Template.bind({});
generalType.args = {
  changeAddress: action("changeAddress"),
  changePosition: action("changePosition"),
};
