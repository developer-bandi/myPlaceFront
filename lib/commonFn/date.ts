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
  } else {
    newDate = dateData.split("T")[0];
  }
  return newDate;
};

export const setDateYearMonthDay = (dateData: string) => {
  return dateData.split("T")[0];
};

export const setDateYearMonthDayHour = (dateData: Date) => {
  return `${dateData.getMonth()}월 ${dateData.getDate()}일 ${dateData.getHours()}:${dateData.getMinutes()}`;
};
