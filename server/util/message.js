
var generateMessage = (from,message) => {
    var obj = {from,message,createdAt: new Date().getTime()};
    return obj;
}

var generateLocationMessage = (from,lat,long) => {
    var obj = {from,
                url:`https://www.google.com/maps/@${lat},${long}`
            }
    return obj;
}


module.exports = {generateMessage, generateLocationMessage};