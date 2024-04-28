import { Routes, Route } from "react-router-dom";
import DepensePage from ".";

function ExamplePage() {
  return (
    <Routes>
      <Route index element={<DepensePage />} />
    </Routes>
  );
}

export default ExamplePage;
