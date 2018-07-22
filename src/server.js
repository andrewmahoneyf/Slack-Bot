require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const interactiveResponse = require('./interactiveResponse');
const mongoose = require('mongoose');
const moment = require('moment');
var request = require('request');
require('./model/SchedulingSession');
require('./model/Schedule');

const SchedulingSession = mongoose.model('SchedulingSession');
const Schedule = mongoose.model('Schedule');
const mongoose_id = process.env.MONGOOSE_USER_ID || '';
const mongoose_password = process.env.MONGOOSE_PASSWORD || '';
const mongoose_url = process.env.MONGOOSE_URL;
const verification_token = process.env.VERIFICATION_TOKEN || '';
const oauth_token = process.env.OAUTH_TOKEN || '';
const timer_interval = process.env.TIMER_INTERVAL || 60000;

const app = express();
const port = process.env.PORT || 3005;

mongoose.connect(`mongodb://${mongoose_id}:${mongoose_password}@${mongoose_url}`, (err, db) => {
    if (err !== null) {
        console.log(err)
    } else {
        _init();
    }
});

const API = '/slack';

const CALLBACK_ID = {
    FREQUENCY: 'randy_frequency',
    HOUR: 'randy_details_hour',
    MINUTE: 'randy_details_minute',
    AM_PM: 'randy_details_ampm'
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(API, (req, res) => res.status(200).send('Hello slack!'));

app.post(`${API}/random-facilitator`, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(interactiveResponse.getFrequencyMessage());
});

app.post(`${API}/frequency`, (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const callback_id = payload.callback_id;
    const channel_id = payload.channel.id;
    const user_id = payload.user.id;

    switch(callback_id) {
        case 'randy_frequency': _saveScheduling(user_id, channel_id, 'frequency', payload.actions[0].value);
    }

    if (callback_id === CALLBACK_ID.FREQUENCY) {
        if (payload.actions[0].value === 'one-minute'){
            _setupSchedule(user_id, channel_id, payload.actions[0].value);
            res.status(200).send('I will now randomly select a user every minute.');
        } else if (payload.actions[0].value === 'daily') {
            res.status(200).send(interactiveResponse.getDailyHourResponse());
        }
    } else {
        res.status(200);
    }
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, () => console.log(`bot listening on port ${port}`));

function sendNewSelectionToChannel(channel_id) {
    request.get(`https://slack.com/api/channels.info?token=${verification_token}&channel=${channel_id}`, (error, response, body) => {
        // console.log(`channel info: ${body}`);
        const members = JSON.parse(body).channel.members;
        const randomUser = members[Math.floor(Math.random() * members.length)];

        request.get(`https://slack.com/api/users.info?token=${verification_token}&user=${randomUser}`, (error, response, body) => {
            // console.log(`channel: ${channel_id}`);
            // console.log(JSON.parse(body));
            const name = JSON.parse(body).user.real_name;
            const msg = interactiveResponse.getUserPickedMessage(name);
            // const options = {
            //     url: `https://slack.com/api/chat.postMessage?token=${oauth_token}&text=${name}%20has%20been%20picked&channel=${channel_id}`,
            //     method: 'POST',
            //     'Content-Type': 'application/json'
            // }
            request(`https://slack.com/api/chat.postMessage?token=${oauth_token}&text=${name}%20has%20been%20picked&channel=${channel_id}`, (error, response, body) => {
                console.log(`Error sending post message: error:${error} response:${JSON.stringify(response)} body:${JSON.stringify(body)}`)
            })
            // const options = {
            //     url: 'https://slack.com/api/chat.postMessage',
            //     form: {
            //         token
            //     }
            // }
            // request.post(options, (error, response, body) => {

            // });
        })
    })
}

function _saveScheduling(user_id, channel_id, type, typeData) {
    SchedulingSession.findOne({'channel_id': channel_id, 'user_id': user_id}, (err, data) => {
        let newData = data == null ? new SchedulingSession() : data;
        newData.user_id = user_id;
        newData.channel_id = channel_id;
        newData[type] = typeData;
        newData.save().then((err) => {
            if (err != null) {
                console.log(err);
            }
        });
    });
}

function _setupSchedule(user_id, channel_id, type) {
    SchedulingSession.findOne({'channel_id': channel_id, 'user_id': user_id}, (err, data) => {
        if (data) {
            console.log(type);
            switch(type) {
                case 'one-minute':
                    const currentTime = moment().add(1, 'm');
                    console.log(currentTime.utc().format('YYYYMMDDHHmm'));
                    let saveDate = new Schedule({
                        alert_time: currentTime.utc().format('YYYYMMDDHHmm'),
                        channel_id: channel_id
                    });
                    saveDate.save()
            }
        }
    });
}

function _init() {
    _start();
    setInterval(_start, timer_interval)
}

function _start(){
    const currentTime = moment().utc().format('YYYYMMDDHHmm');
    console.log(`retrieving schedules for ${currentTime}`);
    Schedule.find({alert_time: currentTime}, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            data.forEach(item => {
                sendNewSelectionToChannel(item.channel_id);
            })
        }
    });
}