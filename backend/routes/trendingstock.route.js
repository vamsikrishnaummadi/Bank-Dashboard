import express from 'express';
import { createStock, deleteStockById, getTrendingStocks } from '../controllers/trendingstock.controller.js';

const router = express.Router(); 

router.get('/stock/trending-stocks', getTrendingStocks); 
router.post('/stock/stocks', createStock);    
router.delete('/stock/:id', deleteStockById); 

export default router;
