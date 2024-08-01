export const isEmptyObject = <T extends object>(object: T) =>
  Object.keys(object ?? {}).length === 0;
