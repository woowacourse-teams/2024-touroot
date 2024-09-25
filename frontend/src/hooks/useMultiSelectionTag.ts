import { useCallback, useState } from "react";

import useGetTags from "@queries/useGetTags";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { STORAGE_KEYS_MAP } from "@constants/storage";

const useMultiSelectionTag = () => {
  const { data: tags } = useGetTags();

  const [selectedTagIDs, setSelectedTagIDs] = useState<number[]>(
    JSON.parse(localStorage.getItem(STORAGE_KEYS_MAP.selectedTagIDs) ?? "[]"),
  );
  const [animationKey, setAnimationKey] = useState(0);

  const onChangeSelectedTagIDs = useCallback((newSelectedTagIDs: number[]) => {
    setSelectedTagIDs(newSelectedTagIDs);
    localStorage.setItem(STORAGE_KEYS_MAP.selectedTagIDs, JSON.stringify(newSelectedTagIDs));
  }, []);

  const createSortedTags = () => {
    if (!tags) return [];

    const selected = tags.filter((tag) => selectedTagIDs.includes(tag.id));
    const unselected = tags.filter((tag) => !selectedTagIDs.includes(tag.id));

    return [...selected, ...unselected];
  };

  const handleClickTag = (id: number) => {
    setSelectedTagIDs((prevSelectedTagIDs) => {
      const newSelectedTagIDs = prevSelectedTagIDs.includes(id)
        ? prevSelectedTagIDs.filter((selectedTagID) => selectedTagID !== id)
        : [...prevSelectedTagIDs, id];

      if (newSelectedTagIDs.length > FORM_VALIDATIONS_MAP.tags.maxCount) {
        localStorage.setItem(STORAGE_KEYS_MAP.selectedTagIDs, JSON.stringify(prevSelectedTagIDs));
        return prevSelectedTagIDs;
      }

      setAnimationKey((prev) => prev + 1);
      localStorage.setItem(STORAGE_KEYS_MAP.selectedTagIDs, JSON.stringify(newSelectedTagIDs));

      return newSelectedTagIDs;
    });
  };

  return {
    selectedTagIDs,
    onChangeSelectedTagIDs,
    sortedTags: createSortedTags(),
    handleClickTag,
    animationKey,
  };
};

export default useMultiSelectionTag;
