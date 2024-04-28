import { Routes, Route } from "react-router-dom";
import VehiculePage from ".";

function ExamplePage() {
  return (
    <Routes>
      <Route index element={<VehiculePage />} />
    </Routes>
  );
}

export default ExamplePage;
