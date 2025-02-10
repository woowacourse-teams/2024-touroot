export const extractID = (pathname: string) => {
  return pathname.replace(/[^\d]/g, "") ?? "";
};

export const extractLastPath = (pathname: string) => {
  return pathname.split("/").pop() ?? "";
};
