export type localSigninRes = string;

export type localSignupRes = string;

export type checkSigninRes = { id: number; nickname: string } | string;

export type logoutApiRes = string;

export type deleteUserRes = string;

export type searchIdRes = { id: string; number: string } | string;

export type findAndChangePasswordRes = string;

export type getNoticeListRes = {
  id: number;
  content: string;
  check: boolean;
  createdAt: string;
  PostId: number;
}[];

export type changeNoticeStatusRes = string;
