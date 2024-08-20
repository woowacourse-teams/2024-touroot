export const extractID = (pathname: string) => {
  return pathname.replace(/[^\d]/g, "") ?? "";
};
