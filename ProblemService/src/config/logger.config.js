const winston = require("winston");
const { LOGGER_DB_URL } = require("./server.config");

require("winston-mongodb");

const allowedTransports = [];
allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),

      //first argument  in combine method is defining how we want the timestamp to come
      winston.format.timestamp({
        format: "YYYY-MM-DD HH-mm-ss",
      }),
      //second argument in combine method is defines what exactly we want to print in the log
      winston.format.printf(
        (log) => `${log.timestamp}  [${log.level.toUpperCase()}]:${log.message}`
      )
    ),
  })
);

// allowedTransports.push(
//   new winston.transports.MongoDB({
//     level: "error",
//     db: LOGGER_DB_URL,
//     collection: "logs",
//     format: winston.format.combine(
//       winston.format.errors({ stack: true }),

//       //first argument  in combine method is defining how we want the timestamp to come
//       winston.format.timestamp({
//         format: "YYYY-MM-DD HH-mm-ss",
//       }),
//       //second argument in combine method is defines what exactly we want to print in the log
//       winston.format.printf(
//         (log) =>
//           `${log.timestamp}  [${log.level.toUpperCase()}]:${log.message}:${
//             log.stack
//           }`
//       )
//     ),
//   })
// );

allowedTransports.push(
  new winston.transports.File({
    filename: `app.log`,
  })
);

const logger = winston.createLogger({
  format: winston.format.combine(
    //first argument  in combine method is defining how we want the timestamp to come
    winston.format.timestamp({
      format: "YYYY-MM-DD HH-mm-ss",
    }),
    //second argument in combine method is defines what exactly we want to print in the log
    winston.format.printf(
      (log) => `${log.timestamp}  [${log.level.toUpperCase()}]:${log.message}`
    )
  ),
  transports: allowedTransports,
});

module.exports = logger;
