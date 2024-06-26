const rateLimit = require('express-rate-limit');
const logger = require("../utils/logger");

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes for them to try again
    max: 5, // limit each IP to 5 login requests per 'window' per minute
    message:
        {message: 'Too many login attempts. Please try again after 60 seconds.'},
    handler: (req, res, next, options)=>{
        logger.error(`Too many requests: ${options.message.message}\t${req.method}
        \t${req.url}\t${req.headers.origin}`, 'errLog.log');
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;