export abstract class Logger {
  abstract log(level: string, message: string, meta: MetaType): void

  abstract trace(level: string, name: string, meta?: MetaType): SpanType

  abstract error(message: string, meta?: MetaType): void
  abstract warn(message: string, meta?: MetaType): void
  abstract info(message: string, meta?: MetaType): void
  abstract verbose(message: string, meta?: MetaType): void
  abstract debug(message: string, meta?: MetaType): void
  abstract silly(message: string, meta?: MetaType): void
}

export type SpanType = {
  name: string,
  end: () => void
}

export type MetaType = {
  [key: string]: string | number | boolean | MetaType
}