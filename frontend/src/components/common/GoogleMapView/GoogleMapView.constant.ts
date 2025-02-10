export const GOOGLE_MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "23rem",
};

export const INIT_CENTER_POSITION = {
  lat: 37.5665,
  lng: 126.978,
};

export const GOOGLE_MAP_OPTIONS = {
  disableDefaultUI: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export const POLYLINE_OPTIONS = { strokeColor: "#72A2FFCC", strokeWeight: 3 };
