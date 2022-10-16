import pino, { type LoggerOptions } from "pino";

const defaultOptions: LoggerOptions = {
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
        }
      : undefined,
};

export const logger = pino(defaultOptions);

export const loggerCustom = (options: LoggerOptions) => {
  return pino({
    ...defaultOptions,
    ...options,
  });
};
