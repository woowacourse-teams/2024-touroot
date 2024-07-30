import { createContext, useContext, useState } from "react";

import { TransformDetail } from "@type/domain/travelogue";

const TravelogueContext = createContext<TransformDetail | null>(null);
const SaveTravelogueContext = createContext<(travelogue: TransformDetail) => void>(() => {});

export const TransformDetailProvider = ({ children }: React.PropsWithChildren) => {
  const [transformDetail, setTransformDetail] = useState<TransformDetail | null>(null);

  const saveTransformDetail = (transformDetail: TransformDetail) => {
    setTransformDetail(transformDetail);
  };

  return (
    <TravelogueContext.Provider value={transformDetail}>
      <SaveTravelogueContext.Provider value={saveTransformDetail}>
        {children}
      </SaveTravelogueContext.Provider>
    </TravelogueContext.Provider>
  );
};

export const useTransformDetailContext = () => {
  const transformDetail = useContext(TravelogueContext);
  const saveTransformDetail = useContext(SaveTravelogueContext);

  return { transformDetail, saveTransformDetail };
};
