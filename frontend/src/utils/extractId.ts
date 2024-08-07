export const extractId = (pathname: string) => {
  return pathname.split("/").pop() ?? "";
};
