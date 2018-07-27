const express = require('express');
const router = express.Router();
const actionsRoutes = require('./actionsRoutes/actionsRoutes')
const projectsRoutes = require('./projectsRoutes/projectsRoutes')

router.use('/actions', actionsRoutes);
router.use('/projects', projectsRoutes);

router.use('/docs', (req, res, next)=> {
 res.redirect(301, 'https://documenter.getpostman.com/view/4722371/RWMLJkt8')
})

module.exports = router;