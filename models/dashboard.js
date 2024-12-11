// models/Dashboard.js
const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  // Running and Stopping data
  runningProceed: { type: Number, default: 0 },
  runningTarget: { type: Number, default: 0 },
  stoppingProceed: { type: Number, default: 0 },
  stoppingTarget: { type: Number, default: 0 },
  
  // Details
  counter: { type: String, default: 'NON' },
  canSet: { type: String, default: '1' },
  reference: { type: String, default: 'CIDE' },
  partName: { type: String, default: 'T-NAME-CMB-L' },
  partCode: { type: String, default: 'VU384995001' },
  mcUse: { type: String, default: '94' },
  date: { type: String, default: new Date().toLocaleDateString() },
  status: { type: String, default: 'A' },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dashboard', dashboardSchema);