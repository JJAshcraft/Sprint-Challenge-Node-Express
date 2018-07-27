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

//UPDATE//UPDATE PROJECT

router.put('/:projectId', (req, res, next) => {
    let projectId = req.params.projectId;
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
    if (!newProject.description || !newProject.name) {
        return next({
            code: 400
        })
    } else {
        projectsDb.update(projectId, newProject)
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

router.delete('/:projectId', (req, res, next) => {
    let projectId = req.params.projectId;
    projectsDb.remove(projectId)
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