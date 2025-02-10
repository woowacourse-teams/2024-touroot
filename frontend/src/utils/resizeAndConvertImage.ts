import heic2any from "heic2any";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { MAX_HEIGHT, MAX_WIDTH } from "@constants/resize";

const loadImageFromFile = async (file: File): Promise<HTMLImageElement> => {
  let processedFile = file;
  if (file.type === "image/heic" || file.type === "image/heif") {
    try {
      const blob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8,
      });

      processedFile = new File(
        [Array.isArray(blob) ? blob[0] : blob],
        file.name.replace(/\.heic$/i, ".jpg"),
        { type: "image/jpeg" },
      );
    } catch (error) {
      throw new Error(`HEIC 이미지를 변환하는데 실패 했습니다. 다시 시도해주세요.`);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      reject(
        new Error(`이름 - ${file.name}, 타입 - ${file.type}인 이미지를 업로드하는데 실패했습니다.`),
      );
    };
    img.src = URL.createObjectURL(processedFile);
  });
};

const resizeImage = (
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number,
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(img, 0, 0, width, height);
  return canvas;
};

const convertCanvasToBlob = (
  canvas: HTMLCanvasElement,
  format: string = "image/webp",
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error(ERROR_MESSAGE_MAP.imageConvert));
      }
    }, format);
  });
};

const createFileFromBlob = (
  blob: Blob,
  originalFileName: string,
  newExtension: string = "webp",
): File => {
  const fileName = originalFileName.replace(/\.[^/.]+$/, "") + `.${newExtension}`;
  return new File([blob], fileName, {
    type: `image/${newExtension}`,
    lastModified: new Date().getTime(),
  });
};

const resizeAndConvertImage = async (
  file: File,
  maxWidth: number = MAX_WIDTH,
  maxHeight: number = MAX_HEIGHT,
): Promise<File> => {
  try {
    const img = await loadImageFromFile(file); // 1. 이미지 로드
    const resizedCanvas = resizeImage(img, maxWidth, maxHeight); // 2. 이미지 리사이즈
    const blob = await convertCanvasToBlob(resizedCanvas); // 3. Blob으로 변환
    const newFile = createFileFromBlob(blob, file.name); // 4. Blob을 파일로 변환
    return newFile;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE_MAP.imageConvert);
  }
};

export default resizeAndConvertImage;
