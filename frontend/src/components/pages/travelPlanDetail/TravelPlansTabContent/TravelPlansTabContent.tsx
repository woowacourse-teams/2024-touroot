import type { TravelPlanPlace } from "@type/domain/travelPlan";

import { Box, GoogleMapLoadScript, GoogleMapView } from "@components/common";
import Skeleton from "@components/common/Skeleton/Skeleton";
import TravelPlanTodoItem from "@components/pages/travelPlanDetail/TravelPlanTodoItem/TravelPlanTodoItem";

import * as S from "./TravelPlansTabContent.styled";

const TravelPlansTabContent = ({ places }: { places: TravelPlanPlace[] }) => {
  const positions = places.map((place) => {
    return { lat: Number(place.position.lat), lng: Number(place.position.lng) };
  });

  if (places.length === 0) return null;

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

          <Box
            css={S.boxStyle}
            key={place.id}
            placeName={`${index + 1}. ${place.placeName}`}
            tags={[]}
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
