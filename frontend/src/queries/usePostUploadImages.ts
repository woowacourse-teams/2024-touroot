import { useMutation } from "@tanstack/react-query";

import { client } from "@apis/client";

export const usePostUploadImages = () => {
  return useMutation<string[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await client.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
