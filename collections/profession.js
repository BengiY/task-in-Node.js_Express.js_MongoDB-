const {Schema, mongoose} = require('mongoose');

const ProfessionSchema = {
    name: {type: String},
    salary: {type: Number},
    avgAge: {type: Number}
}

const ProfessionModel = db.model('profession', ProfessionSchema);

module.exports.Profession = ProfessionModel;
