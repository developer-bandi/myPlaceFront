export const setDateLatest = (dateData: string) => {
  const nowTime = new Date().getTime();
  const writeTime = new Date(dateData).getTime();
  const timeDiff = (nowTime - writeTime) / 60000;
  let newDate = null;
  if (timeDiff < 1) {
    newDate = "방금전";
  } else if (timeDiff < 60) {
    newDate = `${Math.floor(timeDiff)}분전`;
  } else if (timeDiff < 1440) {
    newDate = `${Math.floor(timeDiff / 60)}시간 전`;
  } else if (timeDiff < 43200) {
    newDate = `${Math.floor(timeDiff / 1440)}일 전`;
  } else if (timeDiff < 525600) {
    newDate = `${Math.floor(timeDiff / 43200)}달 전`;
  } else {
    newDate = `${Math.floor(timeDiff / 525600)}년 전`;
  }
  return newDate;
};

export const setDateYearMonthDay = (dateData: string) => {
  return dateData.split("T")[0];
};

export const setDateYearMonthDayHour = (dateData: Date) => {
  const fixDate = new Date(dateData.getTime() + 32400000);
  return `${
    fixDate.getMonth() + 1
  }월 ${fixDate.getDate()}일 ${fixDate.getHours()}:${fixDate.getMinutes()}`;
};
