export const isVerticalKey = (key: unknown): key is "ArrowDown" | "ArrowUp" => {
  return key === "ArrowDown" || key === "ArrowUp";
};

export const isHorizontalKey = (key: unknown): key is "ArrowRight" | "ArrowLeft" => {
  return key === "ArrowRight" || key === "ArrowLeft";
};

export const isArrowKey = (
  key: unknown,
): key is "ArrowDown" | "ArrowUp" | "ArrowRight" | "ArrowLeft" => {
  return isVerticalKey(key) || isHorizontalKey(key);
};
