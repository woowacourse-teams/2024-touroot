import { WritableDraft } from "immer";

export const convertImageUrlConfig = (
  url:
    | string
    | WritableDraft<{
        url: string;
      }>,
) => (typeof url === "string" ? { url } : url);
