var express = require('express');
var router = express.Router();
const fs = require('fs');

var ip = require("ip");
//פונקציה להוספה לקובץ או יצירת קובץ חדש
function createFile(filename, value) {
    if (fs.existsSync('../files/' + filename + '.txt')) {
        console.log("exist")
        fs.appendFile('../files/' + filename + '.txt', value + '\n', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    else {
        fs.writeFile('../files/' + filename + '.txt', value + '\n', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

}

  //שאלה מספר 1 פרק 2
  router.get('/', function (req, res, next) {
    createFile("ip_and_time", 'ip address: ' + ip.address() + ' ,time: ' + new Date().getHours() + ':' + new Date().getMinutes());
    res.send('write to file');
});




module.exports = router;