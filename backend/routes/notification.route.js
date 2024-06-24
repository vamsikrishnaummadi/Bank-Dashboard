import { createNotification, getNotifications } from '../controllers/notification.controller';
const router = express.Router();

router.post('/', createNotification); 
router.get('/:userId', getNotifications);

export default router;

