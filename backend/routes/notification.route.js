import express from "express";
import { createNotification, deleteNotification, getNotificationsByAccountNumber, updateNotification } from '../controllers/notification.controller.js';
import { verifyCustomer, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post('/', createNotification); 
router.get('/', getNotifications);
router.delete('/:accountNumber', deleteNotificationByAccountNumber);
router.put('/:accountNumber', updateNotification); 
router.delete('/:accountNumber', deleteNotification);



export default router;

