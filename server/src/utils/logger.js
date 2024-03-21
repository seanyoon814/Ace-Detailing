const winston = require('winston');
const path = require('path');

const { format, transports } = winston;

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    format.splat()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),
    new transports.File({
      filename: process.env.ENV == "prod" ? "/tmp/combined.log" : 'logs/combined.log',
      format: format.combine(
        format.json()
      )
    })
  ],
  exitOnError: false
})

module.exports = logger;