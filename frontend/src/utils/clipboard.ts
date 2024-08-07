export const copyLinkToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error);
  }
};
