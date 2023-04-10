import { getHashTagRes } from "../type/hashtag";
import axiosInstance from "./core";

export const getHashTag = () => axiosInstance.get<getHashTagRes>("hashtag");
