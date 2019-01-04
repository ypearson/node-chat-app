const moment = require('moment');

var generateMessage = (from, text) => {
    var obj = {from,
               text,
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