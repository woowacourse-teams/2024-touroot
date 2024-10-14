import { useCallback, useState } from "react";

import useGetTags from "@queries/useGetTags";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

const useMultiSelectionTag = (key?: string) => {
  const { data: tags } = useGetTags();

  const [selectedTagIDs, setSelectedTagIDs] = useState<number[]>(
    key ? JSON.parse(localStorage.getItem(key) ?? "[]") : [],
  );
  const [animationKey, setAnimationKey] = useState(0);

  const handleChangeSelectedTagIDs = useCallback((newSelectedTagIDs: number[]) => {
    setSelectedTagIDs(newSelectedTagIDs);
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

      const isTagIDsSelectedMax = newSelectedTagIDs.length > FORM_VALIDATIONS_MAP.tags.maxCount;

      if (isTagIDsSelectedMax && key) localStorage.setItem(key, JSON.stringify(prevSelectedTagIDs));
      if (isTagIDsSelectedMax) return prevSelectedTagIDs;

      setAnimationKey((prev) => prev + 1);

      if (key) {
        localStorage.setItem(key, JSON.stringify(newSelectedTagIDs));
        window.scrollTo({ top: 0 });
      }

      return newSelectedTagIDs;
    });
  };

  return {
    selectedTagIDs,
    handleChangeSelectedTagIDs,
    sortedTags: createSortedTags(),
    handleClickTag,
    animationKey,
  };
};

export default useMultiSelectionTag;
