const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { restricted } = require('./auth/auth-middleware');

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const eventsRouter = require('./events/events-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', restricted, userRouter);
server.use('/api/auth', authRouter);
server.use('/api/events', restricted, eventsRouter);

server.use((err, req, res, next) => {
	//eslint-disable-line

	res.status(500).json({ message: err.message });
});

module.exports = server;
