const makeForm = (AppendInfo: { [key: string]: unknown }) => {
  const formData = new FormData();

  Object.entries(AppendInfo).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        formData.append(`${key}[]`, JSON.stringify(value[i]));
      }
    } else {
      if (value !== undefined) {
        formData.append(key, JSON.stringify(value));
      }
    }
  });

  return formData;
};

export default makeForm;
