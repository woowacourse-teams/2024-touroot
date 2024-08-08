import { css } from "@emotion/react";

import type { TraveloguePlace } from "@type/domain/travelogue";

import { Box, GoogleMapLoadScript, GoogleMapView } from "@components/common";
import Skeleton from "@components/common/Skeleton/Skeleton";
import PlaceDetailCard from "@components/pages/travelogueDetail/TravelogueTabContent/PlaceDetailCard/PlaceDetailCard";

import * as S from "./TravelogueTabContent.styled";

const TravelogueTabContent = ({ places }: { places: TraveloguePlace[] }) => {
  if (places.length === 0) return null;

  return (
    <div>
      <GoogleMapLoadScript
        loadingElement={<Skeleton width="100%" height="120px" />}
        libraries={["maps"]}
      >
        <GoogleMapView
          places={places.map((place) => ({
            lat: Number(place.position.lat),
            lng: Number(place.position.lng),
          }))}
        />
        <S.BoxContainer>
          {places.map((place, index) => (
            <Box key={place.id} placeName={`${index + 1}. ${place.placeName}`} tags={[]} />
          ))}
        </S.BoxContainer>
        <S.Title
          css={css`
            margin-left: 1.6rem;
          `}
        >
          여행 장소 살펴보기
        </S.Title>
        <div
          style={{
            paddingBottom: "40px",
            marginTop: "3.2rem",
          }}
        >
          {places.map((place, index) => (
            <PlaceDetailCard
              key={`${place.id}-${index}`}
              index={index + 1}
              title={place.placeName}
              imageUrls={place?.photoUrls ?? []}
              description={place?.description ?? ""}
            />
          ))}
        </div>
      </GoogleMapLoadScript>
    </div>
  );
};

export default TravelogueTabContent;
