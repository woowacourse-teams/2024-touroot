import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { MAX_HEIGHT, MAX_WIDTH } from "@constants/resize";

const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = URL.createObjectURL(file);
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
  quality: number = 0.8,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error(ERROR_MESSAGE_MAP.imageConvert));
        }
      },
      format,
      quality,
    );
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
    throw new Error(ERROR_MESSAGE_MAP.imageConvert);
  }
};

export default resizeAndConvertImage;
