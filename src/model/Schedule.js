const mongoose = require('mongoose');

const Schedule = new mongoose.Schema({
    alert_time: Number,
    channel_id: String,
});

mongoose.model('Schedule', Schedule);