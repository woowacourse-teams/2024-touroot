// import React from "react";
import type { StoryObj } from "@storybook/react";

// import MultiImageUpload from "./MultiImageUpload";

const meta = {
  title: "common/MultiImageUpload",
  component: <></>,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// export const WithImages: Story = {
//   decorators: [
//     (Story) => {
//       React.useEffect(() => {
//         const fetchAndCreateFile = async () => {
//           const imageUrl =
//             "https://api.allorigins.win/raw?url=https://i.pinimg.com/474x/df/6d/1a/df6d1a665685af3c0eb7e4c6a0c40169.jpg";
//           const file = new File([await fetch(imageUrl).then((r) => r.blob())], "example.png", {
//             type: "image/png",
//           });

//           const files = Array(3).fill(file);

//           const dataTransfer = new DataTransfer();

//           files.map((file) => dataTransfer.items.add(file));

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

// export const WithManyImages: Story = {
//   decorators: [
//     (Story) => {
//       React.useEffect(() => {
//         const fetchAndCreateFile = async () => {
//           const imageUrl =
//             "https://api.allorigins.win/raw?url=https://i.pinimg.com/474x/df/6d/1a/df6d1a665685af3c0eb7e4c6a0c40169.jpg";
//           const file = new File([await fetch(imageUrl).then((r) => r.blob())], "example.png", {
//             type: "image/png",
//           });

//           const files = Array(7).fill(file);

//           const dataTransfer = new DataTransfer();

//           files.map((file) => dataTransfer.items.add(file));

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
