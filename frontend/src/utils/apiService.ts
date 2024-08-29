export const customFetch = async (
  url: string,
  method: string = "",
  reqBody: any = null
) => {
  try {
    const res = method
      ? await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        })
      : await fetch(url);
    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};
