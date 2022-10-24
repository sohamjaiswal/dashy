import * as express from 'express';
import { Message } from '@dashy/api-interfaces';
import { CORS_ORIGIN, MONGO_URI, PORT, SESSION_SECRET } from '@dashy/secrets';
import { default as router } from './routes';

import bodyParser = require('body-parser');
import cors = require('cors');
import session = require('express-session');
import cookieParser = require('cookie-parser');
import { Logger } from './util/logger/logger';
import { initPassport } from './middleware/auth/passport.auth';
import passport = require('passport');
import mongoose from 'mongoose';
// import passport = require("passport");

// Connect to DB
mongoose.connect(MONGO_URI, () => {
    Logger.info('MongoDB connected.');
});

// Start services
const app = express();

// Initialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(SESSION_SECRET));
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use(router);

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api-status', (req, res) => {
    res.send(greeting);
});

const port = PORT;
const server = app.listen(port, () => {
    Logger.info('Listening at http://localhost:' + port);
});
server.on('error', console.error);
