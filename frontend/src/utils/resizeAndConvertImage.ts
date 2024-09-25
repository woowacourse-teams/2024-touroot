import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { MAX_HEIGHT, MAX_WIDTH } from "@constants/resize";

const resizeAndConvertImage = (
  file: File,
  maxWidth: number = MAX_WIDTH,
  maxHeight: number = MAX_HEIGHT,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const aspectRatio = img.width / img.height;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const newFile = new File([blob], fileName, {
              type: "image/webp",
              lastModified: new Date().getTime(),
            });
            resolve(newFile);
          } else {
            reject(new Error(ERROR_MESSAGE_MAP.imageConvert));
          }
        },
        "image/webp",
        0.8,
      );
    };
    img.onerror = (error) => reject(error);
    img.src = URL.createObjectURL(file);
  });
};

export default resizeAndConvertImage;
