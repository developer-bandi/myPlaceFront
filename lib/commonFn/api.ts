import axios from "axios";
axios.defaults.withCredentials = true;

export const axiosGetHashTags = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/hashtag`);
};

export const axiosGetHashTagRank = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/hashtag/rank`);
};

export const axiosGetStoreRank = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/home/store`);
};

export const axiosGetRecentReview = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/home/review`);
};

export const axiosLocalSignup = (userData: {
  localId: string;
  password: string;
  nickname: string;
  email: string;
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/join`,
    userData
  );
};

export const axiosLocalSignin = (userData: {
  localId: string;
  password: string;
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/login`,
    userData
  );
};

export const axiosCheckSignin = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/logincheck`);
};

export const axiosLogout = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/logout`);
};

export const axiosHashtagSearch = (
  latitude: string,
  longitude: string,
  selectedHashtag: string[]
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/search/hashtagsearch`,
    {latitude, longitude, selectedHashtag}
  );
};

export const axiosNameSearch = (
  latitude: string,
  longitude: string,
  searchKeyword: string
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/search/namesearch`,
    {latitude, longitude, searchKeyword}
  );
};

export const axiosStoreInfo = (storeId: string) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/search/storeInfo`,
    {storeId}
  );
};

export const axiosAddComment = (
  storeId: number,
  content: string,
  hashtags: number[],
  imgs: Blob[]
) => {
  const formData = new FormData();
  formData.append("StoreId", JSON.stringify(storeId));
  formData.append("content", content);
  for (let i = 0; i < hashtags.length; i++) {
    formData.append("hashtags[]", JSON.stringify(hashtags[i]));
  }
  for (let i = 0; i < imgs.length; i++) {
    formData.append("imgs[]", imgs[i]);
  }

  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/contribute/writereview`,
    formData,
    {
      headers: {"Content-Type": `multipart/form-data`},
    }
  );
};

export const axiosAddStore = (
  name: string,
  tel: string | undefined,
  openingHours: string | undefined,
  address: string,
  latitude: string,
  longitude: string,
  category: string,
  mainImg: Blob[],
  menuImg: Blob[]
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("address", address);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("category", category);
  for (let i = 0; i < mainImg.length; i++) {
    formData.append("mainImg[]", mainImg[i]);
  }
  for (let i = 0; i < menuImg.length; i++) {
    formData.append("menuImg[]", menuImg[i]);
  }

  if (typeof tel === "string") {
    formData.append("tel", tel);
  }
  if (typeof openingHours === "string") {
    formData.append("openingHours", openingHours);
  }

  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/contribute/writestore`,
    formData,
    {
      headers: {"Content-Type": `multipart/form-data`},
    }
  );
};

export const axiosUpdateStorePosition = (
  id: string,
  latitude: string,
  longitude: string,
  address: string
) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/contribute/storeposition`,
    {id, latitude, longitude, address}
  );
};

export const axiosUpdateComment = (
  storeId: number,
  content: string,
  hashtags: string[],
  imgs: string[]
) => {
  const formData = new FormData();
  formData.append("StoreId", JSON.stringify(storeId));
  formData.append("content", JSON.stringify(content));
  for (let i = 0; i < hashtags.length; i++) {
    formData.append("hashtags[]", JSON.stringify(hashtags[i]));
  }
  for (let i = 0; i < imgs.length; i++) {
    formData.append("imgs[]", imgs[i]);
  }

  return axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/contribute/review`,
    formData,
    {
      headers: {"Content-Type": `multipart/form-data`},
    }
  );
};

export const axiosUpdateStoreInfo = (
  id: number,
  name: string,
  tel: string | undefined,
  openingHours: string | undefined,
  category: string,
  mainImg: Blob[],
  menuImg: Blob[],
  deletedImg: string[]
) => {
  console.log(mainImg);
  console.log(menuImg);
  console.log(deletedImg);
  const formData = new FormData();
  formData.append("id", String(id));
  formData.append("name", name);
  formData.append("category", category);
  for (let i = 0; i < mainImg.length; i++) {
    formData.append("mainImg[]", mainImg[i]);
  }
  for (let i = 0; i < menuImg.length; i++) {
    formData.append("menuImg[]", menuImg[i]);
  }
  for (let i = 0; i < deletedImg.length; i++) {
    formData.append("deletedImg[]", deletedImg[i]);
  }
  if (typeof tel === "string") {
    formData.append("tel", tel);
  }
  if (typeof openingHours === "string") {
    formData.append("openingHours", openingHours);
  }

  return axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/contribute/storeinfo`,
    formData,
    {
      headers: {"Content-Type": `multipart/form-data`},
    }
  );
};

export const axiosGetPostList = (page: number, order: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/list?page=${page}&order=${order}`
  );
};

export const axiosGetSearchPostList = (
  keyword: string,
  page: number,
  order: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/search?keyword=${keyword}&page=${page}&order=${order}`
  );
};

export const axiosGetPostDetail = (id: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/detail?id=${id}`
  );
};

export const axiosDeletePostDetail = (PostId: number, UserId: number) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/detail`, {
    data: {PostId, UserId},
  });
};

export const axiosPostComment = (PostId: number, content: string) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/comment`, {
    PostId,
    content,
  });
};

export const axiosDeleteComment = (CommentId: number, UserId: number) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/comment`, {
    data: {
      CommentId,
      UserId,
    },
  });
};

export const axiosPostlikecount = (PostId: number) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/likecount`, {
    PostId,
  });
};

export const axiosDeletelikecount = (PostId: number) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/likecount`,
    {
      data: {
        PostId,
      },
    }
  );
};

export const axiosPostDetail = (
  title: string,
  content: string,
  imgfile: Blob[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  for (let i = 0; i < imgfile.length; i++) {
    formData.append("imgs[]", imgfile[i]);
  }
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/post/detail`,
    formData
  );
};

export const axiosPostBookMark = (StoreId: number) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/search/bookmark`,
    {StoreId}
  );
};

export const axiosDeleteBookMark = (StoreId: number) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/search/bookmark`,
    {data: {StoreId}}
  );
};

export const axiosGetMyBookMark = (page: number) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/bookmark?page=${page}`
  );
};

export const axiosGetMyReviews = (page: number) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/reviews?page=${page}`
  );
};

export const axiosDeleteMyReview = (id: string) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/review`,
    {data: {id}}
  );
};

export const axiosGetMyReview = (id: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/review?id=${id}`
  );
};

export const axiosPatchMyReview = (
  deleteHashtag: string[],
  addHashtag: string[],
  deleteImg: string[],
  imgfile: Blob[],
  id: string,
  content: string
) => {
  const formData = new FormData();
  formData.append("id", String(id));
  formData.append("content", content);
  for (let i = 0; i < imgfile.length; i++) {
    formData.append("imgs[]", imgfile[i]);
  }
  for (let i = 0; i < deleteHashtag.length; i++) {
    formData.append("deleteHashtag[]", deleteHashtag[i]);
  }
  for (let i = 0; i < addHashtag.length; i++) {
    formData.append("addHashtag[]", addHashtag[i]);
  }
  for (let i = 0; i < deleteImg.length; i++) {
    formData.append("deleteImg[]", deleteImg[i]);
  }

  return axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/contribute/review`,
    formData
  );
};

export const axiosGetMyPost = (page: number) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/post?page=${page}`
  );
};

export const axiosGetMyComment = (page: number) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/comment?page=${page}`
  );
};

export const axiosGetMyInfo = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/info`);
};

export const axiosPatchMyNickname = (nickname: string) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/mypage/nickname`,
    {
      nickname,
    }
  );
};

export const axiosPatchPassword = (password: string, newPassword: string) => {
  return axios.patch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/password`, {
    password,
    newPassword,
  });
};

export const axiosDeleteUser = () => {
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/user`);
};

export const axiosPostId = (email: string) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/id`, {
    email,
  });
};

export const axiosPostPassword = (email: string, newPassword: string) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/password`, {
    email,
    newPassword,
  });
};
