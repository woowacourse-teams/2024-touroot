import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Box, GoogleMapView } from "@components/common";
import PlaceDetailCard from "@components/pages/travelogueDetail/PlaceDetailCard/PlaceDetailCard";

interface Place {
  name: string;
  photoUrls: string[];
  description: string;
  latitude: string;
  longitude: string;
}

const convertDayToPosition = (places: Place[]) => {
  return places.map((place) => ({
    lat: parseFloat(place.latitude),
    lng: parseFloat(place.longitude),
  }));
};

const TravelogueTabContent = ({ places }: { places: Place[] }) => {
  if (places.length === 0) return null;

  return (
    <div>
      <GoogleMapView places={convertDayToPosition(places) ?? []} />
      <BoxContainer>
        {places.map((place, index) => (
          <Box key={place.name} placeName={`${index + 1}. ${place.name}`} tags={[]} />
        ))}
      </BoxContainer>
      <Title
        css={css`
          margin-left: 1.6rem;
        `}
      >
        여행 장소 살펴보기
      </Title>
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

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 1.6rem;
  margin: 3.2rem 0;
`;

const Title = styled.span`
  ${(props) => props.theme.typography.title}
`;
