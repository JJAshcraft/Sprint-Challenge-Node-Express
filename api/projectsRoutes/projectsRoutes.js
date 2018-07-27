const express = require('express');
const router = express.Router();
const projectsDb = require('../../data/helpers/projectModel')

//CREATE//ADD A NEW PROJECT
router.post('/', (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    let completed = req.body.completed;
    if (req.body.completed === "true" || req.body.completed === true) {
        completed = true;
    } else {
        completed = false;
    }
    let newProject = {
        name,
        description,
        completed,
    }
    if (newProject.name.length > 128) {
        return next({
            code: 128,
            message: "Name Field: Character limit exceeded (128 characters)."
        })
    }
    if (!newProject.description || !newProject.name) {
        return next({
            code: 400
        })
    } else {
        projectsDb.insert(newProject)
            .then(projects => {
                console.log(projects)
                res.status(200).json(projects)
            })
            .catch(err => next({
                err,
                code: err.code
            }))
    }
})


//READ// GET ALL PROJECTS
router.get('/', (req, res, next) => {
    projectsDb.get()
        .then(projects => {
            if (!projects || projects.length === 0) {
                return next({
                    code: 404
                })
            } else {
                console.log(projects)
                res.status(200).json(projects)
            }
        })
        .catch(err => next({
            code: 500
        }))
})

//READ// GET A SPECIFIC PROJECT
router.get('/:project_id', (req, res, next) => {
    let project_id = req.params.project_id;
    projectsDb.get(project_id)
        .then(project => {
            if (!project || project.length === 0) {
                return next({
                    code: 404
                })
            } else {
                console.log(project)
                res.status(200).json(project)
            }
        })
        .catch(err => next({
            code: 500
        }))
})

//READ// GET ALL ACTIONS FOR A SPECIFIC PROJECT
router.get('/:project_id/actions', (req, res, next) => {
    let project_id = req.params.project_id;
    projectsDb.getProjectActions(project_id)
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

//UPDATE//UPDATE PROJECT

router.put('/:project_id', (req, res, next) => {
    let project_id = req.params.project_id;
    let name = req.body.name;
    let description = req.body.description;
    let completed = req.body.completed;
    if (req.body.completed === "true" || req.body.completed === true) {
        completed = true;
    } else {
        completed = false;
    }
    let updatedProject = {
        name,
        description,
        completed,
    }
    if (updatedProject.name.length > 128) {
        return next({
            code: 128,
            message: "Name Field: Character limit exceeded (128 characters)."
        })
    }
    if (!updatedProject.description || !updatedProject.name) {
        return next({
            code: 400
        })
    } else {
        projectsDb.update(project_id, updatedProject)
            .then(projects => {
                console.log(projects)
                res.status(200).json(projects)
            })
            .catch(err => next({
                err,
                code: err.code
            }))
    }
})

//DELETE//DELETE A PROJECT

router.delete('/:project_id', (req, res, next) => {
    let project_id = req.params.project_id;
    projectsDb.remove(project_id)
        .then(project => {
            if (!project) {
                return next({
                    code: 404
                })
            } else {
                console.log(project)
                res.status(200).json('Project successfully deleted')
            }
        })
        .catch(err => next({
            code: 500
        }))
})




module.exports = router;