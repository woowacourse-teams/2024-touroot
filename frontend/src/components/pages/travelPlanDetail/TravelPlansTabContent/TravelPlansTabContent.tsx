import type { TravelPlanPlace } from "@type/domain/travelPlan";

import { Box, GoogleMapLoadScript, GoogleMapView } from "@components/common";
import Skeleton from "@components/common/Skeleton/Skeleton";

import * as S from "./TravelPlansTabContent.styled";

const TravelPlansTabContent = ({ places }: { places: TravelPlanPlace[] }) => {
  if (places.length === 0) return null;

  const positions = places.map((place) => {
    return { lat: Number(place.position.lat), lng: Number(place.position.lng) };
  });

  return (
    <div>
      <GoogleMapLoadScript
        loadingElement={<Skeleton width="100%" height="23rem" />}
        libraries={["places", "maps"]}
      >
        <GoogleMapView places={positions} />
      </GoogleMapLoadScript>
      <S.BoxContainer>
        {places.map((place, index) => (
          <Box key={place.id} placeName={`${index + 1}. ${place.placeName}`} tags={[]} />
        ))}
      </S.BoxContainer>
    </div>
  );
};

export default TravelPlansTabContent;
