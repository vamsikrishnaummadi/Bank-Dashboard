import { errorHandler } from '../middlewares/error.js';
import Stock from '../models/trendingstock.model.js';


export const getTrendingStocks = async(req,res,next)=>{
    try{
        const stocks =  await Stock.aggregate([{$sample : {size: 5}}]); 
        res.status(200).json(stocks);
    } catch (error){
        next(errorHandler(500, "Failed to retrieve treding stocks"));
    }
};  

export const createStock = async (req, res, next) => {
    const { name, symbol, price, change, volume } = req.body;
  
    try {
      const newStock = new Stock({ name, symbol, price, change, volume });
      const savedStock = await newStock.save();
      res.status(201).json(savedStock);
    } catch (error) {
      console.log(error);
      next(errorHandler(500, "Failed to create stock"));
    }
  };

  export const deleteStockById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedStock = await Stock.findByIdAndDelete(id);
  
      if (!deletedStock) {
        return next(errorHandler(404, "Stock not found"));
      }
  
      res.status(200).json({ success: true, message: 'Stock deleted successfully' });
    } catch (error) {
      next(errorHandler(500, "Failed to delete stock"));
    }
  };