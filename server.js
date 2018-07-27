//imports

const express = require('express');
const morgan = require('morgan');
//import routes
const apiRoutes = require('./api/api');

//init
server = express();

// middleware
server.use(express.json());
server.use(morgan('dev'));

// external routers
server.use('/api', apiRoutes);

server.use((err, req, res, next) => {
    switch (err.code) {
        case 128:
            return res.send({
                "Error Code": err.code,
                "Details": res.body,
                "Message": err.message
            });
        case 404:
            return res.status(404).send({
                "Error Code": err.code,
                "Details": res.body,
                "Message": "Requested resource is not found."
            });

        case 400:
            return res.status(400).send({
                "Error Code": err.code,
                "Details": res.body,
                "Message": "Cancelled. Missing required information"
            });

        default:
            return res.status(500).send({
                "Error Code": err.code,
                "Details": res.body,
                "Message": "Server error. please contact system administrator."
            });
    }
});

server.use((req, res, next) => res.send('Please contact your system administrator, unknown error.'));

server.listen(8000, () => console.log('n\*******server running*******'))