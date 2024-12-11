import express from 'express';
import mongoose from 'mongoose';
import status from 'statuses';

const router = express.Router();

const MCPSchema = new mongoose.Schema({
  // สามารถเพิ่มฟิลด์อื่น ๆ ตามที่จำเป็น
});


const STATUS = mongoose.model('Status', MCPSchema, 'Status');
router.get('/status', async (req, res) => {
  try {
    const show = await STATUS.find(); 
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;