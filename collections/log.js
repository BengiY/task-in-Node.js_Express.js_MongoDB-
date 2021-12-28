const {Schema, mongoose} = require('mongoose');

const LogSchema = {
    postOrGet:{type: String},
    ip: {type: String},
    time: {type: String},
}

const LogModel = db.model('log', LogSchema);

module.exports.Log = LogModel;
