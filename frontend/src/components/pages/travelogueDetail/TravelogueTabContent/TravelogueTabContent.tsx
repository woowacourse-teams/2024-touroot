import { css } from "@emotion/react";

import { Place } from "@type/domain/travelogue";

import { Box } from "@components/common";
import PlaceDetailCard from "@components/pages/travelogueDetail/PlaceDetailCard/PlaceDetailCard";

import * as S from "./TravelogueTabContent.styled";

const TravelogueTabContent = ({ places }: { places: Place[] }) => {
  if (places.length === 0) return null;

  return (
    <div>
      {/* <GoogleMapView places={convertDayToPosition(places) ?? []} /> */}
      <S.BoxContainer>
        {places.map((place, index) => (
          <Box key={place.name} placeName={`${index + 1}. ${place.name}`} tags={[]} />
        ))}
      </S.BoxContainer>
      <S.Title
        css={css`
          margin-left: 1.6rem;
        `}
      >
        여행 장소 살펴보기
      </S.Title>
      <div style={{ paddingBottom: "40px", marginTop: "3.2rem" }}>
        {places.map((place, index) => (
          <PlaceDetailCard
            key={`${place.name}-${index}`}
            index={index + 1}
            title={place.name}
            imageUrls={place.photoUrls}
            description={place.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TravelogueTabContent;
