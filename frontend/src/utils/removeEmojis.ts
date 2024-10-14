import type { Tag } from "@type/domain/travelogue";

const removeEmoji = (str: string) =>
  str.replace(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu, "").trim();

const isTagArray = (tags: unknown[]): tags is Tag[] =>
  tags.length > 0 &&
  tags[0] !== null &&
  typeof tags[0] === "object" &&
  "tag" in tags[0] &&
  typeof tags[0].tag === "string";

const processTagArray = (tags: Tag[]): string => tags.map((tag) => removeEmoji(tag.tag)).join(", ");

const processStringArray = (tags: string[]): string => tags.map(removeEmoji).join(", ");

const removeEmojis = (tags: Tag[] | string[] | string): string => {
  if (typeof tags === "string") {
    return removeEmoji(tags);
  }

  if (!Array.isArray(tags)) {
    return "";
  }

  const tagNames = isTagArray(tags) ? processTagArray(tags) : processStringArray(tags);
  return tagNames ? tagNames : "";
};

export default removeEmojis;
