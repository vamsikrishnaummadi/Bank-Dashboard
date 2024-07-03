import express from "express";
import { createNotification, deleteNotification, deleteNotificationByAccountNumber, getNotifications, updateNotification } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/notifications', createNotification); 
router.get('/notifications', getNotifications);
router.delete('/notifications/:accountNumber', deleteNotificationByAccountNumber);
router.put('/:accountNumber', updateNotification); 
router.delete('/:accountNumber', deleteNotification);



export default router;

