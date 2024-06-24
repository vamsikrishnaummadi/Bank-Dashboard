import Notification from '../models/notification.model';
import { errorHandler } from '../utils/errorhandler';

export const createNotification = async(req,res,next) =>{
    const {userId, message} = req.body; 
    try{
        const notification = new Notification({userId, message}); 
        await notification.save(); 
        req.io.to(userId).emit('notification', notification); 
        res.status(201).send(notification);
    }catch (error){
        next(errorHandler(500, "Failed to create notification"));
    }
};  


export const getNotifications = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ userId });
        res.send(notifications);
    } catch (error) {
        next(errorHandler(500, "Failed to retrieve notifications"));
    }
};


export const deleteNotification = async(req,res,next) =>{
    const {notificationId} = req.params; 

    try{
        const notification = await Notification.findByIdAndDelete(notificationId); 
        if(!notification){
            return next(errorHandler(404, "Notification not found"));
        }
        res.status(200).send({message: "Notification deleted successfully"})
    } catch(error){
        next(errorHandler(500, "Failed to delete notification"));
    }
}