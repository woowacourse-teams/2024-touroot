import { useJsApiLoader } from "@react-google-maps/api";

import { LIBRARIES } from "@components/common/GoogleMapLoadScript/GoogleMapLoadScript.constants";

interface GoogleMapLoadScriptProps extends React.PropsWithChildren {
  loadingElement: React.ReactNode;
}

const GoogleMapLoadScript = ({ children, loadingElement }: GoogleMapLoadScriptProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? "",
    libraries: LIBRARIES,
  });

  return isLoaded ? <>{children}</> : loadingElement;
};

export default GoogleMapLoadScript;
