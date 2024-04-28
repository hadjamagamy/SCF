import { Routes, Route } from "react-router-dom";
import TypeVehiculePage from ".";

function ExamplePage() {
  return (
    <Routes>
      <Route index element={<TypeVehiculePage/>} />
    </Routes>
  );
}

export default ExamplePage;
