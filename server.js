const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/mushroom-repository'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/mushroom-repository/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`App listening on port: ${process.env.PORT || 8080}` )
});