var express = require('express');
var router = express.Router();
const fs = require('fs');
const { Log } = require('../collections/log');
const { RateLimiterMemory } = require('rate-limiter-flexible');

var ip = require("ip");

const opts = {
    points: 10,
    duration: 15, 
  };
  
  const rateLimiter = new RateLimiterMemory(opts);
  
  const rateLimiterMiddleware = (req, res, next) => {
      rateLimiter.consume(ip.address())
        .then(() => {
          next();
        })
        .catch((rejRes) => {
          const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
          res.set('Retry-After', String(secs));
          res.status(429).send('Too Many Requests wait '+opts.duration+ ' minits');
        });
  
  };
  router.use(rateLimiterMiddleware);

//שאלה מספר 2 פרק 2
router.use('/', async (req, res, next) => {
    try {
        let requestMethod = req.method;
        await Log.bulkWrite([
                {
                  insertOne: {
                    document: {    postOrGet: requestMethod,
                        ip: ip.address(),
                        time:new Date().getHours() + ':' + new Date().getMinutes()}
                  }
                }
              ]);

        return res.json({ code: 200 })
    }
    catch (err) {
        console.log(err);
    }
    next();

});




module.exports = router;