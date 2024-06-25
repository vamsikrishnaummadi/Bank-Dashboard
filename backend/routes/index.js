import express from 'express';
import loanRoutes from '../routes/loan.route';
import notificationRoutes from '../routes/notification.route';


const router = express.Router(); 

router.use('/notifications', notificationRoutes); 
router.use('/loans', loanRoutes); 

export default router