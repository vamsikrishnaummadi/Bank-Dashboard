const router = express.Router();
const notificationController = require('../controllers/notification.controller');   


router.post('/notifications', notificationController.createNotification); 
router.get('/notifications/:userId', notificationController.getNotifications);

module.exports = router;

