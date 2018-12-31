const express = require('express');
const path    = require('path');

const publicPath = path.join(__dirname, '../public');

console.log(__dirname+'/public');
console.log(publicPath);

const port = process.env.PORT || 3000;

var app = express();

// app.get('/',function(req,res){
//   res.sendFile(publicPath +'/index.html');
// });

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});