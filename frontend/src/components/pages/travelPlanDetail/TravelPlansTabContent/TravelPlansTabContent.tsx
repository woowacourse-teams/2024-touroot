import type { TravelPlanPlace } from "@type/domain/travelPlan";

import { Box, GoogleMapLoadScript, GoogleMapView, Icon } from "@components/common";
import Skeleton from "@components/common/Skeleton/Skeleton";
import TravelPlanTodoItem from "@components/pages/travelPlanDetail/TravelPlanTodoItem/TravelPlanTodoItem";

import theme from "@styles/theme";

import * as S from "./TravelPlansTabContent.styled";

const TravelPlansTabContent = ({ places }: { places: TravelPlanPlace[] }) => {
  const positions = places.map((place) => {
    return { lat: Number(place.position.lat), lng: Number(place.position.lng) };
  });

  if (places.length === 0) return null;

  return (
    <div>
      <GoogleMapLoadScript loadingElement={<Skeleton width="100%" height="23rem" />}>
        <GoogleMapView places={positions} />
      </GoogleMapLoadScript>
      <S.BoxContainer>
        {places.map((place, index) => (
          <Box
            key={place.id}
            css={S.boxStyle}
            placeName={`${index + 1}. ${place.placeName}`}
            icon={
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
            }
          >
            <S.TodoListContainer>
              {place.todos?.map((todo) => <TravelPlanTodoItem key={todo.id} todo={todo} />)}
            </S.TodoListContainer>
          </Box>
        ))}
      </S.BoxContainer>
    </div>
  );
};

export default TravelPlansTabContent;
