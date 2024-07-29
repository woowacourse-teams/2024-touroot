import { createContext, useContext, useState } from "react";

import { Travelogue } from "@type/domain/travelogue";

const TravelogueContext = createContext<Travelogue | null>(null);
const SaveTravelogueContext = createContext<(travelogue: Travelogue) => void>(() => {});

export const TravelogueProvider = ({ children }: React.PropsWithChildren) => {
  const [travelogue, setTravelogue] = useState<Travelogue | null>(null);

  const saveTravelogue = (travelogue: Travelogue) => {
    setTravelogue(travelogue);
  };

  return (
    <TravelogueContext.Provider value={travelogue}>
      <SaveTravelogueContext.Provider value={saveTravelogue}>
        {children}
      </SaveTravelogueContext.Provider>
    </TravelogueContext.Provider>
  );
};

export const useTravelogueContext = () => {
  const travelogue = useContext(TravelogueContext);
  const saveTravelogue = useContext(SaveTravelogueContext);

  return { travelogue, saveTravelogue };
};
