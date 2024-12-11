import express from 'express';
import mongoose from 'mongoose';
// import Update_Status from 'Update_Statuses';

const router = express.Router();

const MCPSchema = new mongoose.Schema({
  // สามารถเพิ่มฟิลด์อื่น ๆ ตามที่จำเป็น
});


const Update_Status = mongoose.model('Update_Status', MCPSchema, 'Update_Status');
router.get('/Update_Status', async (req, res) => {
  try {
    const show = await Update_Status.find(); 
    res.json(show);
  } catch (err) {
    res.Update_Status(500).json({ error: err.message });
  }
});
export default router;