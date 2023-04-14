const makeForm = (AppendInfo: { [key: string]: unknown }) => {
  const formData = new FormData();
  Object.entries(AppendInfo).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        formData.append(`${key}[]`, value[i]);
      }
    } else {
      if (value !== undefined) {
        if (typeof value === "string") {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      }
    }
  });
  return formData;
};

export default makeForm;
