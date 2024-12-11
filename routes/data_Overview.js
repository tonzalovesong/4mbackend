// routes/data_Overview.js
import express from 'express';
import mcp from '../models/mcp.js';

const router = express.Router();

// Get all data - คงการทำงานเดิม
router.get('/user_mc', async (req, res) => {
  try {
    const mcpData = await mcp.find();
    res.json(mcpData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset only countershot - คงเงื่อนไขเดิม
router.put('/user_mc/reset/:partname', async (req, res) => {
  try {
    console.log('Attempting to reset countershot for:', req.params.partname);

    const updatedDoc = await mcp.findOneAndUpdate(
      { partname: req.params.partname },
      { 
        $set: { 
          countershot: "0"  // Reset only countershot, mainshot remains unchanged
        }
      },
      { new: true }
    );

    if (!updatedDoc) {
      console.log('Document not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Part not found' 
      });
    }

    console.log('Reset successful:', updatedDoc);
    res.json({
      success: true,
      message: 'Countershot reset successful',
      data: updatedDoc
    });

  } catch (err) {
    console.error('Reset error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Update general information - คงเงื่อนไขเดิม
router.put('/user_mc/:id', async (req, res) => {
  try {
    const updatedMCP = await mcp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMCP) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(updatedMCP);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;