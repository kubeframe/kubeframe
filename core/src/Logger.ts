import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.LOG_FORMAT === 'pretty' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    } : undefined,
});

export function getLogger() {
    return logger;
}
