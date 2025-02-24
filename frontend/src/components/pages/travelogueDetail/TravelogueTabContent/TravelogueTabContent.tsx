import { css } from "@emotion/react";

import type { TraveloguePlace } from "@type/domain/travelogue";

import { Box, GoogleMapLoadScript, GoogleMapView, Icon } from "@components/common";
import Skeleton from "@components/common/Skeleton/Skeleton";
import PlaceDetailCard from "@components/pages/travelogueDetail/TravelogueTabContent/PlaceDetailCard/PlaceDetailCard";

import theme from "@styles/theme";

import * as S from "./TravelogueTabContent.styled";

const TravelogueTabContent = ({ places }: { places: TraveloguePlace[] }) => {
  if (places.length === 0) return null;

  return (
    <S.TravelogueTapContentLayout>
      <GoogleMapLoadScript loadingElement={<Skeleton width="100%" height="120px" />}>
        <GoogleMapView
          places={places.map((place) => ({
            lat: Number(place.position.lat),
            lng: Number(place.position.lng),
          }))}
        />
        <S.BoxContainer>
          {places.map((place, index) => (
            <Box key={place.id} placeName={`${index + 1}. ${place.placeName}`}>
              <S.IconLinkWrapper>
                <S.IconLink
                  href={`https://www.google.com/maps/search/${place.placeName}/@${place.position.lat},${place.position.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${place.placeName} 지도 상세보기 링크`}
                >
                  <Icon iconType="map-icon" color={theme.colors.primary} size="16" />
                </S.IconLink>
              </S.IconLinkWrapper>
            </Box>
          ))}
        </S.BoxContainer>
        <S.Title
          css={css`
            margin-left: 1.6rem;
          `}
        >
          여행 장소 살펴보기
        </S.Title>
        <div>
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
    </S.TravelogueTapContentLayout>
  );
};

export default TravelogueTabContent;
