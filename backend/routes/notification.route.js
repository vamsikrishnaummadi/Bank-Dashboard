import express from "express";
import { createNotification, deleteNotification, getNotificationsByAccountNumber, updateNotification } from '../controllers/notification.controller.js';
import { verifyCustomer, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post('/notifications', createNotification); 
router.get('/notifications/:accountNumber', getNotificationsByAccountNumber);
router.put('/notifications/:notificationId', updateNotification); 
router.delete('/notifications/:accountNumber',verifyToken, verifyCustomer,  deleteNotification);



export default router;

