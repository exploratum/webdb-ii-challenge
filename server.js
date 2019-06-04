const express = require('express');
const server = express();

const helmet = require('helmet');

const zooRouter = require('./routers/zooRouter.js');
const bearRouter = require('./routers/bearRouter.js')



server.use(express.json());
server.use(helmet());

server.get('./', () => {
    "All Zoos you want to visit!"
});

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);


module.exports = server;


