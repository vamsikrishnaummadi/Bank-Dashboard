import Card from "../models/card.model.js";

export async function generateCardNumber() {
  let cardNumber = "";
  for (let i = 0; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }
  const card = await Card.findOne({ cardNumber });
  return card ? generateCardNumber() : cardNumber;
}
