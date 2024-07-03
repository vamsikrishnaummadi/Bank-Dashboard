import { errorHandler } from "../middlewares/error.js";
import Notification from '../models/notification.model.js';
;

export const createNotification = async(req,res,next) =>{
    const notifi = req.body; 
    try{
        const notification = new Notification(notifi); 
        const sample = await notification.save(); 
        res.status(201).json(sample);
    }catch (error){
        next(errorHandler(500, "Failed to create notification"));
    }
};  


export const getNotificationsByAccountNumber = async (req, res, next) => {
    const { accountNumber} = req.params;
    const {page=1, limit= 10} = req.query;

    try {
        const notifications = await Notification.find({ accountNumber})
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }); 

        const totalNotifications = await Notification.countDocuments({ accountNumber});
        const totalPages = Math.ceil(totalNotifications / limit);

        res.send({
            notifications,
            totalPages,
            currentPage: parseInt(page),
            totalNotifications
        });
    } catch (error) {
        next(errorHandler(500, "Failed to retrieve notifications"));
    }
};  


export const updateNotification = async(req, res, next)=>{
    const {notificationId} = req.params ;
    const updateFields = req.body;

    try{
        const notification = await Notification.findByIdAndUpdate({ _id : notificationId},
            { $set: updateFields },); 
        if(!notification){
            return next(errorHandler(404, "Notification not found"))
        }
        const updatedNotification = await notification.save();
        res.status(200).json(updatedNotification);
    }catch(error){
        next(errorHandler(500, "Failed to update notification"));
    }
}  


export const deleteNotification = async (req, res, next) => {
    const { accountNumber } = req.params;

    try {
        const notification = await Notification.deleteMany({accountNumber});
        if (!notification) {
            return next(errorHandler(404, "Notification not found"));
        }
        res.status(200).send({ message: "All Notifications deleted successfully" });
    } catch (error) {
        next(errorHandler(500, "Failed to delete notification"));
    }
};

