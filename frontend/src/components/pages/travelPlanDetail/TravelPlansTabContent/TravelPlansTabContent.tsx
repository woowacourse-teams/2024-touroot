import type { Place } from "@type/domain/travelogue";

import { Box, GoogleMapLoadScript, GoogleMapView } from "@components/common";

import * as S from "./TravelPlansTabContent.styled";

const TravelPlansTabContent = ({ places }: { places: Place[] }) => {
  if (places.length === 0) return null;

  const positions = places.map((place) => {
    return { lat: Number(place.position.lat), lng: Number(place.position.lng) };
  });

  return (
    <div>
      <GoogleMapLoadScript libraries={["places", "maps"]}>
        <GoogleMapView places={positions} />
      </GoogleMapLoadScript>
      <S.BoxContainer>
        {places.map((place, index) => (
          <Box key={place.placeName} placeName={`${index + 1}. ${place.placeName}`} tags={[]} />
        ))}
      </S.BoxContainer>
    </div>
  );
};

export default TravelPlansTabContent;
