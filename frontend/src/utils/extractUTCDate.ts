export const extractUTCDate = (date: Date | null) => {
  return date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0]
    : "";
};
