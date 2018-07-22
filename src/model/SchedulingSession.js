const mongoose = require('mongoose');

const SchedulingSession = new mongoose.Schema({
    user_id: String,
    channel_id: String,
    frequency: String,
    hour: Number,
    minute: Number,
    am_pm: String,
    day_of_month: Number,
    day_of_week: String
});

mongoose.model('SchedulingSession', SchedulingSession);