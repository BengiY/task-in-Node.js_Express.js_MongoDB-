var express = require('express');
var router = express.Router();
const {Person} = require('../collections/person');
const {Profession} = require("../collections/profession");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//שאלה מספר 1
router.get('/average-age-of-the-unemployed', function(req, res, next) {
  
  var condition = { "profession": null }
  Person.aggregate([{ $match: condition }, {
    $group: {
      _id: "1",
      avg: {
        $avg: "$age"
      }
    }
  }
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail User."
      });
    });
});
//שאלה מספר 2
router.get('/high-salary-and-number-of-employed', function(req, res, next) {
  Profession.aggregate([
    {
        '$sort': {
            'salary': -1
        }
    }, {
        '$limit': 1
    }
])
    .then(data => {
      var lowSalaryFromHigest=data[0]._id;
      Person.aggregate(      [
        {
          '$match': {
              'profession': lowSalaryFromHigest
          }
      }, {
            '$count': 'The number of people employed in the profession with the highest salary'
        }
    ])
        .then(data1 => {
          res.send(data1);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving detail of Profession"
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail User."
      });
    });
});
//שאלה מספר 3
router.get('/the-five-most-lucrative-professions', function(req, res, next) {
  
  Profession.aggregate([
    {
        '$sort': {
            'salary': -1
        }
    }, {
        '$limit': 5
    }
])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail of Profession."
      });
    });
});
//שאלה מספר 4
router.get('/get-ages-without-duplications', function(req, res, next) {
  Person.aggregate([
 {
        '$group': {
            '_id': 1, 
            'ageArray': {
                '$addToSet': '$age'
            }
        }
    }
])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail User."
      });
    });
});
//שאלה מספר 5
router.get('/get-name-and-salary/:name/:salary', function(req, res,next) {

  Person.aggregate([
    {
        '$match': {
            'name': req.params.name
        }
    }
])
    .then(data => {
      if(data[0].profession==null)
      { res.send('you have no profession');}
      else
     {
      res.send(data);
      try {
        Profession.findOneAndUpdate(
          { "_id" : data[0].profession },
          { $set: { "salary" : req.params.salary} }
       );
     } catch (e) {
        console.log(e);
     }

     }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detail profession."
      });
    });
});
module.exports = router;
