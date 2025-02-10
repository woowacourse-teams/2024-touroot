export type Direction = "vertical" | "horizontal";
export type VerticalKey = "ArrowDown" | "ArrowUp";
export type HorizontalKey = "ArrowRight" | "ArrowLeft";
export type ArrowKey = VerticalKey | HorizontalKey;
export type IncrementValue = 1 | -1;

export interface KeyActions {
  vertical: Record<VerticalKey, IncrementValue>;
  horizontal: Record<HorizontalKey, IncrementValue>;
}
