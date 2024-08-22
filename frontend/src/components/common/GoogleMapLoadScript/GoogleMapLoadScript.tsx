import { Libraries, LoadScript } from "@react-google-maps/api";

interface GoogleMapLoadScriptProps {
  libraries: Libraries;
  loadingElement?: React.ReactNode;
}

const GoogleMapLoadScript = ({
  children,
  libraries,
  loadingElement,
}: React.PropsWithChildren<GoogleMapLoadScriptProps>) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? ""}
      libraries={libraries}
      loadingElement={loadingElement}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapLoadScript;
