const {Schema} = require('mongoose');

const PersonSchema = {
    age: {type: Number},
    name: {type: String},
    profession: {type: Schema.Types.ObjectId, ref: 'Profession'}
}

const PersonModel = db.model('person', PersonSchema);

module.exports.Person = PersonModel;
