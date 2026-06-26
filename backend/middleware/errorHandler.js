'use strict';

const winston = require('winston');
const express = require('express');

const app = express();

// Set up logging with Winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log' }),
        new winston.transports.Console()
    ]
});

function errorHandler(err, req, res, next) {
    // Log the error
    logger.error(err.message, { stack: err.stack });
    
    // Set the HTTP status code
    const statusCode = err.status || 500;
    res.status(statusCode);
    
    // Send a generic error message unless in production
    if (process.env.NODE_ENV === 'production') {
        res.json({ error: 'Internal Server Error' });
    } else {
        res.json({ error: err.message, stack: err.stack });
    }
}

app.use(errorHandler);

module.exports = errorHandler;
