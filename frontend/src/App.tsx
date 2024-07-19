import { Route, Routes } from "react-router-dom";

import TravelogueDetailPage from "@components/pages/travelogueDetail/TravelogueDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/travelogueDetailPage" element={<TravelogueDetailPage />} />
    </Routes>
  );
};

export default App;
