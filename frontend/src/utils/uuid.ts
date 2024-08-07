import { UUID_VALIDATE_REGEXP } from "@constants/uuid";

export const isUUID = (uuid: string) => {
  return typeof uuid === "string" && UUID_VALIDATE_REGEXP.test(uuid);
};
