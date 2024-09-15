type SelectorMap<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K] extends object ? SelectorMap<T[K]> : never;
};

export const generateSelectors = <T extends object>(
  dataMap: T,
  prefix: string = "",
): SelectorMap<T> => {
  const result = {} as SelectorMap<T>;

  for (const [key, value] of Object.entries(dataMap)) {
    if (typeof value === "string") {
      result[key as keyof T] =
        `[data-cy="${prefix}${value}"]` as (typeof result)[keyof typeof result];
    } else if (typeof value === "object" && value !== null) {
      result[key as keyof T] = generateSelectors(
        value,
        prefix,
      ) as (typeof result)[keyof typeof result];
    }
  }

  return result;
};
