import { useState } from "react";

import useGetTags from "@queries/useGetTags";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

const useTagSelection = () => {
  const { data: tags } = useGetTags();

  const [selectedTagIDs, setSelectedTagIDs] = useState<number[]>([]);

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

      if (newSelectedTagIDs.length > FORM_VALIDATIONS_MAP.tags.maxCount) return prevSelectedTagIDs;

      return newSelectedTagIDs;
    });
  };

  return { selectedTagIDs, createSortedTags, handleClickTag };
};

export default useTagSelection;
