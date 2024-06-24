import { createNotification, getNotifications, deleteNotification } from '../controllers/notification.controller';
const router = express.Router();

router.post('/', createNotification); 
router.get('/:userId', getNotifications);
router.delete('/:notificationId', deleteNotification);
export default router;

