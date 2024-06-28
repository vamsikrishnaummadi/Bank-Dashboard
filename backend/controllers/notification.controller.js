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


export const getNotifications = async (req, res, next) => {
    const { acocuntNumber} = req.params;
    const {page=1, limit= 10} = req.query;

    try {
        const notifications = await Notification.find({ acocuntNumber})
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }); 

        const totalNotifications = await Notification.countDocuments({ acocuntNumber });
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


export const updateNotification = async(req,res,next)=>{
    const {acocuntNumber} = req.params 
    const updates = req.body

    try{
        const notification = await Notification.findByIdAndUpdate(acocuntNumber, updates, {new : true}); 
        if(!notification){
            return next(errorHandler(404, "Notification not found"))
        }
        res.status(200).json(notification);
    }catch(error){
        next(errorHandler(500, "Failed to update notification"));
    }
}




export const deleteNotificationByAccountNumber = async (req, res, next) => {
    const { accountNumber} = req.params;

    try {
        console.log(`Attempting to delete notifications with accountNumber: ${accountNumber}`);
        const result = await Notification.deleteMany({ accountNumber});
        if (result.deletedCount === 0) {
            console.log(`Notifications with accountNumber: ${accountNumber} not found`);
            return next(errorHandler(404, "Notifications not found"));
        }
        res.status(200).send({ message: "Notifications deleted successfully", notifications: [] });
    } catch (error) {
        console.error(`Error deleting notifications with accountNumber: ${accountNumber}`, error);
        next(errorHandler(500, "Failed to delete notifications"));
    }
};

