import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useIsLabtopOrTabletOrMobile } from "../../../../lib/customHook/mediaQuery";
import Withdrawal from "./Withdrawal";

export default {
  title: "User/Mypage/Withdrawal",
  component: Withdrawal,
} as ComponentMeta<typeof Withdrawal>;

const Template: ComponentStory<typeof Withdrawal> = (arg) => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();

  return (
    <Withdrawal {...arg} isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile} />
  );
};

export const generalType = Template.bind({});
generalType.args = {
  disagreeButton: action("disagreeButton"),
  withdrawalButton: action("withdrawalButton"),
};
