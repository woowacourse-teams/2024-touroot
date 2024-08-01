import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isEmptyObject } from "@utils/object";

import type { TravelTransformDetail } from "@type/domain/travelTransform";

import useUser from "@hooks/useUser";

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

  const { user } = useUser();
  const navigate = useNavigate();

  const onTransformTravelDetail = (
    redirectUrl: string,
    travelTransformDetail?: TravelTransformDetail,
  ) => {
    if (isEmptyObject(user ?? {})) {
      alert("로그인 후 이용이 가능합니다.");
      navigate("/login");
    } else if (travelTransformDetail) {
      saveTransformDetail(travelTransformDetail);
      navigate(redirectUrl);
    }
  };

  return { transformDetail, onTransformTravelDetail };
};
