// models/mcp.js
import mongoose from 'mongoose';

const mcpSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  partname: String,     // "FAN CASE L"
  partcode: String,     // "VU25Y393G01"
  binarycode: String,   // "0001"
  status: String,       // "Stopping"
  mcuse: String,        // "34"
  id: String,          // "1"
  countershot: Number,  // 100
  mainshot: Number,    // 526750
  target: String       // "50000"
}, { 
  timestamps: true,
  collection: 'MCP'
});

export default mongoose.model('MCP', mcpSchema, 'MCP');