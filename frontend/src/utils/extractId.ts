export const extractId = (pathname: string) => {
  return pathname.replace(/[^\d]/g, "") ?? "";
};
