// import React from "react";

// import type { Meta, StoryObj } from "@storybook/react";

// import ThumbnailUpload from "./ThumbnailUpload";

const meta = {
  title: "common/ThumbnailUpload",
  component: <></>,
};

export default meta;

// type Story = StoryObj<typeof meta>;

export const Default = {};

// export const WithImage: Story = {
//   decorators: [
//     (Story) => {
//       React.useEffect(() => {
//         const fetchAndCreateFile = async () => {
//           const imageUrl =
//             "https://api.allorigins.win/raw?url=https://i.pinimg.com/474x/df/6d/1a/df6d1a665685af3c0eb7e4c6a0c40169.jpg";
//           const file = new File([await fetch(imageUrl).then((r) => r.blob())], "example.png", {
//             type: "image/png",
//           });

//           const dataTransfer = new DataTransfer();
//           dataTransfer.items.add(file);

//           const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
//           if (inputElement) {
//             Object.defineProperty(inputElement, "files", {
//               value: dataTransfer.files,
//             });

//             const event = new Event("change", { bubbles: true });
//             inputElement.dispatchEvent(event);
//           }
//         };

//         fetchAndCreateFile();
//       }, []);

//       return <Story />;
//     },
//   ],
// };
