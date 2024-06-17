const winston = require('winston');
const { combine, timestamp, printf, cli } = winston.format;

const logname = 'latest.log'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: combine(
                cli(),
                timestamp({
                    format: 'DD/MM/YYYY HH:mm:ss',
                }),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.File({
            filename: logname,
            format: combine(
                timestamp({
                    format: 'DD/MM/YYYY HH:mm:ss',
                }),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        })
    ],
});


module.exports = logger;
module.exports.init = function () {
    // LIMPAR O LOG AO INICIAR
    const fs = require('fs');
    fs.writeFileSync(logname, '');

    logger.info(`Cleared ${logname}`)
}