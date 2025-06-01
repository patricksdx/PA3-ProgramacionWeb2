import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const logger = pino({
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  level: isDev ? "debug" : "info",
});

export default logger;
