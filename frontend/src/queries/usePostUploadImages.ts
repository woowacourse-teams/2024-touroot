import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

import resizeAndConvertImage from "@utils/resizeAndConvertImage";

interface MutationFnVariables {
  files: File[];
  maxWidth?: number;
  maxHeight?: number;
}

export const usePostUploadImages = () => {
  const { isPaused, ...rest } = useMutation<
    string[],
    ApiError | AxiosError<ErrorResponse>,
    MutationFnVariables
  >({
    mutationFn: async ({ files, maxWidth, maxHeight }: MutationFnVariables) => {
      const processedFiles = await Promise.all(
        files.map((file) => resizeAndConvertImage(file, maxWidth, maxHeight)),
      );
      const formData = new FormData();

      processedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await authClient.post(API_ENDPOINT_MAP.image, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return { isPaused, ...rest };
};
