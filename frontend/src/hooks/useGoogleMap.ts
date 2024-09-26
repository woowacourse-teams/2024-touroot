import { useCallback, useEffect, useState } from "react";

import { MapPosition } from "@type/domain/common";

const INIT_CENTER_POSITION = {
  lat: 37.5665,
  lng: 126.978,
};

const fitMapToBounds = (map: google.maps.Map, locations: MapPosition[]) => {
  const bounds = new window.google.maps.LatLngBounds();

  locations.forEach((location) => {
    bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
  });

  map.fitBounds(bounds);
};

const useGoogleMap = (places: MapPosition[]) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter(INIT_CENTER_POSITION);
    map.setZoom(7);
    setGoogleMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setGoogleMap(null);
  }, []);

  useEffect(() => {
    if (!googleMap) return;

    if (places.length > 1) {
      fitMapToBounds(googleMap, places);
    }
  }, [googleMap, places]);

  return {
    onLoad,
    onUnmount,
  };
};

export default useGoogleMap;
