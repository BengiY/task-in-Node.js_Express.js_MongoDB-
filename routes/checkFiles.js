const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');
//שאלה מספר 3 פרק 2
//פונקציה להוספה לקובץ או יצירת קובץ חדש
function createFile(filename,value) {
    if (fs.existsSync('../files/'+filename+'.txt')) {
      console.log("exist")
      fs.appendFile('../files/'+filename+'.txt', value+'\n', function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    }
    else
    {
      fs.writeFile('../files/'+filename+'.txt', value+'\n', function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    }

}
router.use(fileUpload());
//העלאת קבצים , בדיקת סוג הקובץ, כתיבה לקובץ טקסט
router.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
        sampleFile = req.files.sampleFile;
        var mime = require("mime")
        var type = mime.getType(sampleFile.name);
          if (type == "image/jpeg") {
        uploadPath = '../public/' + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);

            res.send('File uploaded!');
        });
    }
    else{
        var ip = require("ip");
        console.log(sampleFile.name)
        createFile("ip_and_name_of_files_unapload",'ip address: '+ip.address()+' ,name of file: '+sampleFile.name);
        res.send('File unploaded!');
    }
});
module.exports = router;