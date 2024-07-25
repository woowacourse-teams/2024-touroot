import { Libraries, LoadScript } from "@react-google-maps/api";

const GoogleMapLoadScript = ({
  children,
  libraries,
}: React.PropsWithChildren<{ libraries: Libraries }>) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? ""}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapLoadScript;
