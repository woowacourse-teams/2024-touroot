import { useCallback, useState } from "react";

import { MapPosition } from "@type/domain/common";

const INIT_CENTER_POSITION = {
  lat: 37.5665,
  lng: 126.978,
};

const useGoogleMap = (places: MapPosition[]) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setGoogleMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setGoogleMap(null);
  }, []);

  const onBoundsChanged = useCallback(() => {
    if (googleMap) {
      if (places.length === 0) {
        googleMap.setCenter(INIT_CENTER_POSITION);
        googleMap.setZoom(7);
      } else {
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
        });
        googleMap.fitBounds(bounds);
      }
    }
  }, [places, googleMap]);

  return {
    onLoad,
    onUnmount,
    onBoundsChanged,
  };
};

export default useGoogleMap;
