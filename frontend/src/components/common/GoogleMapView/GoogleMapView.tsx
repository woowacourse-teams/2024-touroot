/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";

import { GoogleMap, MarkerF, Polyline } from "@react-google-maps/api";

import theme from "@styles/theme";

import { markerUrl } from "@assets/svg";

const containerStyle = {
  width: "100%",
  height: "23rem",
};

interface GoogleMapViewProps {
  places: {
    lat: number;
    lng: number;
  }[];
}

const calculateCenter = (places: { lat: number; lng: number }[]): { lat: number; lng: number } => {
  const latSum = places.reduce((sum, place) => sum + place.lat, 0);
  const lngSum = places.reduce((sum, place) => sum + place.lng, 0);
  const count = places.length;

  return {
    lat: latSum / count,
    lng: lngSum / count,
  };
};

const GoogleMapView = ({ places }: GoogleMapViewProps) => {
  const center = calculateCenter(places);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
      });
      map.fitBounds(bounds);
    },
    [places],
  );

  return (
    <div>
      <GoogleMap
        options={{
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {places.map((position, index) => (
          <MarkerF key={`${index}-${position.lat}`} position={position} icon={markerUrl} />
        ))}
        {places.map((position, index) => (
          <MarkerF
            key={`marker-${index}-${position.lat}-${position.lng}`}
            position={position}
            icon={{
              url: markerUrl,
              scaledSize: new window.google.maps.Size(30, 30),
              labelOrigin: new window.google.maps.Point(15, -10),
            }}
            label={{
              text: `${index + 1}`,
              color: theme.colors.primary,
              fontSize: "1.4rem",
            }}
          />
        ))}
        <Polyline path={places} options={{ strokeColor: "#72A2FFCC", strokeWeight: 3 }} />
      </GoogleMap>
    </div>
  );
};

export default React.memo(GoogleMapView);
