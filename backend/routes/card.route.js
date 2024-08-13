import express from "express";
import {
  createCard,
  deleteCard,
  getCardByCardNumber,
  getCards,
  updateCard,
} from "../controllers/card.controller.js";

const router = express.Router();

router.post("/cards/create", createCard);

router.post("/cards", getCards);

router.get("/cards/:cardNumber", getCardByCardNumber);

router.delete("/cards/:cardNumber", deleteCard);

router.put("/cards/:cardNumber", updateCard);

export default router;
