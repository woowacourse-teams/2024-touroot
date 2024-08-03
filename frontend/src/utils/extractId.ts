export const extractId = (pathname: string) => {
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  return id;
};
