export const removeEmoji = (string: string) =>
  string.replace(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu, "").trim();

const joinStringsWithoutEmojis = (strings: string[]) =>
  strings.map((string) => removeEmoji(string)).join(", ");

const removeEmojis = (stringArray: string[]) => {
  return joinStringsWithoutEmojis(stringArray);
};

export default removeEmojis;
