import { ERROR_MESSAGE_MAP, FORM_ERROR_MESSAGE_MAP } from "@constants/errorMessage";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const validateThumbnail = (file: File): string | null => {
  if (file.size > MAX_FILE_SIZE) {
    return ERROR_MESSAGE_MAP.imageUpload;
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return FORM_ERROR_MESSAGE_MAP.travelogue.invalidImageFormat;
  }
  return null;
};
