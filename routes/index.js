const express = require('express');
const router = express.Router();
const axios = require('axios');
const {Person} = require('../collections/person');
const {Profession} = require("../collections/profession");

router.get('/', async (req, res) => {
    let person = await Person.findOne();
    let profession = await Profession.findOne();
    return res.json({code: 200, data: {person, profession}})
})
router.get('/populate-mongo', async (req, res, next) => {
    let {data: persons} = await axios.get("https://raw.githubusercontent.com/dominictarr/random-name/master/names.json");
    let {data: professions} = await axios.get('https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/occupations.json');
    professions = professions.occupations;
    professions = professions.map(p => ({
        name: p,
        salary: getRandomInt(6000, 30000),
        avgAge: getRandomInt(21, 120)
    }))
    await Profession.insertMany(professions)
    // persons = persons.map(p=>({
    //     name:p,
    //     age:getRandomInt(0,30),
    // }))
    for (let person of persons) {
        let hasProfession = getRandomInt(0, 3) > 1;
        if (hasProfession) {
            let pro = await Profession.find().limit(1).skip(getRandomInt(0, professions.length));
            pro = pro[0];
            Person.findOneAndUpdate({name: person}, {
                $set: {
                    name: person,
                    age: getRandomInt(21, 120),
                    profession: pro._id
                }
            }, {upsert: true}).then()
        } else {
            Person.findOneAndUpdate({name: person}, {
                $set: {
                    name: person,
                    age: getRandomInt(21, 120),
                    profession: null
                }
            }, {upsert: true}).then()
        }

    }

    return res.json({code: 200})

});




module.exports = router;
