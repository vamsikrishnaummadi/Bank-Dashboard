import { createNotification, getNotifications } from '../controllers/notification.controller';
const router = express.Router();

router.post('/notifications', createNotification); 
router.get('/notifications/:userId', getNotifications);

export default router;

