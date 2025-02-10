import { INIT_CENTER_POSITION } from "@components/common/GoogleMapView/GoogleMapView.constant";

import theme from "@styles/theme";

export const calculateCenter = (
  places: { lat: number; lng: number }[],
): { lat: number; lng: number } => {
  if (places.length === 0) {
    return { lat: INIT_CENTER_POSITION.lat, lng: INIT_CENTER_POSITION.lng };
  }
  const latSum = places.reduce((sum, place) => sum + place.lat, 0);
  const lngSum = places.reduce((sum, place) => sum + place.lng, 0);
  const count = places.length;

  return {
    lat: latSum / count,
    lng: lngSum / count,
  };
};

export const createMarkerLabelStyle = (markerOrder: number) => {
  return {
    text: `${markerOrder + 1}`,
    color: theme.colors.primary,
    fontSize: "1.4rem",
  };
};
