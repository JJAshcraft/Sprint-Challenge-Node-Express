const express = require('express');
const router = express.Router();
const actionsDb = require('../../data/helpers/actionModel');



//CREATE//ADD A NEW ACTION
router.post('/', (req, res, next) => {

    let project_id = req.body.project_id;
    let description = req.body.description;
    let completed = req.body.completed;
    let notes = req.body.notes;
    if (req.body.completed === "true" || req.body.completed === true) {
        completed = true;
    } else {
        completed = false;
    }
    let newAction = {
        project_id,
        description,
        completed,
        notes,
    }
    if (newAction.description.length > 128) {
        return next({
            code: 128
        })
    }
    if (!newAction.description || !newAction.project_id || !newAction.notes) {
        return next({
            code: 400
        })
    } else {
        actionsDb.insert(newAction)
            .then(action => {
                console.log(action)
                res.status(200).json(action)
            })
            .catch(err => next({
                err,
                code: err.code
            }))
    }
})


//GET ALL ACTIONS
router.get('/', (req, res, next) => {
    actionsDb.get()
        .then(actions => {
            if (!actions || actions.length === 0) {
                return next({
                    code: 404
                })
            } else {
                console.log(actions)
                res.status(200).json(actions)
            }
        })
        .catch(err => next({
            code: 500
        }))
})

//GET A SPECIFIC ACTION
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    actionsDb.get(id)
        .then(action => {
            if (!action || action.length === 0) {
                return next({
                    code: 404
                })
            } else {
                console.log(action)
                res.status(200).json(action)
            }
        })
        .catch(err => next({
            code: 500
        }))
})

//UPDATE//UPDATE ACTION

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let project_id = req.body.project_id;
    let notes = req.body.notes;
    let description = req.body.description;
    let completed = req.body.completed;
    if (req.body.completed === "true" || req.body.completed === true) {
        completed = true;
    } else {
        completed = false;
    }
    let updatedAction = {
        notes,
        project_id,
        description,
        completed,

    }
    if (updatedAction.description.length > 128) {
        return next({
            code: 128,
            message: "Description Field: Character limit exceeded (128 characters)."
        })
    }
    if (!updatedAction.description || !updatedAction.project_id || !updatedAction.notes) {
        return next({
            code: 400
        })
    } else {
        actionsDb.update(id, updatedAction)
            .then(action => {
                console.log(action)
                res.status(200).json(action)
            })
            .catch(err => next({
                err,
                code: err.code
            }))
    }
})

//DELETE//DELETE A PROJECT

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    actionsDb.remove(id)
        .then(action => {
            if (!action) {
                return next({
                    code: 404
                })
            } else {
                console.log(action)
                res.status(200).json('Action successfully deleted')
            }
        })
        .catch(err => next({
            code: 500
        }))
})






module.exports = router;