const safeJsonParse = (value: any, defaultValue = null) => {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (err) {
    console.log({ err });
    return defaultValue;
  }
};

export default safeJsonParse;
