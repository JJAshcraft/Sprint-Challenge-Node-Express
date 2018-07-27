const express = require('express');
const router = express.Router();
const actionsDb = require('../../data/helpers/actionModel');

//GET ALL ACTIONS
router.get('/', (req, res, next) => {
    actionsDb.get()
    .then(actions=> {
        if(!actions || actions.length===0) {
            return next({code:404})
        }else {
        console.log(actions)
        res.status(200).json(actions)
        }
    })
    .catch(err=> next({code: 500}))
})

module.exports = router;