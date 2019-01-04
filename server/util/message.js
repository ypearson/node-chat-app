const moment = require('moment');

var generateMessage = (from, message) => {
    var obj = {from,
               message,
               createdAt: moment().valueOf()
               };

    return obj;
}

var generateLocationMessage = (from, lat, long) => {
    var obj = {from,
               url:`https://www.google.com/maps/@${lat},${long}`,
               createdAt: moment().valueOf()
               };

    return obj;
}

module.exports = {generateMessage, generateLocationMessage};