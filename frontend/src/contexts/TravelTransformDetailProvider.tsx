import { createContext, useContext, useState } from "react";

import type { TravelTransformDetail } from "@type/domain/travelTransform";

const TravelogueContext = createContext<TravelTransformDetail | null>(null);
const SaveTravelogueContext = createContext<(travelogue: TravelTransformDetail) => void>(() => {});

export const TravelTransformDetailProvider = ({ children }: React.PropsWithChildren) => {
  const [travelTransformDetail, setTravelTransformDetail] = useState<TravelTransformDetail | null>(
    null,
  );

  const saveTravelTransformDetail = (transformDetail: TravelTransformDetail) => {
    setTravelTransformDetail(transformDetail);
  };

  return (
    <TravelogueContext.Provider value={travelTransformDetail}>
      <SaveTravelogueContext.Provider value={saveTravelTransformDetail}>
        {children}
      </SaveTravelogueContext.Provider>
    </TravelogueContext.Provider>
  );
};

export const useTravelTransformDetailContext = () => {
  const transformDetail = useContext(TravelogueContext);
  const saveTransformDetail = useContext(SaveTravelogueContext);

  return { transformDetail, saveTransformDetail };
};
