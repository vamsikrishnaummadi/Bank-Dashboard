import express from "express";
import {
  createCard,
  deleteCard,
  getCardByCardNumber,
  getCards,
} from "../controllers/card.controller.js";

const router = express.Router();

router.post("/cards/create", createCard);

router.post("/cards", getCards);

router.get("/cards/:cardNumber", getCardByCardNumber);

router.delete("/cards/:cardNumber", deleteCard);

export default router;
