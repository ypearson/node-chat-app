
var generateMessage = (from,message) => {
    var obj = {from,message,createdAt: new Date().getTime()};
    return obj;
}

module.exports = {generateMessage};