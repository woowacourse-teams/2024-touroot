import { memo } from "react";

import { GoogleMap, MarkerF, Polyline } from "@react-google-maps/api";

import {
  GOOGLE_MAP_CONTAINER_STYLE,
  GOOGLE_MAP_OPTIONS,
  POLYLINE_OPTIONS,
} from "@components/common/GoogleMapView/GoogleMapView.constant";
import {
  calculateCenter,
  createMarkerLabelStyle,
} from "@components/common/GoogleMapView/GoogleMapView.util";

import useGoogleMap from "@hooks/useGoogleMap";

import { markerUrl } from "@assets/svg";

interface GoogleMapViewProps {
  places: {
    lat: number;
    lng: number;
  }[];
}

const GoogleMapView = ({ places }: GoogleMapViewProps) => {
  const center = calculateCenter(places);

  const { onLoad, onUnmount, onBoundsChanged } = useGoogleMap(places);

  /**
   * 컴포넌트 내부에 위치시키지 않으면 "Uncaught TypeError: Cannot read properties of undefined (reading 'maps')"
   * 에러가 발생하여 다음과 같은 위치로 변경
   */
  const MARKER_ICON_STYLE = {
    url: markerUrl,
    scaledSize: new window.google.maps.Size(30, 30),
    labelOrigin: new window.google.maps.Point(15, -10),
  };

  return (
    <div>
      <GoogleMap
        options={GOOGLE_MAP_OPTIONS}
        mapContainerStyle={GOOGLE_MAP_CONTAINER_STYLE}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onBoundsChanged={onBoundsChanged}
      >
        {places.map((position, index) => (
          <MarkerF
            key={`marker-${index}-${position.lat}-${position.lng}`}
            position={position}
            icon={MARKER_ICON_STYLE}
            label={createMarkerLabelStyle(index)}
          />
        ))}
        <Polyline path={places} options={POLYLINE_OPTIONS} />
      </GoogleMap>
    </div>
  );
};

export default memo(GoogleMapView);
