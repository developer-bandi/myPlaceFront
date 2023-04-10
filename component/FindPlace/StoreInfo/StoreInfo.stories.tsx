import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoreInfo from "./StoreInfo";
import { action } from "@storybook/addon-actions";
import { loader } from "../../../lib/loader";

export default {
  title: "FindPlace/StoreInfo",
  component: StoreInfo,
} as ComponentMeta<typeof StoreInfo>;

const Template: ComponentStory<typeof StoreInfo> = (arg) => {
  return (
    <StoreInfo
      {...arg}
      postBookMark={() =>
        new Promise((resolve) => {
          action("postBookMark");
          resolve();
        })
      }
      deleteBookMark={() =>
        new Promise((resolve) => {
          action("deleteBookMark");
          resolve();
        })
      }
      deleteStoreTab={action("deleteStoreTab")}
    />
  );
};

const makeUrl = loader({ width: 740, height: 300 });

export const error = Template.bind({});
error.args = {
  store: { loading: false, error: true },
  modalStatus: {
    desktop: { search: false, storeInfo: false },
    mobile: { searchStoreInfo: true },
  },
  isMobile: false,
};

export const loading = Template.bind({});
loading.args = {
  store: { loading: true, error: false },
  modalStatus: {
    desktop: { search: false, storeInfo: false },
    mobile: { searchStoreInfo: true },
  },
  isMobile: false,
};

export const normal = Template.bind({});
normal.args = {
  store: {
    content: {
      storeInfo: {
        id: 1,
        name: "상점",
        tel: "051-123-345",
        openingHours:
          "월 : 휴무\n화 : 10:00~19:00\n수 : 10:00~19:00\n목 : 10:00~19:00\n금 : 10:00~19:00\n토 : 10:00~19:00\n일 : 10:00~19:00",
        address: "부산광역시 금정구 장전동",
        category: "카페",
        updatedAt: new Date(),
        latitude: "testLatitude",
        longitude: "testLongitude",
      },
      mainPhoto: makeUrl({
        src: "/place/16625346494021491388606",
      }),
      Reviews: [
        {
          content: "테스트 댓글 입니다",
          user: "place",
          date: "2022-11-11",
          Hashtags: ["깨끗한", "깔끔한"],
          photos: [
            makeUrl({
              src: "/place/16625346494021491388606",
            }),
          ],
        },
      ],
      Menus: [
        makeUrl({
          src: "/place/16625346494021491388606",
        }),
      ],
    },
    loading: false,
    error: false,
  },
  modalStatus: {
    desktop: { search: false, storeInfo: false },
    mobile: { searchStoreInfo: true },
  },
  isMobile: false,
};
