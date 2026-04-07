type LogContext = Record<string, unknown>;

export function logError(
  error: unknown,
  operationName?: string,
  context: LogContext = {}
): void {
  const prefix = operationName ? `[${operationName}]` : "[Network]";
  if (error instanceof Error) {
    console.error(prefix, error.message, context, error);
    return;
  }
  console.error(prefix, String(error), context);
}

export const logger = {
  error: (...args: unknown[]) => {
    console.error(...args);
  },
  info: (...args: unknown[]) => {
    console.info(...args);
  },
  warn: (...args: unknown[]) => {
    console.warn(...args);
  },
};
