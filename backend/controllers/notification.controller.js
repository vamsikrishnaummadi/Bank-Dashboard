const Notification = require('../models/notification.model') 

exports.createNotification = async(req,res) =>{
    const {userId, message} = req.body; 
    try{
        const notification = new Notification({userId, message}); 
        await notification.save(); 
        req.io.to(userId).emit('notification', notification); 
        res.status(201).send(notification);
    }catch (error){
        res.status(500).send(error);
    }
};  


exports.getNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ userId });
        res.send(notifications);
    } catch (error) {
        res.status(500).send(error);
    }
};