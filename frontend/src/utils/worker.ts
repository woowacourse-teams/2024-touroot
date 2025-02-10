export const startMocking = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("@mocks/broswer");

  return worker.start();
};
