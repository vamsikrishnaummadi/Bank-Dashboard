export const getCardDetails = async (cardNumber: string) => {
  try {
    const res = await fetch(`/api/cards/${cardNumber}`);
    const parsedRes = await res.json();
    console.log({ parsedRes });
    return parsedRes;
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

export const updateCardDetails = async (
  reqBody: object,
  cardNumber: string
) => {
  try {
    const res = await fetch(`/api/cards/${cardNumber}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

export const getCards = async (accountNumber: string, limit: number | null) => {
  try {
    const res = await fetch(`/api/cards?page=1${limit && "&limit=" + limit}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber }),
    });
    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};

export const createCard = async (reqBody: object) => {
  try {
    const res = await fetch("/api/cards/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};
