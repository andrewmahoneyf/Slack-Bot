module.exports =  {

    getFrequencyMessage() {
        return {
            'text': 'Lets schedule a facilitator!',
            'attachments': [
                {
                    'text': 'How frequent do you want to me to choose someone?',
                    'fallback': 'You are unable to schedule a facilitator',
                    'callback_id': 'randy_frequency',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            'name': 'frequency',
                            'text': '1 minute',
                            'type': 'button',
                            'value': 'one-minute'
                        },
                        {
                            'name': 'frequency',
                            'text': 'Daily',
                            'type': 'button',
                            'value': 'daily'
                        },

                        {
                            'name': 'frequency',
                            'text': 'Work Days',
                            'type': 'button',
                            'value': 'work_days'
                        },
                        {
                            'name': 'frequency',
                            'text': 'Weekly',
                            'type': 'button',
                            'value': 'weekly'
                        },
                                        {
                            'name': 'frequency',
                            'text': 'Cancel',
                            'type': 'button',
                            'value': 'cancel',
                            'style': 'danger'
                        }
                    ]
                }
            ]
        };
    },

    getDailyHourResponse() {
        return {
            'text': 'Lets get some frequency details',
            'attachments': [
                {
                    'text': 'What time should I select a facilitator?',
                    'fallback': 'You are unable to schedule a facilitator',
                    'callback_id': 'randy_details_hour',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            "name": "hour_list",
                            "text": "Pick an hour...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "1",
                                    "value": "1"
                                },
                                {
                                    "text": "2",
                                    "value": "2"
                                },
                                {
                                    "text": "3",
                                    "value": "3"
                                },
                                {
                                    "text": "4",
                                    "value": "4"
                                },
                                {
                                    "text": "5",
                                    "value": "5"
                                },
                                {
                                    "text": "6",
                                    "value": "6"
                                },
                                {
                                    "text": "7",
                                    "value": "7"
                                },
                                {
                                    "text": "8",
                                    "value": "8"
                                },
                                {
                                    "text": "9",
                                    "value": "9"
                                },
                                {
                                    "text": "10",
                                    "value": "10"
                                },
                                {
                                    "text": "11",
                                    "value": "11"
                                },
                                {
                                    "text": "12",
                                    "value": "12"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    getDailyMinuteResponse() {
        return {
            'text': 'Lets get some frequency details',
            'attachments': [
                {
                    'text': 'What time should I select a facilitator?',
                    'fallback': 'You are unable to schedule a facilitator',
                    'callback_id': 'randy_details_minute',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            "name": "minute_list",
                            "text": "Pick a minute...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "00",
                                    "value": "00"
                                },
                                {
                                    "text": "15",
                                    "value": "15"
                                },
                                {
                                    "text": "30",
                                    "value": "30"
                                },
                                {
                                    "text": "45",
                                    "value": "45"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    getAmPmFrequency() {
        return {
            'text': 'Lets get some frequency details',
            'attachments': [
                {
                    'text': 'What time should I select a facilitator?',
                    'fallback': 'You are unable to schedule a facilitator',
                    'callback_id': 'randy_details_ampm',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            "name": "am_pm_list",
                            "text": "Night or day...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "AM",
                                    "value": "am"
                                },
                                {
                                    "text": "PM",
                                    "value": "pm"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    getUserPickedMessage(user) {
        return {
            'text': `${user} has been picked!`,
            'attachments': [
                {
                    'text': `Would you like to skip ${user}?`,
                    'fallback': '',
                    'callback_id': 'randy_next_user',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            'name': 'next',
                            'text': 'Next',
                            'type': 'button',
                            'value': 'next'
                        }
                    ]
                }
            ]
        }
    }
}