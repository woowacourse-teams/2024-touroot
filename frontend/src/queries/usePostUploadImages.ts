import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";

export const usePostUploadImages = () => {
  return useMutation<string[], ApiError | AxiosError<ErrorResponse>, File[]>({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();

      files.forEach((file) => {
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
};
